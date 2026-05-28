import ReactDOM from 'react-dom/client';
import { createBrowserRouter,RouterProvider } from "react-router";


import AppLayout from './applayout';
import Home from './home';
import SignUp from './signup';
import Oversized from './oversizeditems';
import Regular from './regularitems';
import Shirts from './shirtsitem';
import Shorts from './shortsitem';
import Denims from './denimitem';
import Joggers from './joggersitem';
import Cart from './cart';
import Settings from './settings';
import Payment from './payment';
import Address from './address';
import './clothingFE.css'




const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<AppLayout/>,
    children:[
      {
        path:"/",element:<SignUp/>
      },
      {
        path:"/home",element:<Home/>
      },
      {
        path:"/oversized",element:<Oversized/>
      },
      {
        path:"/regular",element:<Regular/>
      },
      {
        path:"/shirts",element:<Shirts/>
      },
      {
        path:"/shorts",element:<Shorts/>
      },
      {
        path:"/denims",element:<Denims/>
      },
      {
        path:"/joggers",element:<Joggers/>
      },
      {
        path:"/cart",element:<Cart/>
      },
      {
        path:"/settings",element:<Settings/>
      },
      {
        path:"/address",element:<Address/>
      },
      {
        path:"/payment",element:<Payment/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter}/>);
