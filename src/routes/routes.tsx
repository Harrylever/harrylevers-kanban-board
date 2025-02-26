import { createBrowserRouter } from "react-router-dom"
import IndexPage from "../views"
import RootLayout from "./root-layout"

const routes = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <IndexPage />,
        children: [],
      },
    ],
  },
])

export default routes
