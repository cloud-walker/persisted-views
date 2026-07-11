export class ViewApiError extends Error {
	status: number

	constructor(status: number, message: string) {
		super(message)
		this.name = 'ViewApiError'
		this.status = status
	}
}
