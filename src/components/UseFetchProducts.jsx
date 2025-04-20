import { useState,useEffect } from "react";

 const useFetchProducts=(url)=>{
    const [data,setData]=useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true)
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error('Failed to fetch products')
            }
            const result = await response.json();
            setData(result);
            setError(null)
          } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to load products. Please try again later.')
          } finally {
            setLoading(false)
          }
        };
        fetchData();
      }, [url]);

      return{data,loading,error}
}
export default useFetchProducts

