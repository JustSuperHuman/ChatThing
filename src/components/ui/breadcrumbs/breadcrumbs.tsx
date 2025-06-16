import {
	type ComponentProps,
	forwardRef,
	type ReactNode,
	type ComponentPropsWithoutRef,
} from 'react'
import { ChevronDown, Slash } from 'lucide-react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/lib/utils'

const Breadcrumbs = forwardRef<
	HTMLElement,
	ComponentPropsWithoutRef<'nav'> & {
		separator?: ReactNode
	}
>(({ ...props }, ref) => <nav ref={ref} aria-label='breadcrumb' {...props} />)
Breadcrumbs.displayName = 'Breadcrumb'

const BreadcrumbList = forwardRef<HTMLOListElement, ComponentPropsWithoutRef<'ol'>>(
	({ className, ...props }, ref) => (
		<ol
			ref={ref}
			className={cn(
				'flex flex-wrap items-center gap-1.5 text-sm break-words text-neutral-400 sm:gap-2.5',
				className,
			)}
			{...props}
		/>
	),
)
BreadcrumbList.displayName = 'BreadcrumbList'

const BreadcrumbItem = forwardRef<HTMLLIElement, ComponentPropsWithoutRef<'li'>>(
	({ className, ...props }, ref) => (
		<li ref={ref} className={cn('inline-flex items-center gap-1.5', className)} {...props} />
	),
)
BreadcrumbItem.displayName = 'BreadcrumbItem'

const BreadcrumbLink = forwardRef<
	HTMLAnchorElement,
	ComponentPropsWithoutRef<'a'> & {
		asChild?: boolean
	}
>(({ asChild, className, ...props }, ref) => {
	const Comp = asChild ? Slot : 'a'

	return (
		<Comp
			ref={ref}
			className={cn('transition-colors hover:text-neutral-500', className)}
			{...props}
		/>
	)
})
BreadcrumbLink.displayName = 'BreadcrumbLink'

const BreadcrumbPage = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<'span'>>(
	({ className, ...props }, ref) => (
		<span
			ref={ref}
			role='link'
			aria-disabled='true'
			aria-current='page'
			className={cn('text-foreground font-normal', className)}
			{...props}
		/>
	),
)
BreadcrumbPage.displayName = 'BreadcrumbPage'

const BreadcrumbSeparator = ({ children, className, ...props }: ComponentProps<'li'>) => (
	<li role='presentation' aria-hidden='true' className={cn('[&>svg]:size-5', className)} {...props}>
		{children ?? <Slash className='size-4 border-neutral-400' />}
	</li>
)
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator'

const BreadcrumbEllipsis = ({ className, ...props }: ComponentProps<'span'>) => (
	<span
		role='presentation'
		aria-hidden='true'
		className={cn('flex h-9 w-9 items-center justify-center', className)}
		{...props}
	>
		<ChevronDown className='size-4' />
		<span className='sr-only'>More</span>
	</span>
)
BreadcrumbEllipsis.displayName = 'BreadcrumbElipssis'

export {
	Breadcrumbs,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
	BreadcrumbEllipsis,
}
