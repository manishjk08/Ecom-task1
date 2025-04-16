import NavBar from "./components/Navbar"
import Home from "./components/Home"
import Allproducts from "./components/Allproducts"
import Contact from "./components/Contact"
import { AuthProvider } from "./Context/AuthContext"
import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from 'react-router-dom'
import Login from "./components/Login"

function App() {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path='/' element={<NavBar/>}>
            <Route index element={<Home/>}/>
            <Route path='products' element={<Allproducts/>}/>
            <Route path='contact' element={<Contact/>}/>
            <Route path='login' element={<Login/>}/>
        </Route>
      )
    );
          
    return(
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    )
}

export default App
