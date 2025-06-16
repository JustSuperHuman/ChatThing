import type React from 'react'

interface ToggleSwitchProps {
	id: string
	label: string
	isChecked: boolean
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ id, label, isChecked, onChange }) => {
	return (
		<div className='flex items-center'>
			<label htmlFor={id} className='relative inline-flex cursor-pointer items-center'>
				<input
					type='checkbox'
					id={id}
					className='peer sr-only'
					checked={isChecked}
					onChange={onChange}
				/>
				<div className="h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-amber-500 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full" />
				<span className='ml-2 text-sm font-medium text-gray-700'>{label}</span>
			</label>
		</div>
	)
}

export default ToggleSwitch
