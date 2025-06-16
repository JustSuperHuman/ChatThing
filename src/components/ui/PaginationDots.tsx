import type React from 'react'
import { cn } from '@/lib/utils'

interface PaginationDotsProps {
	count: number
	activeIndex: number
	onDotClick: (index: number) => void
	className?: string // Class for the main container div
	renderAs?: 'dots' | 'numbers' // Determines if dots or numbers are rendered

	// Styling for the button element itself
	buttonClassName?: string // Common classes for all buttons
	activeItemClassName?: string // Classes for the active button (dot or number)
	inactiveItemClassName?: string // Classes for inactive buttons (dot or number)
}

export const PaginationDots: React.FC<PaginationDotsProps> = ({
	count,
	activeIndex,
	onDotClick,
	className = '',
	renderAs = 'dots', // Default to 'dots'
	buttonClassName: commonButtonClassName, // Renamed to avoid conflict in logic
	activeItemClassName: customActiveItemClassName,
	inactiveItemClassName: customInactiveItemClassName,
}) => {
	if (count <= 1) {
		return null
	}

	// Default styles based on renderAs
	const baseButtonClassName =
		renderAs === 'dots' ? 'rounded-full transition-all' : 'cursor-pointer text-sm transition-colors'

	const defaultActiveItemClassName =
		renderAs === 'dots' ? 'bg-primary w-4 h-2' : 'font-bold text-foreground'

	const defaultInactiveItemClassName =
		renderAs === 'dots'
			? 'bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2 h-2'
			: 'text-muted-foreground hover:text-foreground'

	const buttonClassName = commonButtonClassName ?? baseButtonClassName

	const activeItemClassName = customActiveItemClassName ?? defaultActiveItemClassName

	const inactiveItemClassName = customInactiveItemClassName ?? defaultInactiveItemClassName

	return (
		<div className={cn('flex justify-center', className)}>
			<div className='flex space-x-1'>
				{Array.from({ length: count }).map((_, index) => (
					<button
						key={`item-${index}`}
						onClick={() => onDotClick(index)}
						className={cn(
							buttonClassName,
							activeIndex === index ? activeItemClassName : inactiveItemClassName,
						)}
						aria-label={`Go to item ${index + 1}`}
					>
						{renderAs === 'numbers' ? index + 1 : null}
					</button>
				))}
			</div>
		</div>
	)
}

export default PaginationDots
