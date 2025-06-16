import type React from 'react'
import { FaApple } from 'react-icons/fa'
import { cn } from '@/lib/utils'
// We will use lucide-react icons instead of custom SVGs
// For Google, we can use a generic 'G' or a 'chrome' icon if available
// For Facebook, we can use the 'Facebook' icon from lucide-react
import { Facebook } from 'lucide-react'

type SocialPlatform = 'google' | 'apple' | 'facebook'

type SocialLoginButtonProps = {
	platform: SocialPlatform
	onClick: () => void
	disabled?: boolean
	className?: string
	size?: 'sm' | 'md' | 'lg'
} & React.ComponentPropsWithoutRef<'div'>

const platformConfig: Record<
	SocialPlatform,
	{
		icon: React.ReactNode
		label: string
		color: string
		bgHover: string
	}
> = {
	google: {
		icon: <span className="font-bold">G</span>,
		label: 'Google',
		color: 'text-[#4285F4]',
		bgHover: 'hover:bg-[#4285F4]/10',
	},
	apple: {
		icon: <FaApple />,
		label: 'Apple',
		color: 'text-[#000000] dark:text-white',
		bgHover: 'hover:bg-gray-100 dark:hover:bg-gray-800',
	},
	facebook: {
		icon: <Facebook />,
		label: 'Facebook',
		color: 'text-[#1877F2]',
		bgHover: 'hover:bg-[#1877F2]/10',
	},
}

export function SocialLoginButton({
	platform,
	onClick,
	disabled = false,
	className,
	size = 'md',
	...props
}: SocialLoginButtonProps) {
	const { icon, color, bgHover } = platformConfig[platform]

	// Size classes
	const sizeClasses = {
		sm: 'p-2',
		md: 'p-2.5',
		lg: 'p-3',
	}

	const iconSizeClasses = {
		sm: 'text-base',
		md: 'text-xl',
		lg: 'text-2xl',
	}

	return (
		<div {...props} className={cn('flex justify-center', className)}>
			<button
				className={cn(
					'flex items-center justify-center rounded-md',
					'border-border border',
					'bg-background',
					'shadow-sm transition-all duration-200',
					'focus-visible:ring-primary/50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
					bgHover,
					sizeClasses[size],
					{
						'cursor-not-allowed opacity-50': disabled,
						'hover:scale-105': !disabled,
					},
				)}
				onClick={!disabled ? onClick : undefined}
				disabled={disabled}
				aria-label={`Sign in with ${platformConfig[platform].label}`}
				type='button'
			>
				<span className={cn('flex items-center justify-center', color, iconSizeClasses[size])}>
					{icon}
				</span>
			</button>
		</div>
	)
}
