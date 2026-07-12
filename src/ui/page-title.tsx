import { clsx } from 'clsx'

export function PageTitle(props: React.ComponentPropsWithRef<'h1'>) {
	return (
		<h1 {...props} className={clsx('text-4xl font-bold', props.className)} />
	)
}
