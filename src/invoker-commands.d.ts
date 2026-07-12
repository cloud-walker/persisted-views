// Invoker Commands API: non ancora tipizzata in lib.dom.d.ts / @types/react.
// https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API
// Rimuovere questo file quando TypeScript/@types/react la supporteranno nativamente.

interface CommandEvent extends Event {
	readonly command: string
	readonly source: Element | null
}

declare global {
	interface HTMLButtonElement {
		command: string
		commandForElement: Element | null
	}

	interface GlobalEventHandlersEventMap {
		command: CommandEvent
	}
}

declare module 'react' {
	interface ButtonHTMLAttributes<T> {
		command?: string
		commandfor?: string
	}
}

export {}
