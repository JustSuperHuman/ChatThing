import { cn } from '@/lib/utils'
import * as React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	interactive?: boolean
	hover?: 'lift' | 'glow' | 'zoom' | 'none'
	animation?: 'fade-in' | 'slide-in' | 'scale-in' | 'none'
	variant?: 'default' | 'blur' // Added variant prop
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
	(
		{
			className,
			interactive = false,
			hover = 'none',
			animation = 'none',
			variant = 'default', // Default variant
			...props
		},
		ref,
	) => {
		// Build the class string based on props
		const interactiveClasses = interactive
			? 'cursor-pointer hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/30'
			: ''

		// Hover effects
		const hoverClasses = {
			lift: 'transition-transform duration-200 hover:-translate-y-1',
			glow: 'transition-all duration-200 hover:shadow-md hover:shadow-primary/30 dark:hover:shadow-primary/20',
			zoom: 'transition-transform duration-200 hover:scale-[1.02] origin-center',
			none: '',
		}

		// Animation effects
		const animationClasses = {
			'fade-in': 'animate-fade-in',
			'slide-in': 'animate-slide-in',
			'scale-in': 'animate-scale-in',
			none: '',
		}

		// Variant classes
		const variantClasses = {
			default: 'bg-card text-card-foreground border-border',
			blur: 'bg-card/80 dark:bg-card-dark/80 border-border dark:border-border-dark backdrop-blur-sm text-card-foreground', // Added blur variant styles
		}

		return (
			<div
				ref={ref}
				className={cn(
					'rounded-lg border shadow-sm', // Base structure: border, rounded, shadow
					'transition-colors duration-200', // For smooth dark/light mode transition
					variantClasses[variant], // Apply variant styles
					interactiveClasses,
					hoverClasses[hover],
					animationClasses[animation],
					className, // Allow overriding via className prop
				)}
				{...props}
			/>
		)
	},
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
	),
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
	({ className, ...props }, ref) => (
		<h3
			ref={ref}
			className={cn('text-2xl leading-none font-semibold tracking-tight', className)}
			{...props}
		/>
	),
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<p ref={ref} className={cn('text-muted-foreground text-sm', className)} {...props} />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
	),
)
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
	),
)
CardFooter.displayName = 'CardFooter'

export default Card

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
