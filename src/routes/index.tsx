import { createFileRoute } from '@tanstack/react-router'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { getViews } from '#/services/view'

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
		<div className="p-8">
			<h1 className="text-4xl font-bold">Welcome to TanStack Start</h1>
			<p className="mt-4 text-lg">
				Edit <code>src/routes/index.tsx</code> to get started.
			</p>
			<input
				type="text"
				value={state.name}
				onChange={(e) => {
					setState({ name: e.target.value })
				}}
			/>
		</div>
	)
}
