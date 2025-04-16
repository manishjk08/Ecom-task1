import { useEffect, useState } from 'react'

const Allproducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
        setError(null)
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load products. Please try agains.')
      } finally {
        setLoading(false)
      }
    };
    fetchData();
  }, []);

  

  if (loading) {
    return (
      <h1 className='text-center text-3xl'>loading....</h1>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500 mb-4">{error}</p>
      </div>
    )
  }

  return (
   <div className='px-10 py-8'>
    <h1 className='text-center text-2xl mb-3'>Our Products</h1>
    
      <ul className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {products.map(product=>(
            <li key={product.id }className='border rounded-lg p-4 '>
              <div className='flex flex-col h-full'>
              <div className='w-full h-48 flex items-center justify-center overflow-hidden mb-4'> 
                <img src={product.image} alt={product.title} className='w-full h-full object-contain'/>
              </div>
             <div>
              <h1>{product.title}</h1>
               <p>Rs:{product.price}</p>
               <button className='cursor-pointer px-6 py-2 mt-2 bg-green-700 hover:bg-green-600 transition text-white rounded-full text-sm'>Add to cart</button>
             </div>
             </div>
            </li>
        ))}
      </ul>
    </div>
   
  )
}

export default Allproducts
