import { clsx } from 'clsx'

export function TextInput(props: React.ComponentPropsWithRef<'input'>) {
	return (
		<input
			type="text"
			{...props}
			className={clsx('border rounded', 'px-3 py-2', props.className)}
		/>
	)
}
