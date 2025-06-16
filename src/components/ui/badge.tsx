import { forwardRef, type ButtonHTMLAttributes, type PropsWithChildren } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
	'inline-flex items-center justify-center rounded-full px-4 py-1 text-sm font-medium transition-colors focus:outline-hidden leading-none',
	{
		variants: {
			variant: {
				default:
					'border border-neutrals-300 text-neutrals-600 bg-white hover:border-neutrals-400 hover:text-neutrals-700',
				outline:
					'border border-neutrals-300 text-neutrals-600 bg-transparent hover:border-neutrals-400 hover:text-neutrals-700',
				disabled: 'border border-neutrals-200 text-neutrals-300 bg-transparent cursor-not-allowed',
				primary:
					'bg-brand-primary-500 border-none text-text-primary-dark hover:bg-brand-primary-600',
				secondary:
					'bg-brand-primary-100 border-none text-text-primary-dark hover:bg-brand-primary-200',
			},
			size: {
				sm: 'text-xs px-3 py-0.5',
				md: 'text-sm px-4 py-1',
				lg: 'text-base px-5 py-1.5',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'md',
		},
	},
)

interface BadgeProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof badgeVariants> {
	disabled?: boolean
}

const Badge = forwardRef<HTMLButtonElement, BadgeProps>(
	({ className, variant, size, disabled, ...props }, ref) => {
		return (
			<button
				ref={ref}
				disabled={disabled}
				className={cn(
					badgeVariants({
						variant: disabled ? 'disabled' : variant,
						size,
					}),
					className,
				)}
				{...props}
			/>
		)
	},
)

Badge.displayName = 'Badge'

// Example usage component to demonstrate the variants
const BadgeExample = () => {
	return (
		<div className='flex flex-col gap-4 p-4'>
			<div className='flex flex-wrap gap-2'>
				<Badge variant='default'>Default</Badge>
				<Badge variant='outline'>Outline</Badge>
				<Badge variant='primary'>Primary</Badge>
				<Badge variant='secondary'>Secondary</Badge>
				<Badge disabled>Disabled</Badge>
			</div>
			<div className='flex gap-2'>
				<Badge size='sm'>Small</Badge>
				<Badge size='md'>Medium</Badge>
				<Badge size='lg'>Large</Badge>
			</div>
		</div>
	)
}

export { Badge, BadgeExample }
