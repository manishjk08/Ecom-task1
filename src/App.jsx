import NavBar from "./components/Navbar"
import Home from "./components/Home"
import Allproducts from "./components/Allproducts"
import Contact from "./components/Contact"
import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from 'react-router-dom'
import Login from "./components/Login"
import Cart from './components/Cart'
import Product  from "./components/product"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path='/' element={
              <>
                  <NavBar/>
                  <ToastContainer/>
              </>
          
        }>
            <Route index element={<Home/>}/>
            <Route path='products' element={<Allproducts/>}/>
            <Route path='categories/:category' element={<Allproducts/>}/>
            <Route path='contact' element={<Contact/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path ="cart" element={<Cart/>}/>
            <Route path="/products/:id" element={<Product/>}/>
        </Route>
      )
    );
          
    return <RouterProvider router={router} />
}

export default App