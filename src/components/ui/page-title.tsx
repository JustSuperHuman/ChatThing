import type React from 'react'
import type { PropsWithChildren } from 'react'
import { Pencil } from 'lucide-react'

import { Typography, type TypographyVariantKey } from '@/components/ui/typography'
import { IconButton } from '@/components/ui/icon-button'

type Props = {
	className?: string
	size?: TypographyVariantKey
	onEdit?: () => void
	editable?: boolean
} & PropsWithChildren &
	React.HTMLAttributes<HTMLDivElement>

export const PageTitle: React.FC<Props> = ({
	children,
	className,
	onEdit,
	size,
	editable = true,
	...rest
}) => (
	<div style={{ gap: '10px' }} className='flex items-center' {...rest}>
		<Typography variant={size} className={className}>
			{children}
		</Typography>
		{editable && (
			<IconButton
				className='m-0 hidden items-center bg-transparent fill-neutral-500 text-neutral-400 hover:border hover:border-neutral-300 hover:bg-neutral-200 md:flex'
				icon={<Pencil className='h-5 w-5 rounded-full' />}
				onClick={onEdit}
				aria-label='Edit title'
			/>
		)}
	</div>
)
