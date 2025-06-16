'use client'
import type React from 'react'
import {
	createContext,
	useContext,
	useRef,
	useEffect,
	useMemo,
	useId,
	useCallback,
	useState,
	type RefObject,
} from 'react'
import { createPortal } from 'react-dom'

export enum OverlayType {
	Content = 'content',
	Dropdown = 'dropdown',
	Popover = 'popover',
	Tooltip = 'tooltip',
	Drawer = 'drawer',
	Dialog = 'dialog',
	Alert = 'alert',
}

const TYPE_PRIORITIES: Record<OverlayType, number> = {
	[OverlayType.Content]: 0,
	[OverlayType.Dropdown]: 5,
	[OverlayType.Popover]: 30,
	[OverlayType.Tooltip]: 15,
	[OverlayType.Drawer]: 20,
	[OverlayType.Dialog]: 30,
	[OverlayType.Alert]: 40,
}
const BASE_Z = 1000
const STEP = 10

const MODAL_TYPES = new Set([OverlayType.Dialog, OverlayType.Alert, OverlayType.Drawer])

const FOCUSABLE_SELECTOR = 'a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])'

interface OverlayItem {
	id: string
	type: OverlayType
	priority: number
	timestamp: number
	z: number
	parentId?: string
	elementRef?: React.RefObject<HTMLElement>
	initialFocusRef?: React.RefObject<HTMLElement>
	isModal: boolean
}
interface FocusLock {
	id: string
	prevActive: HTMLElement | null
}

interface OverlayContextType {
	register: (item: Omit<OverlayItem, 'z' | 'timestamp'>) => void
	unregister: (id: string) => void
	updateOptions: (
		id: string,
		opts: Partial<
			Pick<
				OverlayItem,
				'elementRef' | 'initialFocusRef' | 'isModal' | 'priority' | 'type' | 'parentId'
			>
		>,
	) => void
	getZ: (id: string) => number
	isTopModal: (id: string) => boolean
}
const OverlayContext = createContext<OverlayContextType | null>(null)

export const OverlayProvider: React.FC<{
	children: React.ReactNode
	appRootRef?: React.RefObject<HTMLElement>
}> = ({ children, appRootRef }) => {
	const items = useRef<Map<string, OverlayItem>>(new Map())
	const [version, setVersion] = useState(0) // Used to trigger re-renders in consumers
	const focusLock = useRef<FocusLock | null>(null)
	const inertElements = useRef<Set<HTMLElement>>(new Set())
	const portalRootRef = useRef<HTMLElement>(null)

	const forceUpdate = useCallback(() => setVersion(v => v + 1), [])

	const manageFocusAndInert = useCallback(() => {
		const sortedOverlays = Array.from(items.current.values()).sort((a, b) => a.z - b.z)
		let topModal: OverlayItem | null = null
		for (let i = sortedOverlays.length - 1; i >= 0; i--) {
			const overlay = sortedOverlays[i]
			if (overlay?.isModal && overlay.elementRef?.current) {
				topModal = overlay
				break
			}
		}

		// Release old lock if conditions change
		if (focusLock.current && focusLock.current.id !== topModal?.id) {
			focusLock.current.prevActive?.focus({ preventScroll: true })
			focusLock.current = null
		}

		// Clear previous inert elements
		inertElements.current.forEach(el => el.removeAttribute('inert'))
		inertElements.current.clear()

		if (topModal && (!focusLock.current || focusLock.current.id !== topModal.id)) {
			focusLock.current = {
				id: topModal.id,
				prevActive: document.activeElement as HTMLElement,
			}
			const container = topModal.elementRef!.current!

			const focusTarget =
				topModal.initialFocusRef?.current ||
				container.querySelector<HTMLElement>(FOCUSABLE_SELECTOR) ||
				container
			if (focusTarget === container && !container.hasAttribute('tabindex'))
				container.setAttribute('tabindex', '-1')
			focusTarget.focus({ preventScroll: true })
		}

		if (focusLock.current) {
			const activeModalElement = items.current.get(focusLock.current.id)?.elementRef?.current
			if (
				appRootRef?.current &&
				appRootRef.current !== activeModalElement &&
				!activeModalElement?.contains(appRootRef.current)
			) {
				appRootRef.current.setAttribute('inert', 'true')
				inertElements.current.add(appRootRef.current)
			}
			items.current.forEach(item => {
				if (
					item.elementRef?.current &&
					item.id !== focusLock.current!.id &&
					item.elementRef.current !== activeModalElement &&
					!activeModalElement?.contains(item.elementRef.current)
				) {
					// Check if this item is an ancestor of active modal. If so, don't make inert.
					let isAncestor = false

					let currentParentId = items.current.get(focusLock.current!.id)?.parentId
					while (currentParentId) {
						if (currentParentId === item.id) {
							isAncestor = true
							break
						}
						currentParentId = items.current.get(currentParentId)?.parentId
					}
					if (!isAncestor) {
						item.elementRef.current.setAttribute('inert', 'true')
						inertElements.current.add(item.elementRef.current)
					}
				}
			})
		}
		forceUpdate()
	}, [appRootRef, forceUpdate])

	const recalcZ = useCallback(() => {
		const sorted = Array.from(items.current.values()).sort((a, b) =>
			a.priority === b.priority ? a.timestamp - b.timestamp : a.priority - b.priority,
		)
		sorted.forEach((item, i) => {
			item.z = BASE_Z + i * STEP
		})
		manageFocusAndInert()
	}, [manageFocusAndInert])

	const register = useCallback(
		(item: Omit<OverlayItem, 'z' | 'timestamp'>) => {
			items.current.set(item.id, { ...item, z: BASE_Z, timestamp: Date.now() })
			recalcZ()
		},
		[recalcZ],
	)

	const unregister = useCallback(
		(id: string) => {
			const item = items.current.get(id)
			items.current.delete(id)
			if (item && focusLock.current?.id === id) {
				// If unregistered item was focus lock
				focusLock.current.prevActive?.focus({ preventScroll: true })
				focusLock.current = null
			}
			recalcZ() // This will also call manageFocusAndInert
		},
		[recalcZ],
	)

	const updateOptions = useCallback(
		(
			id: string,
			opts: Partial<
				Pick<
					OverlayItem,
					'elementRef' | 'initialFocusRef' | 'isModal' | 'priority' | 'type' | 'parentId'
				>
			>,
		) => {
			const item = items.current.get(id)
			if (item) {
				let needsRecalc = false
				if (opts.priority !== undefined && item.priority !== opts.priority) {
					item.priority = opts.priority
					needsRecalc = true
				}
				if (opts.type !== undefined && item.type !== opts.type) {
					item.type = opts.type
					needsRecalc = true
				}
				if (opts.parentId !== undefined && item.parentId !== opts.parentId) {
					item.parentId = opts.parentId
					needsRecalc = true
				} // parent change might affect logical grouping
				if (opts.isModal !== undefined && item.isModal !== opts.isModal) {
					item.isModal = opts.isModal
					needsRecalc = true
				}
				if (opts.elementRef && item.elementRef !== opts.elementRef) {
					item.elementRef = opts.elementRef
					needsRecalc = true
				}
				if (opts.initialFocusRef && item.initialFocusRef !== opts.initialFocusRef) {
					item.initialFocusRef = opts.initialFocusRef
					needsRecalc = true
				}
				if (needsRecalc) recalcZ()
			}
		},
		[recalcZ],
	)

	const getZ = useCallback((id: string) => items.current.get(id)?.z ?? BASE_Z, []) // `version` dependency ensures fresh value

	const isTopModal = useCallback((id: string) => focusLock.current?.id === id, []) // `version` dependency

	useEffect(() => {
		// Cleanup inert attributes on provider unmount
		return () =>
			// eslint-disable-next-line react-hooks/exhaustive-deps
			inertElements.current.forEach(el => el.removeAttribute('inert'))
	}, [])

	const value = useMemo(
		() => ({ register, unregister, updateOptions, getZ, isTopModal }),
		[register, unregister, updateOptions, getZ, isTopModal], // `version` not needed here, components subscribe via useState
	)

	return <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>
}

export const useOverlay = (
	id?: string,
	opts: {
		type?: OverlayType
		priority?: number
		parentId?: string
		isModalOverride?: boolean
		initialFocusRef?: React.RefObject<HTMLElement>
	} = {},
) => {
	const context = useContext(OverlayContext)
	if (!context) throw new Error('useOverlay must be used within an OverlayProvider')

	const autoId = useId()
	const uid = id ?? `${opts.type ?? 'overlay'}-${autoId}`

	const {
		type = OverlayType.Content,
		priority = TYPE_PRIORITIES[type],
		parentId,
		isModalOverride,
		initialFocusRef,
	} = opts

	// Use state to get updates from provider's forceUpdate via context re-render
	const [zIndex, setZIndex] = useState(() => context.getZ(uid))
	const [isLocked, setIsLocked] = useState(() => context.isTopModal(uid))

	useEffect(() => {
		setZIndex(context.getZ(uid))
		setIsLocked(context.isTopModal(uid))
	}, [context, uid]) // This effect subscribes to provider's version change indirectly

	useEffect(() => {
		const isModal = isModalOverride ?? MODAL_TYPES.has(type)
		context.register({
			id: uid,
			type,
			priority,
			parentId,
			isModal,
			initialFocusRef,
		})

		return () => context.unregister(uid)
	}, [context, uid, type, priority, parentId, isModalOverride, initialFocusRef]) // Re-register if these core props change

	// For options that can change after initial registration (like elementRef or dynamic modal state)
	const updateElementRef = useCallback(
		(elementRef: React.RefObject<HTMLElement>) => {
			context.updateOptions(uid, { elementRef })
		},
		[context, uid],
	)

	useEffect(() => {
		// Example: update priority or type if opts change
		const item = {
			priority: opts.priority ?? TYPE_PRIORITIES[opts.type ?? OverlayType.Content],
			type: opts.type,
			parentId: opts.parentId,
			isModal: opts.isModalOverride ?? MODAL_TYPES.has(opts.type ?? OverlayType.Content),
			initialFocusRef: opts.initialFocusRef,
		}
		context.updateOptions(uid, item)
	}, [
		context,
		uid,
		opts.priority,
		opts.type,
		opts.parentId,
		opts.isModalOverride,
		opts.initialFocusRef,
	])

	return { id: uid, zIndex, isTopMostModal: isLocked, updateElementRef }
}

interface PortalProps {
	children: React.ReactNode
	id?: string
	type?: OverlayType
	priority?: number
	parentId?: string
	container?: Element
	className?: string
	style?: React.CSSProperties
	isModalOverride?: boolean
	initialFocusRef?: React.RefObject<HTMLElement>
}

export const OverlayPortal: React.FC<PortalProps> = ({
	children,
	id,
	type = OverlayType.Content,
	priority,
	parentId,
	container,
	className,
	style,
	isModalOverride,
	initialFocusRef,
}) => {
	const portalRootRef = useRef<HTMLDivElement>(null)

	const {
		id: overlayId,
		zIndex,
		isTopMostModal,
		updateElementRef,
	} = useOverlay(id, {
		type,
		priority,
		parentId,
		isModalOverride,
		initialFocusRef: initialFocusRef as RefObject<HTMLElement>,
	})

	useEffect(() => {
		if (portalRootRef.current) updateElementRef(portalRootRef as RefObject<HTMLElement>)
	}, [updateElementRef, portalRootRef])

	useEffect(() => {
		const el = portalRootRef.current
		if (isTopMostModal && el) {
			const handleKeyDown = (e: KeyboardEvent) => {
				if (e.key === 'Tab') {
					const tabbables = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
						t => t.offsetParent !== null,
					)
					if (!tabbables.length) {
						e.preventDefault()

						return
					}
					const first = tabbables[0]
					const last = tabbables[tabbables.length - 1]
					if (first && last) {
						if (e.shiftKey && document.activeElement === first) {
							e.preventDefault()
							last.focus()
						} else if (!e.shiftKey && document.activeElement === last) {
							e.preventDefault()
							first.focus()
						}
					}
				}
			}
			el.addEventListener('keydown', handleKeyDown)

			return () => el.removeEventListener('keydown', handleKeyDown)
		}

		return undefined
	}, [isTopMostModal])

	const [target, setTarget] = useState<Element | null>(null)
	useEffect(() => setTarget(container ?? document.body), [container])

	if (!target) return null
	const isActuallyModal = isModalOverride ?? MODAL_TYPES.has(type)

	return createPortal(
		<div
			ref={portalRootRef}
			className={className}
			style={{ position: 'fixed', zIndex, ...style }} // Opinionated: 'fixed' for portals
			data-overlay-id={overlayId}
			{...(isActuallyModal && { 'aria-modal': 'true' })}
		>
			{children}
		</div>,
		target,
	)
}

export const NestedOverlay: React.FC<Omit<PortalProps, 'parentId'>> = props => {
	// For brevity, auto-parent detection is removed. ParentID must be explicit if needed.
	return <OverlayPortal {...props} />
}
