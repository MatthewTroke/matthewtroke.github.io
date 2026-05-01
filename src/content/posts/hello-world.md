---
title: Handling Stripe subscriptions
date: 2026-04-30
description: How to handle Stripe subscriptions in a production environment
  without shooting yourself in the foot!
draft: false
---
# Introduction

Stripe's impact has been substantial for online businesses. Before Stripe, online payments were often difficult to implement, involving complex merchant accounts and clunky gateways. Stripe simplified this into a developer-friendly platform, which lowered the barrier to launching internet businesses. Many developers flaunt how easy Stripe is to set up & how developer friendly it is, but anybody who has actually set up Stripe in real production-ready applications with actual users knows this is further than the truth. I'll break down some of the major issues that I believe are incredibly annoying with Stripe, and the issues that many developers come across as they implement it.



### Stripe generates their own customer ids & must be used for lookups

One huge gripe I have with Stripe, is that you are unable to look up via the Stripe API a user based on a user id in your database. If you want to just simply ask the question, *"Is this user currently subscribed?"* you are basically unable to without a customer id, unless you somehow map a customer id that you manually create (or that gets manually created when creating a checkout session), and adding it to your database or storage solution. This is annoying, because now you need to also keep track of a customer id & a user id. You are able to attach metadata to a customer when created, but why doesn't Stripe allow you to look up customers by a user id in the metadata, and make them deal with this issue and make them be the authoritative figure instead of the developer? 

### You can't rely on Webhooks

Stripe webhooks are stupid. They spam you like crazy, often in completely random order & possibly incomplete data. I've learned you can't trust them. Sometimes they are consistent and makes sense, and sometimes it's a total mess that will leave your data in a fragmented state.

### Stripe lets you create a checkout session without a customer id

For some idiotic reason, Stripe just allows you to create a checkout session without creating a customer & mapping it to a user in your domain. If you aren't positive that you have a customer id created for a given user before starting the checkout session, good luck! You'll end up wondering why you have many customer ids linked to a single user. You will hate your life, and it will only lead to confusing bugs. Never let somebody begin a checkout session without creating a customer with the Stripe SDK.

## What's the best way forward?

There's a few things that I have found incredibly helpful that I'll go over.

To solve the first issue regard customer id lookups, I think the best way here is to simple use either a database (or what I use, a KV of some sort) to throw a mapping between a user id and a customer id. This way, if you want to look something up for any reason, you have a dictionary to get from a userId -> customerId, and vice versa

```typescript
// `stripe:user:123 -> cus_456`
export const userKey = (userId: string) => `stripe:user:${userId}`;

// `stripe:customer:cus_456 -> 123
export const customerKey = (customerId: string) => `stripe:customer:${customerId}`;
```

Secondly, you don't want to rely on the payload within webhooks. Instead of listening to webhooks and changing data based on the event type & the payload itself, use webhooks as an indicator that something *changed.* 



```typescript
const SUPPORTED_EVENTS = new Set<Stripe.Event.Type>([
	'checkout.session.completed',
	'customer.subscription.created',
	'customer.subscription.updated',
	'customer.subscription.deleted',
    // ... whatever else you want to listen for
)]
```

Make a whitelist of events you want to support, then if the event that comes in is included in your whitelist, let it through. Remember, this list also needs to be configured in Stripe so Stripe knows to only send these webhook events as well, they should both ideally match.

When an event comes in, verify the signature, then call Stripes SDK to then sync the subscription using their subscription API.

```typescript
const stripe = getStripe();
const body = await request.text();
const signature = request.headers.get('stripe-signature');
if (!signature) return error(400, 'Missing stripe-signature header');

let event: Stripe.Event;
try {
    event = await stripe.webhooks.constructEventAsync(body, signature, env.STRIPE_WEBHOOK_SECRET!);
} catch (err) {
    // Log here, it's important!
	return error(400, 'Invalid signature');
}

if (SUPPORTED_EVENTS.has(event.type)) {
    // ... grab the subscription id from the event, we don't care about the rest
    
    let sub: Stripe.Subscription;

    try {
		sub = await stripe.subscriptions.retrieve(subscriptionId);
	} catch (err) {
		// Log here, it's important!
		return error(500, 'Failed to retreive subscription from Stripe')
	}
}
```

Once you get your subscription, store it wherever you want. I choose to throw it in another KV since I'm using Cloudflare Workers, but you can also throw it in a subscriptions table in your database and link it to a user. I link a userId to a snapshot of a subscription, so whenever I need to know if a user is subscriped, I can count on this KV being up-to-date from when webhooks come in.

```typescript
`sub:123 -> SubscriptionSnapshot`
export const subKey = (userId: string) => `sub:${userId}`;
```

```typescript
/**
 * Subscription state for a user, mirrored from Stripe into KV. Webhook-owned,
 * no other path writes this key.
 */
export type SubscriptionSnapshot = {
	stripeSubscriptionId: string;
	stripeCustomerId: string;
	status: Stripe.Subscription.Status;
	productId: string;
	priceId: string;
	currentPeriodStart: number | null;
	currentPeriodEnd: number | null;
	cancelAtPeriodEnd: boolean;
};
```

Do these things, and I promise, your life will be much less of a headache.

Thanks for reading

