import { queryOptions } from '@tanstack/react-query'
import { getView, getViews } from './client'

export const viewKeys = {
	all: ['views'] as const,
	lists: () => [...viewKeys.all, 'list'] as const,
	list: (scope?: string) => [...viewKeys.lists(), scope] as const,
	details: () => [...viewKeys.all, 'detail'] as const,
	detail: (id: string) => [...viewKeys.details(), id] as const,
}

export const viewsQueryOptions = (scope?: string) =>
	queryOptions({
		queryKey: viewKeys.list(scope),
		queryFn: () => getViews(scope),
	})

export const viewQueryOptions = (id: string) =>
	queryOptions({
		queryKey: viewKeys.detail(id),
		queryFn: () => getView(id),
	})
