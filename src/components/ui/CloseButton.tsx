import React from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CloseButtonProps {
	onClose?: () => void
	className?: string
	size?: 'sm' | 'md' | 'lg'
}

const CloseButton = ({ onClose, className = '', size = 'sm' }: CloseButtonProps) => {
	return (
		<Button
			variant='ghost'
			size={size}
			onClick={onClose}
			className={`text-foreground hover:bg-foreground/10 flex-shrink-0 ${className}`}
		>
			<X className='h-4 w-4' />
		</Button>
	)
}

export default CloseButton
