import { forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Input, type InputProps } from '@/components/ui/input/input'
import { IconButton } from '@/components/ui/icon-button'

const InputPassword = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
	const [showPassword, setShowPassword] = useState(false)

	const togglePasswordVisibility = () => {
		setShowPassword(prev => !prev)
	}

	return (
		<div className='relative'>
			<Input
				className={cn('pr-10', className)}
				autoCapitalize='none'
				autoCorrect='off'
				spellCheck='false'
				type={showPassword ? 'text' : 'password'}
				ref={ref}
				{...props}
			/>
			<IconButton
				type='button'
				size='sm'
				variant='ghost'
				className='absolute top-4 -right-2 -translate-y-1/2 px-0 shadow-none hover:bg-transparent'
				onClick={togglePasswordVisibility}
				tabIndex={-1}
			>
				{showPassword ? (
					<EyeOff className='h-4 w-4 text-gray-500' />
				) : (
					<Eye className='h-4 w-4 text-gray-500' />
				)}
			</IconButton>
		</div>
	)
})

InputPassword.displayName = 'InputPassword'

export { InputPassword }
