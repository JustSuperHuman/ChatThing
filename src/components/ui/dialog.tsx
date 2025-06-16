'use client'

import { OverlayPortal, OverlayType } from '@/contexts/OverlayContext'
import { cn } from '@/lib/utils'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import * as React from 'react'
import { Button } from './button'

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, style, ...props }, ref) => (
	<DialogPrimitive.Overlay
		ref={ref}
		className={cn(
			'bg-dark/90 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 backdrop-blur-[2px]',
			className,
		)}
		style={style}
		{...props}
	/>
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

interface DialogContentProps
	extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
	showCloseButton?: boolean
}

const DialogContent = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Content>,
	DialogContentProps
>(({ className, children, showCloseButton = true, style, ...props }, ref) => {
	return (
		<DialogPortal>
			<OverlayPortal type={OverlayType.Dialog}>
				<DialogOverlay />
				<DialogPrimitive.Content
					ref={ref}
					className={cn(
						'fixed top-[50%] left-[50%] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-6',
						'border-border bg-background border p-6 shadow-lg',
						'data-[state=open]:animate-in data-[state=closed]:animate-out duration-200',
						'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
						'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
						'rounded-lg',
						className,
					)}
					style={style}
					{...props}
				>
					{children}
					{showCloseButton && (
						<DialogPrimitive.Close asChild>
							<Button
								variant='ghost'
								size={'sm'}
								className={`text-foreground hover:bg-foreground/10 absolute top-4 right-4 flex-shrink-0 ${className}`}
							>
								<X className='h-4 w-4' />
								<span className='sr-only'>Close</span>
							</Button>
						</DialogPrimitive.Close>
					)}
				</DialogPrimitive.Content>
			</OverlayPortal>
		</DialogPortal>
	)
})
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn('flex flex-col gap-1.5 text-left', className)}
		{...props}
	/>
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			'flex flex-col-reverse gap-2 sm:flex-row sm:space-x-2',
			className,
		)}
		{...props}
	/>
)
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Title
		ref={ref}
		className={cn(
			'text-foreground text-lg leading-none font-semibold tracking-tight',
			className,
		)}
		{...props}
	/>
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Description
		ref={ref}
		className={cn('accent-colors-green-300 text-sm', className)}
		{...props}
	/>
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
}
