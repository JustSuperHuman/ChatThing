import { cn } from '@/lib/utils'
import { forwardRef, type Ref, type HTMLProps } from 'react'
import type SimpleBarCore from 'simplebar-core'

// @ts-expect-error -- no types for this library
import SimpleBar from 'simplebar-react'

interface ScrollAreaProps extends HTMLProps<HTMLDivElement> {
	hideScrollbar?: boolean
	autoHide?: boolean
	scrollbarMaxSize?: number
	propRef?: Ref<HTMLDivElement | null>
}

const ScrollArea = forwardRef<SimpleBarCore | HTMLDivElement, ScrollAreaProps>(
	(
		{
			children,
			className,
			hideScrollbar = false,
			autoHide = true,
			scrollbarMaxSize,
			propRef,
			...props
		},
		ref,
	) => {
		return (
			<SimpleBar
				style={props.style}
				className={cn(
					hideScrollbar ? 'overflow-hidden' : 'h-full w-full',
					className,
				)}
				scrollableNodeProps={{ ref: propRef ?? ref }}
				autoHide={autoHide}
				scrollbarMaxSize={scrollbarMaxSize}
				{...props}
			>
				{children}
			</SimpleBar>
		)
	},
)

ScrollArea.displayName = 'ScrollArea'

export { ScrollArea }

export type { ScrollAreaProps }
