'use client'

import type * as React from 'react'
import { ArrowLeft } from 'lucide-react'
import { Sheet, SheetContent } from './sheet'
import { cn } from '@/lib/utils'
import { Typography } from './typography'
import { IconButton } from './icon-button'

interface FullScreenSheetProps {
	open: boolean
	title?: string
	description?: string
	onClose?: () => void
	children: React.ReactNode
	className?: string
	contentClassName?: string
	headerClassName?: string
}

export const FullScreenSheet = ({
	open,
	title,
	description,
	onClose,
	children,
	className,
	contentClassName,
	headerClassName,
}: FullScreenSheetProps) => {
	// Handle back button click
	const handleBackClick = () => {
		// Only call onClose if provided
		if (onClose) {
			onClose()
		}
	}

	return (
		<Sheet open={open}>
			<SheetContent side='fullscreen' className={cn('flex h-full flex-col p-0', className)}>
				<div className={cn('flex h-16 shrink-0 items-center border-b px-4', headerClassName)}>
					<IconButton
						size='sm'
						className=''
						variant='ghost'
						icon={<ArrowLeft />}
						onClick={handleBackClick}
					/>

					<div className='flex flex-col'>
						{title && (
							<Typography
								onClick={handleBackClick}
								variant='subtitle-large-semibold'
								className='text-foreground'
							>
								{title}
							</Typography>
						)}
						{description && (
							<Typography variant='body-small-regular' className='text-muted-foreground'>
								{description}
							</Typography>
						)}
					</div>
				</div>
				<div className={cn('h-full overflow-y-auto', contentClassName)}>{children}</div>
			</SheetContent>
		</Sheet>
	)
}
