import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import User from "../features/user";
import Address from "../features/address";
import ImageWedding from "../features/imageWedding";

const router =  createBrowserRouter([
  {
    path: "/admin/",
    element: <App />,
    children: [
      {
        path: "user",
        element: <User />
      },
      {
        path: "address",
        element: <Address />
      },
      {
        path: "images",
        element: <ImageWedding />
      }
    ]
  }
])

export { router }