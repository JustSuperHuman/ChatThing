import React from 'react'
import { AlertCircle } from 'lucide-react'
import { Typography } from './typography'
import { cn } from '@/lib/utils'

interface FormErrorMessageProps {
	message: string
	className?: string // Added optional className prop
}

export function FormErrorMessage({ message, className }: FormErrorMessageProps) {
	return (
		<span className={cn('flex items-center gap-1', className)}>
			<AlertCircle className='inline-block h-4 w-4 text-red-500' />
			<Typography className='text-red-500'>{message}</Typography>
		</span>
	)
}
