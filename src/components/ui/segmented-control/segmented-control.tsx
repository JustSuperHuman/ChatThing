import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'

const SegmentedControl = TabsPrimitive.Root

const SegmentedControlList = forwardRef<
	ElementRef<typeof TabsPrimitive.List>,
	ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.List
		ref={ref}
		className={cn(
			'inline-flex h-9 items-center justify-center rounded-md bg-neutral-200 p-1 text-neutral-400',
			className,
		)}
		{...props}
	/>
))
SegmentedControlList.displayName = TabsPrimitive.List.displayName

const SegmentedControlTrigger = forwardRef<
	ElementRef<typeof TabsPrimitive.Trigger>,
	ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Trigger
		ref={ref}
		className={cn(
			'font-regular flex shrink-0 items-center justify-center rounded px-3 py-1 text-sm whitespace-nowrap ' +
				'ring-offset-background focus-visible:ring-ring transition-all focus-visible:ring-2 focus-visible:outline-hidden' +
				'focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white' +
				'data-[state=active]:text-neutral-500 data-[state=active]:shadow-sm',
			className,
		)}
		{...props}
	/>
))
SegmentedControlTrigger.displayName = TabsPrimitive.Trigger.displayName

const SegmentedControlContent = forwardRef<
	ElementRef<typeof TabsPrimitive.Content>,
	ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Content
		ref={ref}
		className={cn(
			'ring-offset-background focus-visible:ring-ring mt-3 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden',
			className,
		)}
		{...props}
	/>
))
SegmentedControlContent.displayName = TabsPrimitive.Content.displayName

export { SegmentedControl, SegmentedControlList, SegmentedControlTrigger, SegmentedControlContent }
