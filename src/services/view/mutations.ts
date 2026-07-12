import { mutationOptions, type QueryClient } from '@tanstack/react-query'
import { createView, deleteView, updateView } from './client'
import { viewKeys } from './queries'
import type { CreateViewInput, UpdateViewInput } from './types'

export const createViewMutationOptions = (queryClient: QueryClient) =>
	mutationOptions({
		mutationFn: (input: CreateViewInput) => createView(input),
		onSuccess: (view) => {
			queryClient.setQueryData(viewKeys.detail(view.id), view)
			return queryClient.invalidateQueries({ queryKey: viewKeys.lists() })
		},
	})

export const updateViewMutationOptions = (queryClient: QueryClient) =>
	mutationOptions({
		mutationFn: ({ id, input }: { id: string; input: UpdateViewInput }) =>
			updateView(id, input),
		onSuccess: (view) => {
			queryClient.setQueryData(viewKeys.detail(view.id), view)
			return queryClient.invalidateQueries({ queryKey: viewKeys.lists() })
		},
	})

export const deleteViewMutationOptions = (queryClient: QueryClient) =>
	mutationOptions({
		mutationFn: (id: string) => deleteView(id),
		onSuccess: (_data, id) => {
			queryClient.removeQueries({ queryKey: viewKeys.detail(id) })
			return queryClient.invalidateQueries({ queryKey: viewKeys.lists() })
		},
	})
