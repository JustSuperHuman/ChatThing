import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import type { VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Input, type inputVariants } from '@/components/ui/input/input'

export type SearchBarProps = {
	icon: ReactNode
	className?: string
	disabled?: boolean
	iconPosition?: 'left' | 'right'
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> &
	VariantProps<typeof inputVariants>

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
	({ className, icon, iconPosition = 'left', disabled, ...props }, ref) => {
		return (
			<div className='relative w-full'>
				{icon && iconPosition === 'left' && (
					<span className='absolute top-2 left-3 z-1'>{icon}</span>
				)}
				<Input
					className={cn(
						'[&::-webkit-search-cancel-button] :stroke-red-50',
						iconPosition === 'left' && 'pl-12',
						iconPosition === 'right' && 'pr-12',
						className,
					)}
					disabled={disabled}
					ref={ref}
					{...props}
				/>
				{icon && iconPosition === 'right' && (
					<span className='absolute top-2 right-3 z-1'>{icon}</span>
				)}
			</div>
		)
	},
)

SearchBar.displayName = 'SearchBar'

export { SearchBar }
