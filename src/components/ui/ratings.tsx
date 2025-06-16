'use client'

import React, { useState, useRef, useMemo } from 'react'
import { Star } from 'lucide-react'

import { cn } from '@/lib/utils'

const ratingVariants = {
	default: {
		star: 'text-foreground',
		emptyStar: 'text-muted-foreground',
	},
	destructive: {
		star: 'text-red-500',
		emptyStar: 'text-red-200',
	},
	yellow: {
		star: 'text-yellow-500',
		emptyStar: 'text-yellow-200',
	},
}

interface RatingsProps extends React.HTMLAttributes<HTMLDivElement> {
	rating: number
	totalStars?: number
	size?: number
	fill?: boolean
	Icon?: React.ComponentType<any>
	variant?: keyof typeof ratingVariants
	onValueChange?: (value: number) => void
	precision?: 0.5 | 1
	readOnly?: boolean
}

const Ratings = React.forwardRef<HTMLDivElement, RatingsProps>(
	(
		{
			rating: initialRating,
			totalStars = 5,
			size = 20,
			fill = true,
			Icon = Star,
			variant = 'default',
			onValueChange,
			precision = 1,
			readOnly = false,
			className,
			...props
		},
		ref,
	) => {
		const [hoverValue, setHoverValue] = useState<number | null>(null)

		// No need for ratingRef on the container for hover calculation anymore

		const clampedRating = useMemo(
			() => Math.min(Math.max(initialRating || 0, 0), totalStars),
			[initialRating, totalStars],
		)

		const displayValue = hoverValue ?? clampedRating

		const calculateValue = (event: React.MouseEvent<HTMLDivElement>, index: number): number => {
			const target = event.currentTarget
			const rect = target.getBoundingClientRect()
			const percent = (event.clientX - rect.left) / rect.width
			const starValue = index + 1

			let newValue: number
			if (precision === 0.5) {
				newValue = starValue - (percent <= 0.5 ? 0.5 : 0)
			} else {
				newValue = starValue
			}

			// Ensure value is at least the minimum precision step (0.5 or 1)
			newValue = Math.max(precision === 0.5 ? 0.5 : 1, newValue)

			return Math.min(newValue, totalStars) // Clamp to totalStars
		}

		const handleStarMouseMove = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
			if (readOnly) return
			setHoverValue(calculateValue(event, index))
		}

		const handleStarClick = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
			if (readOnly) return
			onValueChange?.(calculateValue(event, index))
		}

		const handleMouseLeave = () => {
			if (readOnly) return
			setHoverValue(null)
		}

		return (
			<div
				ref={ref} // Forward ref to the main container
				className={cn(
					'flex items-center gap-1', // Use gap for spacing
					{ 'cursor-default': readOnly }, // Default cursor if readOnly
					className,
				)}
				onMouseLeave={handleMouseLeave} // Reset hover on leaving the container
				aria-label={`Rating: ${clampedRating} out of ${totalStars} stars`}
				tabIndex={readOnly ? -1 : 0}
				{...props}
			>
				{[...Array(totalStars)].map((_, i) => {
					const starValue = i + 1
					const showFull = displayValue >= starValue

					// Check if the display value corresponds to a half star for this index
					const showHalf = precision === 0.5 && displayValue === starValue - 0.5
					const partialPercentage = showHalf ? 50 : 0 // Only 50% for explicit half stars

					return (
						<div
							key={i}
							className={cn('relative', { 'cursor-pointer': !readOnly })}
							onMouseMove={e => handleStarMouseMove(e, i)}
							onClick={e => handleStarClick(e, i)}
						>
							{/* Base empty star */}
							<Icon
								size={size}
								className={cn(ratingVariants[variant].emptyStar)}
								aria-hidden='true'
							/>
							{/* Filled portion (full or half) */}
							{(showFull || showHalf) && (
								<div
									className='absolute inset-0 overflow-hidden'
									style={{ width: showFull ? '100%' : `${partialPercentage}%` }}
								>
									<Icon
										size={size}
										className={cn(
											fill ? 'fill-current' : 'fill-transparent',
											ratingVariants[variant].star,
										)}
										aria-hidden='true'
									/>
								</div>
							)}
						</div>
					)
				})}
			</div>
		)
	},
)

Ratings.displayName = 'Ratings'

export { Ratings }
