
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
import EditEvent from './Pages/EditEvent';
import EventList from './Pages/EventList';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import SpecialsList from './Pages/SpecialsList';
import EditSpecial from './Specials/EditSpecial';
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
        path:'/event/edit/:id',
        element: <EditEvent/>
      },
      {
        path:'/eventlist',
        element: <EventList/>
      },
      {
        path:'/calendar',
        element: <Calendar/>
      },
      {
        path:'/about',
        element: <About/>
      },
      {
        path:'/contact',
        element: <Contact/>
      }
      ,
      {
        path:'/login',
        element: <Login/>
      },
      {
        path:'/specialslist',
        element: <SpecialsList/>
      },
      {
        path:'/special/edit/:id',
        element: <EditSpecial/>
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
