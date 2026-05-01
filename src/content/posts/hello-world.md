---
title: Handling Stripe subscriptions
date: 2026-04-30
description: How to handle Stripe subscriptions in a production environment
  without shooting yourself in the foot!
draft: true
---
# Introduction

Stripe's impact has been substantial for online businesses. Before Stripe, online payments were often difficult to implement, involving complex merchant accounts and clunky gateways. Stripe simplified this into a developer-friendly platform, which lowered the barrier to launching internet businesses. Many developers flaunt how easy Stripe is to set up & how developer friendly it is, but anybody who has actually set up Stripe in real production-ready applications with actual users knows this is further than the truth. I'll break down some of the major issues that I believe are incredibly annoying with Stripe, and the issues that many developers come across as they implement it.



### Stripe generates their own customer ids & must be used for lookups

One huge gripe I have with Stripe, is that you are unable to look up via the Stripe API a user based on a user id in your database. If you want to just simply ask the question, *"Is this user currently subscribed?"* you are basically unable to, unless you somehow map a customer id that you manually create (or that gets manually created when creating a checkout session), and adding it to your database. This is annoying, because now you need to also keep track of a customer id & a user id. You are able to attach metadata to a customer when created, but why doesn't Stripe allow you to look up customers by a user id, and make them deal with this issue and be the authoratative figure instead of the developer? 



### You can't rely on Webhooks

Stripe webhooks are stupid. They spam you like crazy, often in completely random order & possibly incomplete data. I've learned you can't trust them. Sometimes they are consistent and makes sense, and sometimes it's a total mess that will leave your data in a fragmented state.



### Stripe lets you create a checkout session without a customer id

Stripe just allows you to create a checkout session without creating a customer first. If you don't absolutely make sure you create a customer and map 