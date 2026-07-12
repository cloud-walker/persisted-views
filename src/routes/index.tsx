import { createFileRoute } from '@tanstack/react-router'
import { clsx } from 'clsx'
import { PlusIcon } from 'lucide-react'
import z from 'zod'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { createView, getViews } from '#/services/view'
import { Button } from '#/ui/button'
import { IconButton } from '#/ui/icon-button'
import { hstack, vstack } from '#/ui/layout'
import { PageTitle } from '#/ui/page-title'
import { TextInput } from '#/ui/text-input'

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
		<div className={vstack('gap-8', 'p-8')}>
			<header className={hstack('gap-2')}>
				<PageTitle>Home</PageTitle>
				<IconButton
					icon={<PlusIcon />}
					label="Save current view"
					command="show-modal"
					commandfor="create-view"
					className={clsx('ms-auto')}
				/>
				<dialog
					id="create-view"
					className={clsx(
						'm-auto w-full max-w-sm rounded-lg p-6 shadow-xl',
						'bg-white dark:bg-neutral-900',
						'backdrop:bg-black/50',
						'opacity-0 open:opacity-100',
						'transition-discrete transition-opacity duration-200',
						'starting:open:opacity-0',
					)}
				>
					<form
						className={vstack('gap-6')}
						action={async (formData) => {
							await createView({
								name: z.string().trim().min(1).parse(formData.get('name')),
								scope: 'home',
								definition: state,
							})
						}}
					>
						<TextInput
							name="name"
							data-1p-ignore
							placeholder="Name of the view"
						/>
						<div className={hstack('gap-2', 'self-end')}>
							<Button commandfor="create-view" command="close">
								Cancel
							</Button>
							<Button type="submit">Save</Button>
						</div>
					</form>
				</dialog>
			</header>
			<TextInput
				value={state.name}
				onChange={(e) => {
					setState({ name: e.target.value })
				}}
			/>
		</div>
	)
}
