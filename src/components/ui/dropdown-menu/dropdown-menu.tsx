'use client'

import {
	forwardRef,
	type ComponentPropsWithoutRef,
	type ElementRef,
	type HTMLAttributes,
	type ReactNode,
} from 'react'
import { ChevronRight, Plus } from 'lucide-react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { OverlayPortal, OverlayType } from '@/contexts/OverlayContext'
import { cn } from '@/lib/utils'

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuGroup = DropdownMenuPrimitive.Group
const DropdownMenuPortal = DropdownMenuPrimitive.Portal
const DropdownMenuSub = DropdownMenuPrimitive.Sub
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const sharedItemClass =
	'relative flex select-none cursor-pointer items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'

const DropdownMenuSubTrigger = forwardRef<
	ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
	ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
		inset?: boolean
	}
>(({ className, inset, children, ...props }, ref) => (
	<DropdownMenuPrimitive.SubTrigger
		ref={ref}
		className={cn(sharedItemClass, 'data-[state=open]:bg-accent', inset && 'pl-8', className)}
		{...props}
	>
		{children}
		<ChevronRight className='ml-auto size-4' />
	</DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger'

const DropdownMenuSubContent = forwardRef<
	ElementRef<typeof DropdownMenuPrimitive.SubContent>,
	ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
	<DropdownMenuPrimitive.Portal>
		<OverlayPortal type={OverlayType.Dropdown}>
			<DropdownMenuPrimitive.SubContent
				ref={ref}
				className={cn(
					'bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md',
					className,
				)}
				{...props}
			/>
		</OverlayPortal>
	</DropdownMenuPrimitive.Portal>
))
DropdownMenuSubContent.displayName = 'DropdownMenuSubContent'

const DropdownMenuContent = forwardRef<
	ElementRef<typeof DropdownMenuPrimitive.Content>,
	ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
	<DropdownMenuPrimitive.Portal>
		<OverlayPortal type={OverlayType.Dropdown}>
			<DropdownMenuPrimitive.Content
				ref={ref}
				sideOffset={sideOffset}
				className={cn(
					'bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md',
					className,
				)}
				{...props}
			/>
		</OverlayPortal>
	</DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = 'DropdownMenuContent'

const DropdownMenuItem = forwardRef<
	ElementRef<typeof DropdownMenuPrimitive.Item>,
	ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
		inset?: boolean
		icon?: ReactNode
		children: ReactNode
	}
>(({ className, inset, icon, children, ...props }, ref) => (
	<DropdownMenuPrimitive.Item
		ref={ref}
		className={cn(sharedItemClass, inset && 'pl-8', className)}
		{...props}
	>
		{icon ? (
			<span className='flex items-center gap-2.5'>
				{icon} {children}
			</span>
		) : (
			children
		)}
	</DropdownMenuPrimitive.Item>
))
DropdownMenuItem.displayName = 'DropdownMenuItem'

const DropdownMenuCheckboxItem = forwardRef<
	ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
	ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
	<DropdownMenuPrimitive.CheckboxItem
		ref={ref}
		checked={checked}
		className={cn(sharedItemClass, 'pl-8', className)}
		{...props}
	>
		<span className='absolute left-2 flex size-3.5 items-center justify-center'>
			<DropdownMenuPrimitive.ItemIndicator>
				<Plus className='size-4' />
			</DropdownMenuPrimitive.ItemIndicator>
		</span>
		{children}
	</DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem'

const DropdownMenuRadioItem = forwardRef<
	ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
	ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> & {
		icon?: ReactNode
	}
>(({ className, children, icon, ...props }, ref) => (
	<DropdownMenuPrimitive.RadioItem
		ref={ref}
		className={cn(sharedItemClass, 'pl-8', className)}
		{...props}
	>
		{icon && (
			<span className='absolute left-2 flex size-3.5 items-center justify-center'>{icon}</span>
		)}
		{children}
	</DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem'

const DropdownMenuLabel = forwardRef<
	ElementRef<typeof DropdownMenuPrimitive.Label>,
	ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
		inset?: boolean
	}
>(({ className, inset, ...props }, ref) => (
	<DropdownMenuPrimitive.Label
		ref={ref}
		className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)}
		{...props}
	/>
))
DropdownMenuLabel.displayName = 'DropdownMenuLabel'

const DropdownMenuSeparator = forwardRef<
	ElementRef<typeof DropdownMenuPrimitive.Separator>,
	ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
	<DropdownMenuPrimitive.Separator
		ref={ref}
		className={cn('bg-border -mx-1 my-1 h-px', className)}
		{...props}
	/>
))
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator'

const DropdownMenuShortcut = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => {
	return <span className={cn('ml-auto text-xs tracking-widest opacity-60', className)} {...props} />
}
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

export {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuCheckboxItem,
	DropdownMenuRadioItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuGroup,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuRadioGroup,
}
