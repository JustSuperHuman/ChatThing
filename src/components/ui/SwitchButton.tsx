import React from 'react'
import { cn } from '@/lib/utils' // Assuming this is your utility for class names

// Define the possible values for the switch.
export type SwitchValue = 'A' | 'B' | 'both' | boolean

// The internal state will always be one of 'A', 'B', or 'both'.
export type InternalSwitchState = 'A' | 'B' | 'both'

// The value emitted by onChange.
export type OnChangeValue = 'A' | 'B' | 'both'

export type SwitchButtonProps = {
	value: SwitchValue
	onChange?: (value: OnChangeValue) => void
	optionALabel?: string // Text content for option A or semantic meaning for A state
	optionBLabel?: string // Text content for option B or semantic meaning for B state
	ariaLabelOptionA?: string // Aria-label for option A button (if allowBoth=true)
	ariaLabelOptionB?: string // Aria-label for option B button (if allowBoth=true)
	allowBoth?: boolean
	disabled?: boolean
	size?: 'sm' | 'md' | 'lg'
	'aria-label': string // Required for accessibility of the group or switch
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'value'>

// Helper to normalize the incoming `value` prop to an `InternalSwitchState`
const normalizeValueToInternal = (
	val: SwitchValue,
	isBothAllowed: boolean,
	optionALabelForContext: string, // Used for more contextual warning messages
): InternalSwitchState => {
	let result: InternalSwitchState
	if (val === true) {
		result = 'B' // Convention: true maps to Option B (e.g., "On", "Active")
	} else if (val === false) {
		result = 'A' // Convention: false maps to Option A (e.g., "Off", "Inactive")
	} else if (val === 'A' || val === 'B' || val === 'both') {
		result = val
	} else {
		// Fallback for undefined or other unexpected values
		console.warn(
			`SwitchButton: Received unexpected value '${val}'. Defaulting to state 'A' (associated with label '${optionALabelForContext}').`,
		)
		result = 'A'
	}

	// If 'both' is the determined state but not allowed, default to 'A'.
	if (result === 'both' && !isBothAllowed) {
		console.warn(
			`SwitchButton: Value 'both' is not allowed when 'allowBoth' is false. Defaulting to state 'A' (associated with label '${optionALabelForContext}').`,
		)

		return 'A'
	}

	return result
}

export const SwitchButton = React.forwardRef<HTMLDivElement, SwitchButtonProps>(
	(
		{
			value,
			onChange,
			optionALabel = 'Off',
			optionBLabel = 'On',
			ariaLabelOptionA,
			ariaLabelOptionB,
			allowBoth = false,
			disabled = false,
			size = 'md',
			className,
			'aria-label': mainAriaLabel, // Destructured for clarity
			...restProps // Remaining HTMLDivElement attributes
		},
		ref,
	) => {
		const internalValue = normalizeValueToInternal(value, allowBoth, optionALabel)

		if (allowBoth) {
			// --- Segmented Button UI (when allowBoth is true) ---
			const segmentedButtonSizeClasses = {
				sm: { container: 'gap-1 p-0.5', button: 'px-3 py-1 text-xs' },
				md: { container: 'gap-1.5 p-1', button: 'px-4 py-1.5 text-sm' },
				lg: { container: 'gap-2 p-1.5', button: 'px-6 py-2 text-base' },
			}
			const currentSizeStyles = segmentedButtonSizeClasses[size]

			const handleSegmentedClick = (clickedOption: 'A' | 'B') => {
				if (disabled || !onChange) return
				let newValue: InternalSwitchState
				if (internalValue === 'both') {
					newValue = clickedOption
				} else if (internalValue === clickedOption) {
					newValue = 'both'
				} else {
					newValue = clickedOption
				}
				onChange(newValue as OnChangeValue)
			}

			const isAActive = internalValue === 'A' || internalValue === 'both'
			const isBActive = internalValue === 'B' || internalValue === 'both'

			const baseButtonClass = cn(
				'flex-1 text-center rounded-full transition-all duration-300 ease-in-out', // Smoother duration
				'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
				currentSizeStyles.button,
				disabled
					? 'cursor-not-allowed text-muted-foreground/50' // Slightly more muted
					: 'cursor-pointer text-muted-foreground hover:text-foreground',
			)

			const getButtonClasses = (isButtonA: boolean) => {
				const isActive = isButtonA ? isAActive : isBActive
				if (isActive) {
					if (isAActive && isBActive) {
						// Both active ("both" state)
						return 'bg-background/70 dark:bg-background/80 text-primary-foreground hover:bg-background/80 dark:hover:bg-background/90'
					}

					// Only this option active
					return 'bg-background text-primary-foreground hover:bg-background/90 dark:hover:bg-background/90'
				}

				// Not active
				return 'bg-transparent hover:bg-muted/60 dark:hover:bg-muted/30'
			}

			return (
				<div
					ref={ref}
					role='group'
					aria-label={mainAriaLabel}
					className={cn(
						'bg-muted/30 dark:bg-muted/20 border-border/70 flex w-full rounded-full border', // Adjusted background and border
						currentSizeStyles.container,
						disabled ? 'cursor-not-allowed opacity-70' : '', // Adjusted opacity
						className,
					)}
					{...restProps}
				>
					<button
						type='button'
						onClick={() => handleSegmentedClick('A')}
						disabled={disabled}
						aria-label={ariaLabelOptionA || optionALabel}
						aria-pressed={isAActive}
						className={cn(baseButtonClass, getButtonClasses(true))}
					>
						{optionALabel}
					</button>
					<button
						type='button'
						onClick={() => handleSegmentedClick('B')}
						disabled={disabled}
						aria-label={ariaLabelOptionB || optionBLabel}
						aria-pressed={isBActive}
						className={cn(baseButtonClass, getButtonClasses(false))}
					>
						{optionBLabel}
					</button>
				</div>
			)
		}

		// --- Traditional Switch UI (when allowBoth is false) ---
		const switchSizeStyles = {
			sm: {
				track: 'w-9 h-5 p-0.5',
				thumb: 'w-4 h-4',
				translate: 'translate-x-4',
			},
			md: {
				track: 'w-11 h-6 p-0.5',
				thumb: 'w-5 h-5',
				translate: 'translate-x-5',
			},
			lg: {
				track: 'w-[3.25rem] h-7 p-0.5',
				thumb: 'w-6 h-6',
				translate: 'translate-x-6',
			}, // 52px track
		}
		const currentSwitchStyles = switchSizeStyles[size]
		const isChecked = internalValue === 'B' // 'B' corresponds to "on" or "checked"

		const handleToggle = () => {
			if (disabled || !onChange) return
			const newValue = internalValue === 'A' ? 'B' : 'A'
			onChange(newValue as OnChangeValue) // 'both' is not possible here
		}

		const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
			if (event.key === ' ' || event.key === 'Enter') {
				event.preventDefault()
				handleToggle()
			}
		}

		return (
			<div
				ref={ref}
				className={cn(
					'inline-block align-middle', // Makes it sit nicely with text or other inline elements
					disabled && 'opacity-70', // Apply disabled opacity to the wrapper
					className,
				)}
				{...restProps} // Spread other HTMLDivElement props (id, data-*, style etc.)
			>
				<button
					type='button'
					role='switch'
					aria-checked={isChecked}
					aria-label={mainAriaLabel}
					disabled={disabled}
					onClick={handleToggle}
					onKeyDown={handleKeyDown}
					className={cn(
						'relative inline-flex shrink-0 items-center rounded-full transition-colors duration-300 ease-in-out',
						'focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
						currentSwitchStyles.track,
						isChecked
							? 'bg-background'
							: 'bg-muted hover:bg-muted-foreground/10 dark:hover:bg-muted-foreground/20', // Subtle hover for off state
						disabled ? 'cursor-not-allowed' : 'cursor-pointer',
					)}
				>
					<span
						aria-hidden='true'
						className={cn(
							'bg-background pointer-events-none block transform rounded-full shadow-lg ring-0 transition-transform duration-300 ease-in-out',
							currentSwitchStyles.thumb,
							isChecked ? currentSwitchStyles.translate : 'translate-x-0',
						)}
					/>
				</button>
			</div>
		)
	},
)

SwitchButton.displayName = 'SwitchButton'
