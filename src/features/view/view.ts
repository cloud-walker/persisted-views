import { create } from 'zustand'

export function defineViewStore() {
	const useViewStore = create(() => ({}))
	return useViewStore
}
