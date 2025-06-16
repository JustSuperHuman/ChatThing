import React from 'react'
import { cn } from '@/lib/utils'

interface ColorSwatchProps {
	name: string
	variable: string
}

export function ColorSwatch({ name, variable }: ColorSwatchProps) {
	// Convert CSS variable format (--name) to hsl var format (var(--name))
	const cssVarName = variable
	const value = `hsl(var(${cssVarName}))`

	return (
		<div className='flex flex-col'>
			<div
				className={cn('border-border mb-1 h-14 w-full rounded-md border')}
				style={{ backgroundColor: value }}
			/>
			<div className='text-xs'>
				<p className='font-medium'>{name}</p>
				<p className='text-muted-foreground'>{cssVarName}</p>
			</div>
		</div>
	)
}
