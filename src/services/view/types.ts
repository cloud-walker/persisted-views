export interface View {
	id: string
	name: string
	isDefault: boolean
	version: number
	scope: string
	definition: Record<string, unknown>
}

export interface CreateViewInput {
	name: string
	scope: string
	isDefault?: boolean
	version?: number
	definition?: Record<string, unknown>
}

export type UpdateViewInput = Partial<
	Pick<View, 'name' | 'scope' | 'isDefault' | 'version' | 'definition'>
>
