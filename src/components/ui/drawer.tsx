/* eslint-disable react/display-name */
'use client'

import CloseButton from './CloseButton'
import { ScrollArea } from './ScrollArea'
import { OverlayType, useOverlay } from '@/contexts/OverlayContext'
import { cn } from '@/lib/utils'
import React, { useEffect, useRef } from 'react'
import { Drawer as VaulDrawer } from 'vaul'

// Re-export all Vaul types to ensure type compatibility
export type {
	ContentProps as DrawerContentProps,
	HandleProps as DrawerHandleProps,
	DialogProps as DrawerProps,
	WithFadeFromProps,
	WithoutFadeFromProps,
} from 'vaul'

// Drawer component that integrates with the OverlayContext system
const Drawer = ({ ...props }: React.ComponentProps<typeof VaulDrawer.Root>) => {
	return <VaulDrawer.Root {...props} />
}

// Re-export the NestedRoot component
const NestedRoot = ({
	onDrag,
	onOpenChange,
	open: nestedIsOpen,
	...rest
}: React.ComponentProps<typeof VaulDrawer.NestedRoot>) => {
	return (
		<VaulDrawer.NestedRoot
			onDrag={onDrag}
			onOpenChange={onOpenChange}
			open={nestedIsOpen}
			{...rest}
		/>
	)
}

// Create subcomponents with appropriate overlay context integration
Drawer.Trigger = VaulDrawer.Trigger
Drawer.Close = VaulDrawer.Close
Drawer.Title = VaulDrawer.Title
Drawer.Description = VaulDrawer.Description
Drawer.Handle = VaulDrawer.Handle
Drawer.NestedRoot = NestedRoot

// Custom Portal implementation that works with OverlayContext
Drawer.Portal = ({
	children,
	...props
}: React.ComponentProps<typeof VaulDrawer.Portal>) => {
	return <VaulDrawer.Portal {...props}>{children}</VaulDrawer.Portal>
}

// Custom Overlay that uses OverlayContext for z-index management
Drawer.Overlay = React.forwardRef<
	React.ElementRef<typeof VaulDrawer.Overlay>,
	React.ComponentPropsWithoutRef<typeof VaulDrawer.Overlay> & {
		overlayId?: string
	}
>(({ className, overlayId, ...props }, ref) => {
	// Use overlay context to manage z-index
	const { zIndex } = useOverlay(overlayId, {
		type: OverlayType.Drawer,
	})

	return (
		<VaulDrawer.Overlay
			ref={ref}
			className={cn('fixed inset-0 bg-black/40 dark:bg-black/60', className)}
			style={{
				zIndex: zIndex ? zIndex - 1 : undefined, // Slightly lower z-index than content
				...props.style,
			}}
			{...props}
		/>
	)
})
Drawer.Overlay.displayName = 'Drawer.Overlay'

// Custom Content that integrates with OverlayContext
Drawer.Content = React.forwardRef<
	React.ElementRef<typeof VaulDrawer.Content>,
	React.ComponentPropsWithoutRef<typeof VaulDrawer.Content> & {
		overlayId?: string
		scrollable?: boolean
		scrollAreaProps?: React.ComponentProps<typeof ScrollArea>
		innerClassName?: string
		'data-direction'?: 'top' | 'bottom' | 'left' | 'right'
	}
>(
	(
		{
			children,
			className,
			overlayId,
			scrollable = true,
			scrollAreaProps,
			innerClassName,
			'data-direction': dataDirection,
			...props
		},
		ref,
	) => {
		// Use overlay context to manage z-index
		const { zIndex, id: generatedId } = useOverlay(overlayId, {
			type: OverlayType.Drawer,
		})

		// Get direction to apply appropriate styling
		const direction = dataDirection || 'right'

		// Determine the directional styling based on direction
		const getDirectionalStyles = () => {
			switch (direction) {
				case 'bottom':
					return 'right-0 bottom-0 left-0 mt-24 h-[85vh] md:h-[90vh] md:w-[95%] md:left-[2.5%] md:right-[2.5%] rounded-t-lg'
				case 'top':
					return 'top-0 right-0 left-0 mb-24 h-[85vh] md:h-[90vh] md:w-[95%] md:left-[2.5%] md:right-[2.5%] rounded-b-lg'
				case 'left':
					return 'top-0 bottom-0 left-0 w-[100vw] md:w-[800px] rounded-r-lg'
				case 'right':
					return 'top-0 right-0 bottom-0 w-[100vw] lg:w-[800px] rounded-l-lg '
				default:
					return 'top-0 right-0 bottom-0 w-[100vw] lg:w-[800px] rounded-l-lg'
			}
		}

		return (
			<VaulDrawer.Content
				ref={ref}
				className={cn(
					'bg-card text-foreground fixed flex flex-col',
					getDirectionalStyles(),
					'border-border shadow-lg',
					className,
				)}
				style={{
					zIndex,
					userSelect: 'text',
					...props.style,
				}}
				data-overlay-id={generatedId}
				data-overlay-type={OverlayType.Drawer}
				data-direction={direction}
				{...props}
			>
				{scrollable ? (
					<ScrollArea
						className={cn('flex-1 overflow-y-auto', innerClassName)}
						{...scrollAreaProps}
					>
						{children}
					</ScrollArea>
				) : (
					<div className={cn('flex-1', innerClassName)}>{children}</div>
				)}
			</VaulDrawer.Content>
		)
	},
)
Drawer.Content.displayName = 'Drawer.Content'

// Custom Header component for the drawer
const DrawerHeader = ({
	children,
	showCloseButton = true,
	onClose,
	className,
}: {
	children?: React.ReactNode
	showCloseButton?: boolean
	onClose?: () => void
	className?: string
}) => {
	return (
		<div
			className={cn(
				'border-border flex items-center justify-between border-b p-4',
				className,
			)}
		>
			{children}
			{showCloseButton && onClose && <CloseButton onClose={onClose} />}
		</div>
	)
}

// Set the displayName properly
DrawerHeader.displayName = 'DrawerHeader'
Drawer.Header = DrawerHeader

// Handle the type complexities of vaul
type SimpleDrawerVaulProps = Omit<
	React.ComponentProps<typeof VaulDrawer.Root>,
	'fadeFromIndex' | 'snapPoints'
> & {
	snapPoints?: (number | string)[]
	fadeFromIndex?: number
}

// Simple drawer component that handles common drawer patterns
export function SimpleDrawer({
	open,
	onClose,
	title,
	children,
	direction = 'right',
	showCloseButton = true,
	headerContent,
	headerActions,
	scrollable = true,
	contentClassName,
	preserveTitle = false,
	overlayId,

	// Vaul specific props
	snapPoints,
	fadeFromIndex,
	closeThreshold,
	shouldScaleBackground,
	setBackgroundColorOnScale,
	scrollLockTimeout,
	dismissible = true,
	handleOnly,
	activeSnapPoint,
	setActiveSnapPoint,
	fixed,
	modal = true,
	nested,
	noBodyStyles,
	defaultOpen,
	disablePreventScroll,
	snapToSequentialPoint,
	preventScrollRestoration,
	repositionInputs,
	onAnimationEnd,
	container,
	autoFocus,
	...otherProps
}: {
	open: boolean
	onClose: () => void
	title?: React.ReactNode
	children: React.ReactNode
	direction?: 'top' | 'bottom' | 'left' | 'right'
	showCloseButton?: boolean
	headerContent?: React.ReactNode
	headerActions?: React.ReactNode
	scrollable?: boolean
	contentClassName?: string
	preserveTitle?: boolean
	overlayId?: string
} & SimpleDrawerVaulProps) {
	const originalTitleRef = useRef<string | null>(null)

	// Handle title preservation
	useEffect(() => {
		if (!preserveTitle || typeof window === 'undefined') {
			return
		}

		if (open) {
			// Store original title when opening
			if (originalTitleRef.current === null) {
				originalTitleRef.current = document.title
			}
		}

		// Restore title when closing or unmounting
		return () => {
			if (typeof window !== 'undefined' && originalTitleRef.current !== null) {
				document.title = originalTitleRef.current
				originalTitleRef.current = null
			}
		}
	}, [open, preserveTitle])

	// Handle type compatibility for snapPoints and fadeFromIndex
	const getVaulProps = (): React.ComponentProps<typeof VaulDrawer.Root> => {
		const baseProps = {
			open,
			onOpenChange: (isOpen: boolean) => {
				if (!isOpen) onClose()
			},
			direction,
			closeThreshold,
			shouldScaleBackground,
			setBackgroundColorOnScale,
			scrollLockTimeout,
			dismissible,
			handleOnly,
			activeSnapPoint,
			setActiveSnapPoint,
			fixed,
			modal,
			nested,
			noBodyStyles,
			defaultOpen,
			disablePreventScroll,
			snapToSequentialPoint,
			preventScrollRestoration,
			repositionInputs,
			onAnimationEnd,
			container,
			autoFocus,
			...otherProps,
		}

		// Handle conditional props based on snapPoints
		if (snapPoints) {
			return {
				...baseProps,
				snapPoints,
				...(fadeFromIndex !== undefined ? { fadeFromIndex } : {}),
			}
		}

		return baseProps
	}

	if (!open) return null

	return (
		<Drawer {...getVaulProps()}>
			<Drawer.Portal>
				<Drawer.Overlay overlayId={overlayId} />
				<Drawer.Content
					overlayId={overlayId}
					scrollable={scrollable}
					className={contentClassName}
					data-direction={direction}
				>
					{title && (
						<Drawer.Description className='sr-only'>{title}</Drawer.Description>
					)}
					{(title || showCloseButton || headerContent || headerActions) && (
						<Drawer.Header
							className='border-0'
							onClose={onClose}
							showCloseButton={showCloseButton}
						>
							<div className='flex items-center gap-3'>
								{title && (
									<Drawer.Title className='text-lg font-semibold'>
										{title}
									</Drawer.Title>
								)}
								{headerContent}
							</div>
							{headerActions && (
								<div className='flex items-center gap-2'>{headerActions}</div>
							)}
						</Drawer.Header>
					)}
					{children}
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer>
	)
}

// Create a NestedDrawer component for convenience
export function NestedDrawer(
	props: React.ComponentProps<typeof VaulDrawer.NestedRoot> & {
		children: React.ReactNode
		overlayId?: string
	},
) {
	const { children, overlayId, ...rest } = props

	return <Drawer.NestedRoot {...rest}>{children}</Drawer.NestedRoot>
}

export default Drawer
