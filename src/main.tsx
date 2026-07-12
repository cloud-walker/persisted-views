import { RouterProvider } from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'
import { raise } from './helpers/raise'
import { createRouter } from './router'

const router = createRouter()

const rootElement =
	document.getElementById('app') ?? raise('#app element not found')

const root = ReactDOM.createRoot(rootElement)
root.render(<RouterProvider router={router} />)
