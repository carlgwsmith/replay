
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './Pages/Home'
import Root from './routes/root'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const routes = [
  {path:'/*',
element:<Home/>},
  {
    path:'',
    element: <Root/>,
    children:[
      {
        index:true,
        element: <Home/>
      },
      {path:'/*',
element:<Home/>},
      {
        path:'/home',
        element: <Home/>
      },
    ]
  },
]
const router = createBrowserRouter(routes,{
  basename:"/"
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} >
      </RouterProvider>
)
