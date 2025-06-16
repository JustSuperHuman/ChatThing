import React from 'react'
import Link from 'next/link'
import { Typography, type TypographyProps } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

interface LinkTextProps extends TypographyProps {
	href: string
	className?: string
}

export function LinkText({ href, className, children, ...props }: LinkTextProps) {
	return (
		<Link href={href} passHref>
			<Typography
				{...props}
				className={cn('text-primary cursor-pointer hover:underline', className)}
			>
				{children}
			</Typography>
		</Link>
	)
}
