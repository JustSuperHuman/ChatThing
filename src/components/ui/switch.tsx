import type * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

// Define size variants using CVA
const switchVariants = cva(
	'peer data-[state=checked]:bg-primary focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-slate-400',
	{
		variants: {
			size: {
				sm: 'h-[0.875rem] w-6',
				md: 'h-[1.15rem] w-8', // default size
				lg: 'h-6 w-11',
				xl: 'h-7 w-[3.25rem]',
			},
		},
		defaultVariants: {
			size: 'lg',
		},
	},
)

const switchThumbVariants = cva(
	'bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-card pointer-events-none block rounded-full ring-0 transition-transform data-[state=unchecked]:translate-x-0',
	{
		variants: {
			size: {
				sm: 'size-2.5 data-[state=checked]:translate-x-[0.625rem]', // 24px - 10px - 4px padding = 10px
				md: 'size-4 data-[state=checked]:translate-x-4', // 32px - 16px = 16px
				lg: 'size-5 data-[state=checked]:translate-x-5', // 44px - 20px - 4px padding = 20px
				xl: 'size-6 data-[state=checked]:translate-x-7', // 52px - 24px = 28px
			},
		},
		defaultVariants: {
			size: 'lg', // Changed to match the switch default
		},
	},
)

interface SwitchProps
	extends React.ComponentProps<typeof SwitchPrimitive.Root>,
		VariantProps<typeof switchVariants> {}

function Switch({ className, size, ...props }: SwitchProps) {
	return (
		<SwitchPrimitive.Root
			data-slot='switch'
			className={cn(switchVariants({ size }), className)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot='switch-thumb'
				className={cn(switchThumbVariants({ size }))}
			/>
		</SwitchPrimitive.Root>
	)
}

export { Switch }
