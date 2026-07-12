import { type ClassValue, clsx } from 'clsx'

export function vstack(...rest: readonly ClassValue[]) {
	return clsx('flex flex-col', ...rest)
}

export function hstack(...rest: readonly ClassValue[]) {
	return clsx('flex items-center', ...rest)
}

export function wrap(...rest: readonly ClassValue[]) {
	return clsx('flex flex-wrap', ...rest)
}
