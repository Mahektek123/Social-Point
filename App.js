import './App.css';
import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Login from './Component/Login'
import Regi from './Component/Regi'
import Home from './Component/Home';
import Profile from './Component/Profile';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element:<Home/>
    },
    {
      path: "/Login",
      element:<Login/>
    },
    {
      path: "/Registration",
      element:<Regi/>
    },
    {
      path: "/Profile",
      element:<Profile/>
    }
  ])

  return (
    <>
      {/* <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Home />}/>
              <Route path='/Login' element={<Login />} />
              <Route path='/Registration' element={<Regi />} />
              <Route path='/Profile' element={<Profile />} />
          </Routes>
      </BrowserRouter> */}
      <RouterProvider router={router}/>
    </>
  )
}

export default App;
