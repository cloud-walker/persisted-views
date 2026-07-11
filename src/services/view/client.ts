import * as store from './store'
import type { CreateViewInput, UpdateViewInput, View } from './types'

function randomDelay(minMs = 200, maxMs = 600): Promise<void> {
	const ms = minMs + Math.random() * (maxMs - minMs)
	return new Promise((resolve) => setTimeout(resolve, ms))
}

function clone<T>(value: T): T {
	return structuredClone(value)
}

export async function getViews(scope?: string): Promise<Array<View>> {
	await randomDelay()
	return clone(store.listViews(scope))
}

export async function getView(id: string): Promise<View> {
	await randomDelay()
	return clone(store.findView(id))
}

export async function createView(input: CreateViewInput): Promise<View> {
	await randomDelay()
	return clone(store.insertView(clone(input)))
}

export async function updateView(
	id: string,
	input: UpdateViewInput,
): Promise<View> {
	await randomDelay()
	return clone(store.applyUpdate(id, clone(input)))
}

export async function deleteView(id: string): Promise<void> {
	await randomDelay()
	store.removeView(id)
}
