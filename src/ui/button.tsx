import { clsx } from 'clsx'

export const Button = Object.assign(
	function ButtonImpl(props: React.ComponentPropsWithRef<'button'>) {
		return (
			<button
				type="button"
				{...props}
				className={clsx(Button.baseClasses, 'px-3 py-1.5', props.className)}
			/>
		)
	},
	{
		baseClasses: clsx(
			'rounded text-sm',
			'hover:bg-neutral-100 dark:hover:bg-neutral-800',
		),
	},
)
