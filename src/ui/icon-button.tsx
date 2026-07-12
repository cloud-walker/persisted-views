import { clsx } from 'clsx'
import { Button } from './button'

export function IconButton({
	label,
	icon,
	...props
}: Omit<React.ComponentPropsWithRef<'button'>, 'children'> & {
	label: string
	icon: React.ReactElement
}) {
	return (
		<button
			type="button"
			{...props}
			aria-label={label}
			className={clsx(Button.baseClasses, 'p-1', props.className)}
		>
			{icon}
		</button>
	)
}
