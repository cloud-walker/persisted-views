import { createFileRoute } from '@tanstack/react-router'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { getViews } from '#/services/view'
import {clsx } from 'clsx'

type HomeViewState = { name: string }
const useViewStore = create(
	persist<{ state: HomeViewState; setState: (state: HomeViewState) => void }>(
		(set) => ({
			state: {
				name: '',
			},
			setState: (state: { name: string }) => set({ state }),
		}),
		{
			name: 'home',
			storage: createJSONStorage(() => sessionStorage),
		},
	),
)

export const Route = createFileRoute('/')({
	loader: () => {
		return getViews()
	},
	component: Home,
})

function Home() {
	const state = useViewStore((s) => s.state)
	const setState = useViewStore((s) => s.setState)
	return (
		<div className={clsx('flex flex-col gap-8', "p-8")}>
			<h1 className="text-4xl font-bold">Home</h1>
			<input
				type="text"
        value={state.name}
        className={clsx('border rounded', 'px-3 py-2')}
				onChange={(e) => {
					setState({ name: e.target.value })
				}}
			/>
		</div>
	)
}
