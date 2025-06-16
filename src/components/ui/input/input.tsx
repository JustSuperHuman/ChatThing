import { forwardRef, type InputHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export const inputVariants = cva(
	'flex h-10 w-full rounded-md border border-border bg-input px-3 py-2 text-base ring-offset-background ' +
		'file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-muted-foreground ' +
		'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring ' +
		'focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
	{
		variants: {
			size: {
				sm: 'h-9 px-3 py-1', // 36px
				md: 'h-10 px-4 py-2', // 40px
			},
		},
		defaultVariants: {
			size: 'md',
		},
	},
)

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> &
	VariantProps<typeof inputVariants> & {
		error?: string
		valid?: string
	}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, type, size, value, valid, error, ...props }, ref) => (
		<div className='relative'>
			<input
				type={type ?? 'text'}
				className={cn(
					inputVariants({ size }),
					'text-foreground',
					'placeholder:text-text-secondary-dark',
					'[&::-ms-reveal]:hidden', // Hide password reveal button in Edge (since we have our own)
					valid && 'border-success focus-visible:ring-success/30',
					error && 'border-destructive focus-visible:ring-destructive/30',
					className,
				)}
				value={value}
				ref={ref}
				{...props}
			/>
			{error && (
				<p className='text-destructive mt-1 flex items-center gap-1.5 text-xs transition-opacity'>
					<AlertCircle className='h-3.5 w-3.5' />
					{error}
				</p>
			)}
			{valid && (
				<p className='text-success mt-1 flex items-center gap-1.5 text-xs transition-opacity'>
					<CheckCircle className='h-3.5 w-3.5' />
					{valid}
				</p>
			)}
		</div>
	),
)

Input.displayName = 'Input'

export { Input }
