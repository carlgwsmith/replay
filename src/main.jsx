
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './Pages/Home'
import Root from './routes/root'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CreateEvent from './Pages/CreateEvent'
import Event from './Pages/Event';
import Calendar from './Pages/Calendar';
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
      {
        path:'/createEvent',
        element: <CreateEvent/>
      }
      ,
      {
        path:'/event/:id',
        element: <Event/>
      },
      {
        path:'/calendar',
        element: <Calendar/>
      }
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
