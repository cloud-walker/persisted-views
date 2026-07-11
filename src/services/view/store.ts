import { faker } from '@faker-js/faker'
import { ViewApiError } from './errors'
import type { CreateViewInput, UpdateViewInput, View } from './types'

const views: Array<View> = []

function unsetDefaultInScope(scope: string, exceptId?: string): void {
	for (const view of views) {
		if (view.scope === scope && view.id !== exceptId) {
			view.isDefault = false
		}
	}
}

export function listViews(scope?: string): Array<View> {
	return scope ? views.filter((view) => view.scope === scope) : views
}

export function findView(id: string): View {
	const view = views.find((v) => v.id === id)
	if (!view) throw new ViewApiError(404, `View ${id} not found`)
	return view
}

export function insertView(input: CreateViewInput): View {
	if (!input.name?.trim()) throw new ViewApiError(400, 'name is required')
	if (!input.scope?.trim()) throw new ViewApiError(400, 'scope is required')

	const view: View = {
		id: faker.string.uuid(),
		name: input.name,
		scope: input.scope,
		isDefault: input.isDefault ?? false,
		version: input.version ?? 1,
		definition: input.definition ?? {},
	}

	if (view.isDefault) unsetDefaultInScope(view.scope)

	views.push(view)
	return view
}

export function applyUpdate(id: string, input: UpdateViewInput): View {
	const view = findView(id)
	Object.assign(view, input)

	if (view.isDefault) unsetDefaultInScope(view.scope, view.id)

	return view
}

export function removeView(id: string): void {
	const index = views.findIndex((v) => v.id === id)
	if (index === -1) throw new ViewApiError(404, `View ${id} not found`)
	views.splice(index, 1)
}
