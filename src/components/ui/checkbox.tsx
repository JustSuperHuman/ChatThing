'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const Checkbox = React.forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
	<CheckboxPrimitive.Root
		ref={ref}
		className={cn(
			'peer border-neutrals-300 h-5 w-5 shrink-0 rounded-md border bg-white',
			'transition-all duration-200 ease-in-out',
			'hover:border-brand-primary-500 hover:bg-brand-primary-50',
			'focus-visible:ring-brand-primary-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
			'disabled:hover:border-neutrals-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white',
			'data-[state=checked]:border-brand-primary-500 data-[state=checked]:bg-brand-primary-500',
			'data-[state=checked]:hover:border-brand-primary-600 data-[state=checked]:hover:bg-brand-primary-600',
			className,
		)}
		{...props}
	>
		<CheckboxPrimitive.Indicator
			className={cn(
				'flex items-center justify-center text-white',
				'data-[state=checked]:animate-in data-[state=checked]:zoom-in-50 data-[state=unchecked]:animate-out data-[state=unchecked]:zoom-out-50',
				'duration-200',
			)}
		>
			<Check className='h-3.5 w-3.5 stroke-[3]' />
		</CheckboxPrimitive.Indicator>
	</CheckboxPrimitive.Root>
))

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
