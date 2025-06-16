import React, { useState, useEffect } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

// Define option type
type ToggleOption = {
	value: string
	label: React.ReactNode
}

// Define ToggleButton variants with CVA
const toggleButtonVariants = cva(
	'flex items-center justify-center overflow-hidden rounded-full p-0.5 relative',
	{
		variants: {
			variant: {
				primary: 'bg-neutrals-100',
				secondary: 'bg-neutrals-100',
				outline: 'bg-white border border-outline-default',
			},
			size: {
				sm: 'h-10',
				md: 'h-12',
				lg: 'h-14',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'md',
		},
	},
)

// Define ToggleButton option variants with CVA
const toggleOptionVariants = cva(
	'flex flex-1 items-center justify-center rounded-full text-sm font-medium transition-colors z-10',
	{
		variants: {
			variant: {
				primary: 'text-neutrals-800',
				secondary: 'text-neutrals-800',
				outline: 'text-neutrals-700',
			},
			size: {
				sm: 'py-1 text-xs',
				md: 'py-1.5 text-sm',
				lg: 'py-2 text-base',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'md',
		},
	},
)

export interface ToggleButtonProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
		VariantProps<typeof toggleButtonVariants> {
	options: ToggleOption[]
	value: string
	onChange: (value: string) => void
	optionClassName?: string
}

const ToggleButton = React.forwardRef<HTMLDivElement, ToggleButtonProps>(
	({ className, variant, size, options, value, onChange, optionClassName, ...props }, ref) => {
		// Find the active index, default to 0 if not found
		const activeIndex = Math.max(
			0,
			options.findIndex(option => option.value === value),
		)
		const numOptions = options.length

		// Handle window resize for proper sizing
		const [windowWidth, setWindowWidth] = useState(0)

		useEffect(() => {
			const handleResize = () => setWindowWidth(window.innerWidth)
			window.addEventListener('resize', handleResize)
			handleResize() // Set initial width

			return () => window.removeEventListener('resize', handleResize)
		}, [])

		return (
			<div className={cn(toggleButtonVariants({ variant, size }), className)} ref={ref} {...props}>
				{/* Animated background indicator */}
				<motion.div
					className={cn(
						'absolute z-0 rounded-full',
						variant === 'primary' && 'background-web-primary',
						variant === 'secondary' && 'bg-neutrals-600',
						variant === 'outline' && 'background-web-primary',
					)}
					initial={false}
					animate={{
						left: `calc(${(activeIndex / numOptions) * 100}% + 2px)`,
						width: `calc(${100 / numOptions}% - 4px)`,
						top: '2px',
						bottom: '2px',
					}}
					transition={{
						type: 'spring',
						stiffness: 300,
						damping: 30,
					}}
				/>

				{/* Toggle options */}
				{options.map(option => (
					<button
						key={option.value}
						className={cn(
							toggleOptionVariants({ variant, size }),
							'relative h-full',
							'px-1', // Reduced horizontal padding
							value === option.value && variant === 'primary' && 'text-neutrals-900 font-semibold',
							value === option.value && variant === 'secondary' && 'text-white',
							value === option.value && variant === 'outline' && 'text-neutrals-900 font-semibold',
							value !== option.value && 'hover:bg-neutrals-200/50',
							optionClassName,
						)}
						onClick={() => {
							// Explicitly handle the change to ensure it works
							onChange(option.value)
						}}
						type='button'
					>
						<div className='flex w-full items-center justify-center'>{option.label}</div>
					</button>
				))}
			</div>
		)
	},
)

ToggleButton.displayName = 'ToggleButton'

export function ToggleButtonDemo() {
	// Explicitly define the state with no type constraints
	const [selectedGender, setSelectedGender] = useState('male')
	const [selectedTheme, setSelectedTheme] = useState('system')
	const [selectedNotifications, setSelectedNotifications] = useState('all')

	const genderOptions = [
		{ value: 'male', label: 'Male' },
		{ value: 'female', label: 'Female' },
	]

	const themeOptions = [
		{ value: 'light', label: 'Light' },
		{ value: 'dark', label: 'Dark' },
		{ value: 'system', label: 'System' },
	]

	const notificationsOptions = [
		{ value: 'all', label: 'All' },
		{ value: 'mentions', label: 'Mentions' },
		{ value: 'none', label: 'None' },
	]

	return (
		<div className='space-y-8 p-4'>
			<div className='space-y-2'>
				<h3 className='text-sm font-semibold'>Gender Selection</h3>
				<ToggleButton
					options={genderOptions}
					value={selectedGender}
					variant='primary'
					onChange={newValue => {
						setSelectedGender(newValue)
					}}
				/>
			</div>

			<div className='space-y-2'>
				<h3 className='text-sm font-semibold'>Theme Selection (Small, Secondary)</h3>
				<ToggleButton
					options={themeOptions}
					value={selectedTheme}
					onChange={newValue => {
						setSelectedTheme(newValue)
					}}
					variant='secondary'
					size='sm'
				/>
			</div>

			<div className='space-y-2'>
				<h3 className='text-sm font-semibold'>Notifications (Large, Outline)</h3>
				<ToggleButton
					options={notificationsOptions}
					value={selectedNotifications}
					onChange={newValue => {
						setSelectedNotifications(newValue)
					}}
					variant='outline'
					size='lg'
				/>
			</div>
		</div>
	)
}

export { ToggleButton }
