import type React from 'react'
import { cn } from '@/lib/utils'

interface DividerProps {
	className?: string
	children?: React.ReactNode
	variant?: 'default' | 'muted' | 'subtle'
}

export function Divider({ className, children, variant = 'default' }: DividerProps) {
	const borderClass =
		variant === 'muted'
			? 'border-gray-300 dark:border-gray-700'
			: variant === 'subtle'
				? 'border-gray-200 dark:border-gray-800'
				: 'border-gray-100 dark:border-gray-700'

	const textClass =
		variant === 'muted'
			? 'text-gray-500 dark:text-gray-400'
			: variant === 'subtle'
				? 'text-gray-400 dark:text-gray-600'
				: 'text-gray-500 dark:text-gray-500'

	return (
		<div className={cn('relative flex items-center', className)}>
			<div className={cn('grow border-t', borderClass)} />
			{children && <span className={cn('mx-4 text-xs uppercase', textClass)}>{children}</span>}
			<div className={cn('grow border-t', borderClass)} />
		</div>
	)
}
