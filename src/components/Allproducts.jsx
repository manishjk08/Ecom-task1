import { useEffect, useMemo, useState } from 'react'
import { useCart } from '../Context/CartContext'
import { useSearch } from '../Context/SearchContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import useFetchProducts from './UseFetchProducts';


const Allproducts = () => {
  const {data: products=[], loading,error}= useFetchProducts('https://fakestoreapi.com/products')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const { search } = useSearch()

  const navigate = useNavigate()
  const handleProduct = (id) => {
    navigate(`/product/${id}`)
    
  }
   const { addtocart } = useCart()
  const filteredProducts = useMemo(()=>{
    return products.filter(product => 
    product.title.toLowerCase().includes(search.toLowerCase()) 
  );
  },[products,search]) 

  const currentItems = useMemo(()=>{
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; 
  return filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  },[filteredProducts,currentPage,itemsPerPage])

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage); 

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className='px-10 py-8'>
      <h1 className='text-center text-2xl mb-3'>Our Products</h1>
      

      <ul className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {currentItems.map(product => (
          <li key={product.id} className=' bg-white border border-gray-500/20 rounded-lg p-4 hover:shadow-md transition-shadow'>
            <div className='flex flex-col h-full'>
              <div className='w-full h-48 flex items-center justify-center overflow-hidden mb-4'>
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className='w-full h-full object-contain cursor-pointer mix-blend-multiply' 
                  onClick={() => handleProduct(product.id)} 
                />
                
              </div>
              <div>
                <p>{product.category}</p>
                <h2 className="text-lg font-medium mb-1 line-clamp-1">{product.title}</h2>
                <p className="text-indigo-600 font-semibold mb-2">Rs: {product.price.toFixed(2)}</p>
                <button 
                  className=' cursor-pointer flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 md:w-[80px] w-[64px] h-[34px] rounded text-indigo-600 font-medium'
                  onClick={() => {
                    addtocart(product); 
                    toast.success(`${product.title}added to cart`,{
                      position:'top-right',
                      autoClose:2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                    }

                  )}}
                >
                  Add
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {filteredProducts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No products found matching your search.</p>
        </div>
      )}

      {filteredProducts.length > 0 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            Previous
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === index + 1
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default Allproducts
