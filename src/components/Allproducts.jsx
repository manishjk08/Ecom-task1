import { useCallback, useEffect, useMemo, useState } from 'react'
import { useCart } from '../Context/CartContext'
import { useSearch } from '../Context/SearchContext'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import useFetchProducts from './UseFetchProducts'

const Allproducts = () => {
  const { category } = useParams()
  const navigate = useNavigate()
  const { search } = useSearch()
  const { addtocart } = useCart()

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const [selected, setSelected] = useState(category || '')

  const { data: products = [], loading, error } = useFetchProducts(
    category
      ? `https://fakestoreapi.com/products/category/${category}`
      : 'https://fakestoreapi.com/products'
  )

  const { data: categories = [], loading: categoriesLoading } = useFetchProducts(
    'https://fakestoreapi.com/products/categories'
  )

  useEffect(() => {
    setSelected(category || '')
    setCurrentPage(1)
  }, [category, search])

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )
  }, [products, search])

  const currentItems = useMemo(() => {
    const last = currentPage * itemsPerPage
    const first = last - itemsPerPage
    return filteredProducts.slice(first, last)
  }, [filteredProducts, currentPage])

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  const handleDropdown = useCallback((e) => {
    const selectedCategory = e.target.value
    setSelected(selectedCategory)
    if (selectedCategory) {
      navigate(`/categories/${selectedCategory}`)
    } else {
      navigate('/products')
    }
  }, [navigate])

  const handlePageChange = (page) => setCurrentPage(page)

  const handleAddToCart = (product) => {
    addtocart(product)
    toast.success(`${product.title} added to cart`, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
    })
  }

  const handleProductClick = (id) => {
    navigate(`/products/${id}`)
  }

  if (loading || categoriesLoading) {
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
      <h1 className='text-center text-2xl mb-3 capitalize'>
        {category ? `${category} Products` : 'All Products'}
      </h1>

      <div className="my-2">
        <select
          name="categories"
          id="categories"
          className="max-w-sm px-3 py-2 border border-gray-300 rounded-md text-indigo-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={selected}
          onChange={handleDropdown}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <ul className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {currentItems.map(product => (
          <li key={product.id} className='bg-white border border-gray-500/20 rounded-lg p-4 hover:shadow-md transition-shadow'>
            <div className='flex flex-col h-full'>
              <div className='w-full h-48 flex items-center justify-center overflow-hidden mb-4'>
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className='w-full h-full object-contain cursor-pointer mix-blend-multiply' 
                  onClick={() => handleProductClick(product.id)}
                />
              </div>
              <div>
                <p className="text-gray-600">{product.category}</p>
                <h2 className="text-lg font-medium mb-1 line-clamp-1">{product.title}</h2>
                <p className="text-indigo-600 font-semibold mb-2">Rs: {product.price.toFixed(2)}</p>
                <button 
                  className='cursor-pointer flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 md:w-[80px] w-[64px] h-[34px] rounded text-indigo-600 font-medium'
                  onClick={() => handleAddToCart(product)}
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

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === i + 1
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {i + 1}
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
