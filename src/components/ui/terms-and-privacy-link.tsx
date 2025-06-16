import React from 'react'
import { LinkText } from '@/components/ui/link-text'

export function TermsAndPrivacyLinks() {
	return (
		<div className='text-center text-sm'>
			By continuing, you agree to our <LinkText href='/terms'>Terms of Use</LinkText> and{' '}
			<LinkText href='/privacy'>Privacy Policy</LinkText>.
		</div>
	)
}
