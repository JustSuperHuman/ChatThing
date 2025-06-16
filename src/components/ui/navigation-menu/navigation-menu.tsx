import * as React from 'react'
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef, type ReactNode } from 'react'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { cn } from '@/lib/utils'
import Link, { type LinkProps } from 'next/link'

const NavigationMenu = forwardRef<
	ElementRef<typeof NavigationMenuPrimitive.Root>,
	ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
	<NavigationMenuPrimitive.Root
		ref={ref}
		className={cn('relative z-10 flex min-w-full items-start justify-start', className)}
		{...props}
	>
		{children}
	</NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef<
	ElementRef<typeof NavigationMenuPrimitive.List>,
	ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
	<NavigationMenuPrimitive.List
		ref={ref}
		className={cn(
			'group flex min-w-full list-none flex-col items-start justify-center space-y-1',
			className,
		)}
		{...props}
	/>
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

type NavigationMenuTriggerProps = {
	icon?: ReactNode
} & ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>

const NavigationMenuTrigger = forwardRef<
	ElementRef<typeof NavigationMenuPrimitive.Trigger>,
	NavigationMenuTriggerProps
>(({ className, icon, children, ...props }, ref) => (
	<NavigationMenuPrimitive.Trigger
		ref={ref}
		className={cn(
			'hover:bg-neutrals-800/50 group inline-flex w-full items-center justify-start rounded-md transition-colors duration-200',
			className,
		)}
		{...props}
	>
		{icon && (
			<span className='text-neutrals-400 mr-3 size-4 transition-colors duration-200 group-hover:text-white'>
				{icon}
			</span>
		)}
		{children}
	</NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuItemLink = NavigationMenuPrimitive.Link

type LinkItemProps = {
	className?: string
	linkClassName?: string
	icon?: ReactNode
	children: ReactNode
} & LinkProps

const NavigationMenuLink = forwardRef<ElementRef<'a'>, LinkItemProps>(
	({ children, href, icon, className, linkClassName, ...props }, ref) => (
		<NavigationMenuItemLink
			className={cn(
				'group flex w-full items-center rounded-md px-3 py-2 transition-colors duration-200',
				'hover:bg-[color-mix(in_srgb,var(--neutrals-50)_50%,transparent)]',
				'data-active:bg-neutrals-800 data-active:text-white',
				'focus-visible:ring-neutrals-400 focus-visible:ring-2 focus-visible:outline-hidden',
				'disabled:pointer-events-none disabled:opacity-50',
				className,
			)}
			asChild
		>
			<Link
				className={cn(
					'flex w-full items-center gap-3 text-left text-base font-normal',
					'text-colors-neutrals-400 transition-colors duration-200 group-hover:text-white',
					'data-active:text-white',
					linkClassName,
				)}
				href={href}
				ref={ref}
				{...props}
			>
				{icon && (
					<span className='size-4 transition-colors duration-200 group-hover:text-white'>
						{icon}
					</span>
				)}
				{children && <span className='w-full'>{children}</span>}
			</Link>
		</NavigationMenuItemLink>
	),
)
NavigationMenuLink.displayName = 'NavigationMenuLink'

export {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuTrigger,
	NavigationMenuLink,
}
