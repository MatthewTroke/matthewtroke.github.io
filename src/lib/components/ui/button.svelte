<script lang="ts">
	import { cn } from '$lib/utils';
	import { cva, type VariantProps } from 'class-variance-authority';

	const buttonVariants = cva(
		'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
		{
			variants: {
				variant: {
					default: 'bg-primary text-primary-foreground hover:bg-primary/90',
					destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline:
					'border border-border bg-transparent hover:bg-primary/10 hover:text-primary',
					secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
					ghost: 'hover:bg-accent hover:text-accent-foreground',
					link: 'text-primary underline-offset-4 hover:underline'
				},
				size: {
					default: 'h-10 px-4 py-2',
					sm: 'h-9 rounded-md px-3',
					lg: 'h-11 rounded-md px-8',
					icon: 'h-10 w-10'
				}
			},
			defaultVariants: {
				variant: 'default',
				size: 'default'
			}
		}
	);

	type Props = {
		variant?: VariantProps<typeof buttonVariants>['variant'];
		size?: VariantProps<typeof buttonVariants>['size'];
		class?: string;
		href?: string;
		type?: 'button' | 'submit' | 'reset';
		target?: string;
		rel?: string;
		children?: any;
		[key: string]: any;
	};

	let {
		variant,
		size,
		class: className = '',
		href,
		type = 'button',
		children,
		...restProps
	}: Props = $props();
</script>

{#if href}
	<a
		href={href}
		class={cn(buttonVariants({ variant, size }), className)}
		{...restProps}
	>
		{@render children()}
	</a>
{:else}
	<button
		type={type}
		class={cn(buttonVariants({ variant, size }), className)}
		{...restProps}
	>
		{@render children()}
	</button>
{/if}
