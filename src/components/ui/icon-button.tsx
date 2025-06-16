import { Plus } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'

import { type ButtonProps } from '@/components/ui/button'
import { SpinnerIcon } from '@/components/ui/spinner-icon'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

const iconButtonVariants = cva(
	'group cursor-pointer shrink-0 flex items-center justify-center disabled:cursor-not-allowed disabled:bg-background disabled:text-muted-foreground [&>svg]:flex [&>svg]:shrink-0',
	{
		variants: {
			variant: {
				filled: 'bg-neutral-500 hover:bg-neutral-400',
				accent: 'bg-accent text-primary-foreground hover:bg-accent/90',
				outline:
					'border border-border bg-transparent text-neutral-500 hover:bg-neutral-300',
				ghost: 'bg-transparent hover:bg-neutral-400/20',
			},
			size: {
				xs: 'size-6 p-0 [&>svg]:size-4', // 24x24
				sm: 'size-8 rounded-lg p-1 [&>svg]:size-5', // 32x32
				md: 'size-9 rounded-lg p-1.5 [&>svg]:size-5', // 36x36
				lg: 'size-10 p-2 [&>svg]:size-6', // 40x40
			},
		},
		defaultVariants: {
			variant: 'filled',
			size: 'md',
		},
	},
)

type OmittedButtonProps = Omit<ButtonProps, 'variant' | 'size' | 'asChild'>

interface IconButtonProps
	extends OmittedButtonProps,
		ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof iconButtonVariants> {
	icon?: ReactNode
	children?: ReactNode
	loading?: boolean
	tooltip?: string
}

const ButtonContent = forwardRef<HTMLButtonElement, IconButtonProps>(
	({ className, variant, icon, size, children, loading, ...props }, ref) => {
		const renderIcon = icon ?? children ?? <Plus className='fill-current' />

		return (
			<button
				className={cn(iconButtonVariants({ variant, size }), className)}
				ref={ref}
				{...props}
			>
				{loading ? <SpinnerIcon className='size-4 animate-spin' /> : renderIcon}
			</button>
		)
	},
)

ButtonContent.displayName = 'ButtonContent'

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	(
		{ className, variant, icon, size, children, loading, tooltip, ...props },
		ref,
	) => {
		const renderIcon = icon ?? children ?? <Plus className='fill-current' /> 

		if (tooltip) {
			return (
				<Tooltip>
					<TooltipTrigger asChild>
						<ButtonContent
							className={cn(iconButtonVariants({ variant, size }), className)}
							ref={ref}
							variant={variant}
							size={size}
							loading={loading}
							{...props}
						>
							{renderIcon}
						</ButtonContent>
					</TooltipTrigger>
					<TooltipContent>{tooltip}</TooltipContent>
				</Tooltip>
			)
		}

		return (
			<ButtonContent
				className={cn(iconButtonVariants({ variant, size }), className)}
				ref={ref}
				variant={variant}
				size={size}
				loading={loading}
				{...props}
			>
				{renderIcon}
			</ButtonContent>
		)
	},
)

IconButton.displayName = 'IconButton'

export default { IconButton }
