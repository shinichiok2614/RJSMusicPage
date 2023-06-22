import { useState } from 'react'
import './App.css'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import browserRouters from './router/router'

function App() {
  const [count, setCount] = useState(0)
  const router=createBrowserRouter(browserRouters)
  return (
    <RouterProvider  router={router}></RouterProvider>
  )
}

export default App
