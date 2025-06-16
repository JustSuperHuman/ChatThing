'use client'

import React, {
	forwardRef,
	type ButtonHTMLAttributes,
	type PropsWithChildren,
	type ReactElement,
	useRef,
} from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const baseButtonStyles = [
	'cursor-pointer inline-flex gap-2 items-center justify-center',
	'whitespace-nowrap rounded-md',
	'text-sm font-medium leading-4',
	'transition-colors duration-200',
	'ring-offset-background',
	'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
	'disabled:cursor-not-allowed disabled:opacity-70',
].join(' ')

export const buttonVariants = cva(baseButtonStyles, {
	variants: {
		variant: {
			primary:
				'bg-primary text-primary-foreground focus-visible:ring-ring focus-visible:ring-offset-2 disabled:bg-primary-disabled disabled:text-primary-foreground/70 disabled:shadow-none hover:bg-primary/75',
			secondary:
				'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:bg-secondary-disabled disabled:text-secondary-foreground/70 disabled:shadow-none',
			outline:
				'border border-border bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring focus-visible:ring-offset-2 disabled:border-input/50 disabled:text-muted-foreground',
			ghost:
				'bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring focus-visible:ring-offset-2 disabled:text-muted-foreground',
			link: 'text-foreground underline-offset-4 bg-transparent hover:underline focus-visible:ring-ring focus-visible:ring-offset-2 disabled:text-muted-foreground',
			fitness:
				'bg-primary text-primary-foreground font-semibold transition-all duration-150 border-b-4 border-primary-hover focus-visible:ring-ring focus-visible:ring-offset-2 disabled:bg-primary-disabled disabled:border-primary-disabled/70 disabled:text-primary-foreground/70',
			destructive:
				'bg-destructive text-destructive-foreground focus-visible:ring-destructive disabled:bg-destructive/50 disabled:text-destructive-foreground/70',
		},
		size: {
			xs: 'h-4 px-0 py-1 text-xs',
			sm: 'h-9 px-3 py-1 text-lg font-medium',
			md: 'h-10 px-4 py-2 text-lg font-medium',
			lg: 'h-[44px] px-4 py-2 text-base font-medium',
			icon: 'h-10 w-10 p-2 gap-0',
			iconSm: 'h-9 w-9 p-1.5 gap-0',
			iconLg: 'h-[44px] w-[44px] p-2.5 gap-0',
		},
		ringHover: {
			true: '',
		},
		enableShadow: {
			true: '',
		},
		enableHoverSize: {
			true: '',
		},
	},
	defaultVariants: {
		variant: 'primary',
		size: 'md',
		ringHover: false,
		enableShadow: false,
		enableHoverSize: true,
	},
	compoundVariants: [
		// Hover scale effects
		{
			enableHoverSize: true,
			variant: 'primary',
			className: 'hover:scale-[1.02]',
		},
		{
			enableHoverSize: true,
			variant: 'secondary',
			className: 'hover:scale-[1.02]',
		},
		{
			enableHoverSize: true,
			variant: 'outline',
			className: 'hover:scale-[1.02]',
		},
		{
			enableHoverSize: true,
			variant: 'ghost',
			className: 'hover:scale-[1.02]',
		},

		// Shadow effects
		{ enableShadow: true, variant: 'primary', className: 'shadow-sm' },
		{ enableShadow: true, variant: 'secondary', className: 'shadow-sm' },
		{ enableShadow: true, variant: 'outline', className: 'shadow-sm' },
		{ enableShadow: true, variant: 'ghost', className: 'shadow-sm' },
		{ enableShadow: true, variant: 'fitness', className: 'shadow-md' },
		{ enableShadow: true, variant: 'destructive', className: 'shadow-sm' },

		// Ring hover effects
		{
			ringHover: true,
			variant: 'primary',
			className:
				'hover:ring-2 hover:ring-offset-2 hover:ring-[var(--primary-500)] hover:ring-offset-background',
		},
		{
			ringHover: true,
			variant: 'secondary',
			className:
				'hover:ring-2 hover:ring-offset-2 hover:ring-[var(--outline-hover)] hover:ring-offset-background',
		},
		{
			ringHover: true,
			variant: 'outline',
			className:
				'hover:ring-2 hover:ring-offset-2 hover:ring-[var(--outline-hover)] hover:ring-offset-background',
		},
		{
			ringHover: true,
			variant: 'ghost',
			className:
				'hover:ring-2 hover:ring-offset-2 hover:ring-[var(--outline-hover)] hover:ring-offset-background',
		},
		{
			ringHover: true,
			variant: 'link',
			className:
				'hover:ring-2 hover:ring-offset-2 hover:ring-[var(--accent-information-500)] hover:ring-offset-background',
		},
	],
})

export type ButtonProps = {
	asChild?: boolean
	loading?: boolean
	disabled?: boolean
	leftIcon?: ReactElement
	rightIcon?: ReactElement
	startIcon?: ReactElement
	endIcon?: ReactElement
	ringHover?: boolean
	tooltip?: string
	color?: string
	enableShadow?: boolean
	enableHoverSize?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonVariants> &
	PropsWithChildren

const ButtonContent = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'tooltip'>>(
	(
		{
			className,
			variant,
			size,
			loading,
			disabled,
			children,
			asChild = false,
			leftIcon,
			rightIcon,
			startIcon,
			endIcon,
			ringHover,
			enableShadow,
			enableHoverSize,
			type,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : 'button'
		const isDisabled = loading ?? disabled
		const buttonRef = useRef<HTMLButtonElement>(null)

		const isIconOnly = size?.toString().includes('icon') && !children
		const effectiveLeftIcon = leftIcon ?? startIcon
		const effectiveRightIcon = rightIcon ?? endIcon

		const renderContent = () => {
			if (loading) {
				return (
					<svg className='h-4 w-4 animate-spin' viewBox='0 0 24 24' aria-label='Loading'>
						<circle
							className='opacity-25'
							cx='12'
							cy='12'
							r='10'
							stroke='currentColor'
							strokeWidth='4'
							fill='none'
						/>
						<path
							className='opacity-75'
							fill='currentColor'
							d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
						/>
					</svg>
				)
			}

			if (isIconOnly && (effectiveLeftIcon ?? effectiveRightIcon)) {
				return effectiveLeftIcon ?? effectiveRightIcon
			}

			return (
				<>
					{effectiveLeftIcon && effectiveLeftIcon}
					{children}
					{effectiveRightIcon && effectiveRightIcon}
				</>
			)
		}

		return (
			<Comp
				{...(asChild ? {} : { type: type ?? 'button' })}
				className={cn(
					buttonVariants({
						variant,
						size,
						ringHover,
						enableShadow,
						enableHoverSize,
					}),
					className,
				)}
				disabled={isDisabled}
				ref={ref ?? buttonRef}
				{...props}
			>
				{renderContent()}
			</Comp>
		)
	},
)

ButtonContent.displayName = 'ButtonContent'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ tooltip, ...props }, ref) => {
	if (tooltip) {
		return (
			<Tooltip>
				<TooltipTrigger asChild>
					<ButtonContent {...props} ref={ref} />
				</TooltipTrigger>
				<TooltipContent>{tooltip}</TooltipContent>
			</Tooltip>
		)
	}

	return <ButtonContent {...props} ref={ref} />
})

Button.displayName = 'Button'

export default Button
