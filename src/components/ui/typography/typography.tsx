import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

export type TypographyVariantKey =
	| 'h1-bold'
	| 'h1-semibold'
	| 'h1-medium'
	| 'h2-bold'
	| 'h2-semibold'
	| 'h2-medium'
	| 'h3-bold'
	| 'h3-semibold'
	| 'h3-medium'
	| 'h4-bold'
	| 'h4-semibold'
	| 'h4-medium'
	| 'h5-bold'
	| 'h5-semibold'
	| 'h5-medium'
	| 'subtitle-large-semibold'
	| 'subtitle-large-bold'
	| 'subtitle-large-medium'
	| 'subtitle-small-bold'
	| 'subtitle-small-semibold'
	| 'subtitle-small-medium'
	| 'body-large-bold'
	| 'body-large-regular'
	| 'body-large-medium'
	| 'body-small-regular'
	| 'body-small-bold'
	| 'body-small-medium'
	| 'caption-bold'
	| 'caption-medium'
	| 'caption-regular'
	| 'p'
	| 'blockquote'
	| 'table'
	| 'list'
	| 'code'
	| 'large'
	| 'anchor'

	// Simple naming variants
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'subtitle1'
	| 'subtitle2'
	| 'body1'
	| 'body2'
	| 'button'
	| 'overline'
	| 'pre'
	| 'strong'
	| 'italic'
	| 'strikethrough'
	| 'truncate'

type AffectsKey = 'lead' | 'small' | 'muted' | 'removePaddingMargin' | undefined

type TypographyColors =
	| 'primary'
	| 'secondary'
	| 'dark'
	| 'accent'
	| 'tertiary'
	| 'success'
	| 'warning'
	| 'danger'
	| 'disabled'
	| 'info'
	| 'brand-primary'
	| 'light-primary'

const typographyVariants = cva(' text-foreground', {
	variants: {
		variant: {
			// Updated Header variants to match table values with modern spacing
			'h1-bold': 'leading-xl text-3xl font-bold tracking-tight', // 40px font, 48px line height
			'h1-semibold': 'leading-xl text-3xl font-semibold tracking-tight', // 40px font, 48px line height
			'h1-medium': 'leading-xl text-3xl font-medium tracking-tight', // 40px font, 48px line height
			'h2-bold': 'leading-lg text-2xl font-bold tracking-tight', // 32px font, 40px line height
			'h2-semibold': 'leading-lg text-2xl font-semibold tracking-tight', // 32px font, 40px line height
			'h2-medium': 'leading-lg text-2xl font-medium tracking-tight', // 32px font, 40px line height
			'h3-bold': 'leading-md text-xl font-bold tracking-tight', // 24px font, 32px line height
			'h3-semibold': 'leading-md text-xl font-semibold tracking-tight', // 24px font, 32px line height
			'h3-medium': 'leading-md text-xl font-medium tracking-tight', // 24px font, 32px line height
			'h4-bold': 'leading-sm text-lg font-bold tracking-tight', // 20px font, 28px line height
			'h4-semibold': 'leading-sm text-lg font-semibold tracking-tight', // 20px font, 28px line height
			'h4-medium': 'leading-sm text-lg font-medium tracking-tight', // 20px font, 28px line height
			'h5-bold': 'text-md leading-xs font-bold tracking-tight', // 18px font, 26px line height
			'h5-semibold': 'text-md leading-xs font-semibold tracking-tight', // 18px font, 26px line height
			'h5-medium': 'text-md leading-xs font-medium tracking-tight', // 18px font, 26px line height

			// Updated Subtitle variants with better readability
			'subtitle-large-bold': 'leading-sm text-sm font-bold', // 16px font, 24px line height
			'subtitle-large-semibold': 'text-md leading-xs font-semibold', // 18px font, 26px line height
			'subtitle-large-medium': 'leading-sm text-sm font-medium', // 16px font, 24px line height
			'subtitle-small-bold': 'leading-sm text-xs font-bold', // 14px font, 24px line height
			'subtitle-small-semibold': 'text-md leading-xs font-semibold', // 18px font, 26px line height
			'subtitle-small-medium': 'leading-sm text-xs font-medium', // 14px font, 24px line height

			// Updated Body variants with improved legibility
			'body-large-regular': 'text-md leading-xs font-regular', // 18px font, 26px line height
			'body-large-bold': 'leading-sm text-sm font-bold', // 16px font, 24px line height
			'body-large-medium': 'leading-sm text-xs font-medium', // 14px font, 24px line height
			'body-small-regular': 'leading-sm font-regular text-xs', // 14px font, 24px line height
			'body-small-bold': 'text-md leading-xs font-bold', // 18px font, 26px line height
			'body-small-medium': 'leading-sm text-xs font-medium', // 14px font, 24px line height

			// Updated Caption variants
			'caption-medium': 'text-xxs leading-xxs font-medium', // 12px font, 20px line height
			'caption-bold': 'text-md leading-xs font-bold', // 18px font, 26px line height
			'caption-regular': 'text-xxs leading-xxs font-regular', // 12px font, 20px line height

			// Updated variants
			p: 'leading-sm font-regular text-sm',
			blockquote: 'mt-6 border-l-2 border-border pl-6 italic',
			table:
				'w-full [&_td]:border [&_td]:border-border [&_td]:px-4 [&_td]:py-2 [&_td]:text-left [&_td]:[&[align=center]]:text-center [&_td]:[&[align=right]]:text-right [&_th]:border [&_th]:border-border [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-bold [&_th]:[&[align=center]]:text-center [&_th]:[&[align=right]]:text-right [&_tr]:m-0 [&_tr]:border-t [&_tr]:border-border [&_tr]:p-0 even:[&_tr]:bg-muted',
			list: 'my-6 ml-6 list-disc [&>li]:mt-2',
			code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
			large: 'text-md leading-xs font-semibold',
			anchor:
				'font-medium text-primary underline underline-offset-4 hover:text-primary-hover transition-colors',

			// Simple naming variants (matching to existing styles)
			h1: 'leading-xl text-3xl font-semibold tracking-tight', // Maps to h1-semibold
			h2: 'leading-lg text-2xl font-semibold tracking-tight', // Maps to h2-semibold
			h3: 'leading-md text-xl font-semibold tracking-tight', // Maps to h3-semibold
			h4: 'leading-sm text-lg font-semibold tracking-tight', // Maps to h4-semibold
			h5: 'text-md leading-xs font-semibold tracking-tight', // Maps to h5-semibold
			h6: 'text-sm leading-sm font-semibold tracking-tight', // New variant
			subtitle1: 'text-md leading-xs font-semibold', // Maps to subtitle-large-semibold
			subtitle2: 'leading-sm text-xs font-semibold', // Maps to subtitle-small-semibold
			body1: 'text-md leading-xs font-regular', // Maps to body-large-regular
			body2: 'leading-sm font-regular text-xs', // Maps to body-small-regular
			button: 'text-sm font-medium leading-none', // New variant for button text
			overline: 'text-xxs leading-xxs font-medium uppercase tracking-wider', // New variant
			pre: 'block p-4 rounded bg-muted font-mono text-sm whitespace-pre overflow-x-auto', // New variant
			strong: 'font-bold', // New variant
			italic: 'italic', // New variant
			strikethrough: 'line-through', // New variant
			truncate: 'truncate', // New variant for ellipsis text
		},

		// Updated affects for better dark mode compatibility
		affects: {
			lead: 'text-xl text-muted-foreground',
			small: 'text-sm font-medium leading-none',
			muted: 'text-sm text-muted-foreground',
			removePaddingMargin: 'not-first:mt-0',
		},

		// Updated colors to use CSS variables for dark mode compatibility
		color: {
			primary: 'text-foreground',
			secondary: 'text-muted-foreground',
			dark: 'text-foreground',
			disabled: 'text-muted-foreground/60',
			accent: 'text-accent',
			tertiary: 'text-muted-foreground/80',
			success: 'text-[hsl(var(--success))]',
			warning: 'text-[hsl(var(--warning))]',
			danger: 'text-[hsl(var(--danger))]',
			info: 'text-[hsl(var(--info))]',
			'brand-primary': 'text-primary',
			'light-primary': 'text-foreground dark:text-primary-foreground',
		},
	},
	defaultVariants: {
		variant: 'p',
		affects: undefined,
		color: 'primary',
	},
})

const variantToTag: Record<TypographyVariantKey, string> = {
	'h1-bold': 'h1',
	'h1-semibold': 'h1',
	'h1-medium': 'h1',
	'h2-bold': 'h2',
	'h2-semibold': 'h2',
	'h2-medium': 'h2',
	'h3-bold': 'h3',
	'h3-semibold': 'h3',
	'h3-medium': 'h3',
	'h4-bold': 'h4',
	'h4-semibold': 'h4',
	'h4-medium': 'h4',
	'h5-bold': 'h5',
	'h5-semibold': 'h5',
	'h5-medium': 'h5',
	'subtitle-large-semibold': 'p',
	'subtitle-large-bold': 'p',
	'subtitle-large-medium': 'p',
	'subtitle-small-bold': 'p',
	'subtitle-small-semibold': 'p',
	'subtitle-small-medium': 'p',
	'body-large-bold': 'p',
	'body-large-regular': 'p',
	'body-large-medium': 'p',
	'body-small-regular': 'p',
	'body-small-bold': 'p',
	'body-small-medium': 'p',
	'caption-bold': 'p',
	'caption-medium': 'p',
	'caption-regular': 'p',
	p: 'p',
	blockquote: 'blockquote',
	table: 'table',
	list: 'ul',
	code: 'code',
	large: 'div',
	anchor: 'a',

	// Simple naming variants
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4',
	h5: 'h5',
	h6: 'h6',
	subtitle1: 'p',
	subtitle2: 'p',
	body1: 'p',
	body2: 'p',
	button: 'span',
	overline: 'span',
	pre: 'pre',
	strong: 'strong',
	italic: 'em',
	strikethrough: 'span',
	truncate: 'span',
}

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
	children: React.ReactNode
	variant?: TypographyVariantKey
	affects?: AffectsKey
	color?: TypographyColors
	className?: string
	asChild?: boolean
	disableSelect?: boolean
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
	(
		{
			variant = 'p',
			affects = undefined,
			children,
			className,
			asChild = false,
			disableSelect = false,
			color = 'dark',
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : variantToTag[variant]

		return (
			<Comp
				className={cn(
					typographyVariants({ variant, affects, color }),
					className,
					disableSelect ? 'select-none' : '',
				)}
				ref={ref}
				{...props}
			>
				{children}
			</Comp>
		)
	},
)

Typography.displayName = 'Typography'

export default Typography

export { Typography }
