import type React from 'react'
import { forwardRef, type PropsWithChildren } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const flatListVariants = cva('flex', {
	variants: {
		orientation: {
			row: 'flex-row',
			column: 'flex-col',
		},
		gap: {
			none: 'gap-0',
			xs: 'gap-[8px]',
			sm: 'gap-2',
			md: 'gap-4',
			lg: 'gap-6',
			xl: 'gap-8',
		},
		wrap: {
			nowrap: 'flex-nowrap',
			wrap: 'flex-wrap',
		},
		justify: {
			start: 'justify-start',
			end: 'justify-end',
			center: 'justify-center',
			between: 'justify-between',
			around: 'justify-around',
			evenly: 'justify-evenly',
		},
		align: {
			start: 'items-start',
			end: 'items-end',
			center: 'items-center',
			baseline: 'items-baseline',
			stretch: 'items-stretch',
		},
	},
	defaultVariants: {
		orientation: 'column',
		gap: 'md',
		wrap: 'nowrap',
		justify: 'start',
		align: 'stretch',
	},
})

export type FlatListProps = {
	className?: string
	as?: React.ElementType
	itemAs?: React.ElementType
	items?: React.ReactNode[]
	renderItem?: (item: React.ReactNode, index: number) => React.ReactNode
	scrollable?: boolean
} & PropsWithChildren &
	VariantProps<typeof flatListVariants> &
	React.HTMLAttributes<HTMLUListElement>

const FlatList = forwardRef<HTMLUListElement, FlatListProps>(
	(
		{
			className,
			orientation,
			gap,
			wrap,
			justify,
			align,
			as: Component = 'ul',
			itemAs: ItemComponent = 'li',
			items,
			renderItem,
			children,
			scrollable = false,
			...props
		},
		ref,
	) => {
		const content = items
			? items.map((item, index) => (
					<ItemComponent key={index}>{renderItem ? renderItem(item, index) : item}</ItemComponent>
				))
			: children

		const scrollableClass = scrollable ? 'overflow-y-auto h-full' : ''

		return (
			<Component
				ref={ref}
				className={cn(
					flatListVariants({ orientation, gap, wrap, justify, align }),
					scrollableClass,
					className,
				)}
				{...props}
			>
				{content}
			</Component>
		)
	},
)

FlatList.displayName = 'FlatList'

export default FlatList
