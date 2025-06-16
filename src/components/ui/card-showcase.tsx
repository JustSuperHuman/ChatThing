import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'
import { Button } from './button'

export function CardShowcase() {
	return (
		<div className='grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3'>
			{/* Basic Card */}
			<Card className='overflow-hidden'>
				<CardHeader>
					<CardTitle>Standard Card</CardTitle>
					<CardDescription>Basic card with no interactive features</CardDescription>
				</CardHeader>
				<CardContent>
					<p>This is a simple card component with header, content, and footer sections.</p>
				</CardContent>
				<CardFooter className='flex justify-between'>
					<Button variant='outline' size='sm'>
						Cancel
					</Button>
					<Button variant='primary' size='sm'>
						Action
					</Button>
				</CardFooter>
			</Card>

			{/* Interactive Card with Lift Effect */}
			<Card interactive hover='lift' className='overflow-hidden'>
				<CardHeader>
					<CardTitle>Interactive Lift</CardTitle>
					<CardDescription>Card with lift hover effect</CardDescription>
				</CardHeader>
				<CardContent>
					<p>This card lifts upward slightly when hovered, creating a subtle 3D effect.</p>
				</CardContent>
				<CardFooter className='flex justify-between'>
					<Button variant='outline' size='sm'>
						Cancel
					</Button>
					<Button variant='primary' size='sm'>
						Action
					</Button>
				</CardFooter>
			</Card>

			{/* Glow Effect Card */}
			<Card interactive hover='glow' className='overflow-hidden'>
				<CardHeader>
					<CardTitle>Interactive Glow</CardTitle>
					<CardDescription>Card with glow hover effect</CardDescription>
				</CardHeader>
				<CardContent>
					<p>This card shows a subtle glow effect using the primary color when hovered.</p>
				</CardContent>
				<CardFooter className='flex justify-between'>
					<Button variant='outline' size='sm'>
						Cancel
					</Button>
					<Button variant='primary' size='sm'>
						Action
					</Button>
				</CardFooter>
			</Card>

			{/* Zoom Effect Card */}
			<Card interactive hover='zoom' className='overflow-hidden'>
				<CardHeader>
					<CardTitle>Interactive Zoom</CardTitle>
					<CardDescription>Card with zoom hover effect</CardDescription>
				</CardHeader>
				<CardContent>
					<p>This card scales slightly larger when hovered, creating a zoom effect.</p>
				</CardContent>
				<CardFooter className='flex justify-between'>
					<Button variant='outline' size='sm'>
						Cancel
					</Button>
					<Button variant='primary' size='sm'>
						Action
					</Button>
				</CardFooter>
			</Card>

			{/* Card with Animation */}
			<Card animation='fade-in' className='overflow-hidden'>
				<CardHeader>
					<CardTitle>Fade-In Animation</CardTitle>
					<CardDescription>Card with entry animation</CardDescription>
				</CardHeader>
				<CardContent>
					<p>This card fades in when it enters the viewport or is first rendered.</p>
				</CardContent>
				<CardFooter className='flex justify-between'>
					<Button variant='outline' size='sm'>
						Cancel
					</Button>
					<Button variant='primary' size='sm'>
						Action
					</Button>
				</CardFooter>
			</Card>

			{/* Fitness Themed Card */}
			{/* <Card
				interactive
				hover='lift'
				className='border-primary/20 dark:border-primary/30 overflow-hidden'
			>
				<div className='from-primary/10 absolute inset-0 z-0 bg-gradient-to-b to-transparent' />
				<CardHeader className='relative z-10'>
					<CardTitle className='flex items-center gap-2'>
						<span className='text-primary'>🏋️‍♂️</span> Workout Card
					</CardTitle>
					<CardDescription>Fitness-themed card design</CardDescription>
				</CardHeader>
				<CardContent className='relative z-10'>
					<p>
						A specialty card design for workout content with themed styling.
					</p>
				</CardContent>
				<CardFooter className='relative z-10 flex justify-between'>
					<Button variant='outline' size='sm'>
						Skip
					</Button>
					<Button variant='fitness' size='sm'>
						Start Workout
					</Button>
				</CardFooter>
			</Card> */}
		</div>
	)
}

export default CardShowcase
