import type React from 'react'
import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

const chipVariants = cva(
	[
		'inline-flex items-center rounded-full whitespace-nowrap font-medium transition-colors',
		'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background',
	],
	{
		variants: {
			variant: {
				filled: 'text-white border border-transparent',
				outlined: 'bg-transparent border',
				ghost: 'bg-opacity-10 border-transparent',
			},
			color: {
				primary: '', // Set colors based on variant
				secondary: '', // Set colors based on variant
				success: '', // Set colors based on variant
				error: '', // Set colors based on variant
				warning: '', // Set colors based on variant
				info: '', // Set colors based on variant
				default: '', // Set colors based on variant
			},
			size: {
				sm: 'h-6 text-xs px-2 py-1',
				md: 'h-8 text-sm px-3 py-1',
				lg: 'h-10 text-base px-4 py-2',
			},
			clickable: {
				true: 'cursor-pointer hover:shadow-sm',
				false: '',
			},
		},
		compoundVariants: [
			// Filled variants
			{
				color: 'primary',
				variant: 'filled',
				className: 'bg-[var(--primary-500)] hover:bg-[var(--primary-600)]',
			},
			{
				color: 'secondary',
				variant: 'filled',
				className: 'bg-[var(--secondary-500)] hover:bg-[var(--secondary-600)]',
			},
			{
				color: 'success',
				variant: 'filled',
				className: 'bg-[var(--accent-success-500)] hover:bg-[var(--accent-success-600)]',
			},
			{
				color: 'error',
				variant: 'filled',
				className: 'bg-[var(--accent-error-500)] hover:bg-[var(--accent-error-600)]',
			},
			{
				color: 'warning',
				variant: 'filled',
				className: 'bg-[var(--accent-warning-500)] hover:bg-[var(--accent-warning-600)]',
			},
			{
				color: 'info',
				variant: 'filled',
				className: 'bg-[var(--accent-information-500)] hover:bg-[var(--accent-information-600)]',
			},
			{
				color: 'default',
				variant: 'filled',
				className: 'bg-[var(--neutrals-600)] hover:bg-[var(--neutrals-700)]',
			},

			// Outlined variants
			{
				color: 'primary',
				variant: 'outlined',
				className: 'border-[var(--primary-500)] text-[var(--primary-500)]',
			},
			{
				color: 'secondary',
				variant: 'outlined',
				className: 'border-[var(--secondary-500)] text-[var(--secondary-500)]',
			},
			{
				color: 'success',
				variant: 'outlined',
				className: 'border-[var(--accent-success-500)] text-[var(--accent-success-500)]',
			},
			{
				color: 'error',
				variant: 'outlined',
				className: 'border-[var(--accent-error-500)] text-[var(--accent-error-500)]',
			},
			{
				color: 'warning',
				variant: 'outlined',
				className: 'border-[var(--accent-warning-500)] text-[var(--accent-warning-500)]',
			},
			{
				color: 'info',
				variant: 'outlined',
				className: 'border-[var(--accent-information-500)] text-[var(--accent-information-500)]',
			},
			{
				color: 'default',
				variant: 'outlined',
				className: 'border-[var(--neutrals-600)] text-[var(--neutrals-600)]',
			},

			// Ghost variants
			{
				color: 'primary',
				variant: 'ghost',
				className:
					'bg-[var(--primary-500)] bg-opacity-10 text-[var(--primary-500)] hover:bg-opacity-20',
			},
			{
				color: 'secondary',
				variant: 'ghost',
				className:
					'bg-[var(--secondary-500)] bg-opacity-10 text-[var(--secondary-500)] hover:bg-opacity-20',
			},
			{
				color: 'success',
				variant: 'ghost',
				className:
					'bg-[var(--accent-success-500)] bg-opacity-10 text-[var(--accent-success-500)] hover:bg-opacity-20',
			},
			{
				color: 'error',
				variant: 'ghost',
				className:
					'bg-[var(--accent-error-500)] bg-opacity-10 text-[var(--accent-error-500)] hover:bg-opacity-20',
			},
			{
				color: 'warning',
				variant: 'ghost',
				className:
					'bg-[var(--accent-warning-500)] bg-opacity-10 text-[var(--accent-warning-500)] hover:bg-opacity-20',
			},
			{
				color: 'info',
				variant: 'ghost',
				className:
					'bg-[var(--accent-information-500)] bg-opacity-10 text-[var(--accent-information-500)] hover:bg-opacity-20',
			},
			{
				color: 'default',
				variant: 'ghost',
				className:
					'bg-[var(--neutrals-600)] bg-opacity-10 text-[var(--neutrals-600)] hover:bg-opacity-20',
			},
		],
		defaultVariants: {
			variant: 'filled',
			color: 'default',
			size: 'md',
			clickable: false,
		},
	},
)

export interface ChipProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
		VariantProps<typeof chipVariants> {
	label: string
	onDelete?: () => void
	icon?: React.ReactNode
}

const Chip = forwardRef<HTMLDivElement, ChipProps>(
	(
		{ className, variant, color, size, clickable, label, onDelete, icon, onClick, ...props },
		ref,
	) => {
		const showDeleteIcon = onDelete !== undefined
		const isClickable = clickable || onClick !== undefined

		// Custom hover styles for clickable chips
		const getClickableStyles = () => {
			if (!isClickable) return ''

			if (variant === 'outlined') {
				switch (color) {
					case 'primary':
						return 'hover:bg-[var(--primary-500)] hover:bg-opacity-10 hover:text-[var(--primary-700)]'
					case 'secondary':
						return 'hover:bg-[var(--secondary-500)] hover:bg-opacity-10 hover:text-[var(--secondary-700)]'
					case 'success':
						return 'hover:bg-[var(--accent-success-500)] hover:bg-opacity-10 hover:text-[var(--accent-success-700)]'
					case 'error':
						return 'hover:bg-[var(--accent-error-500)] hover:bg-opacity-10 hover:text-[var(--accent-error-700)]'
					case 'warning':
						return 'hover:bg-[var(--accent-warning-500)] hover:bg-opacity-10 hover:text-[var(--accent-warning-700)]'
					case 'info':
						return 'hover:bg-[var(--accent-information-500)] hover:bg-opacity-10 hover:text-[var(--accent-information-700)]'
					default:
						return 'hover:bg-[var(--neutrals-600)] hover:bg-opacity-10 hover:text-[var(--neutrals-700)]'
				}
			}

			return ''
		}

		return (
			<div
				ref={ref}
				className={cn(
					chipVariants({ variant, color, size, clickable: isClickable }),
					getClickableStyles(),
					className,
				)}
				{...props}
			>
				{icon && <span className='mr-1.5'>{icon}</span>}
				<span className='truncate'>{label}</span>
				{showDeleteIcon && (
					<button
						title='Delete'
						type='button'
						onClick={e => {
							e.stopPropagation()
							onDelete()
						}}
						className={cn(
							'ml-1 rounded-full focus:ring-2 focus:ring-offset-2 focus:outline-none',
							size === 'sm' ? 'p-0.5' : size === 'md' ? 'p-1' : 'p-1.5',
						)}
					>
						<X className={cn(size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-5 w-5')} />
					</button>
				)}
			</div>
		)
	},
)

Chip.displayName = 'Chip'

export { Chip, chipVariants }
