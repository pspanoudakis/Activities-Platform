import ListItemPopular from "./ListItemPopular";
import { fetchStatisticsPageData } from '../api.js'
import { useState, useEffect } from "react"

export default function StatisticsPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [popular, setPopular] = useState([])
  
  useEffect(() => {
    fetchStatisticsPageData( (response) => {
      if(response.ok){
        setData(response.data)
        setPopular(response.data.popular)
      }
      else{
        console.log('failed to fetch data');
      }
      setLoading(false)
    })
  }, [])

  return (
    <div className='font-light'>
      {
        loading ? 
        <span>Φορτώνει...</span>
        :
        <>
          <div className='text-3xl text-center'>Κρατήσεις</div>
          <div className='bg-white rounded-3xl w-full h-60 mt-2 shadow-lg'>
          </div>
            <div className='text-3xl text-center mt-10'>Ακυρώσεις</div>
            <div className='bg-white rounded-3xl w-full h-60 mt-2 shadow-lg'>
          </div>
          <div className='text-3xl text-center mt-10'>Δημοφιλείς Δραστηριότητες</div>
          <div className='bg-white rounded-3xl w-full p-6 mt-2 shadow-lg'>
          {
            popular.map((item, i) => <ListItemPopular key={i} data={item} />)
          }
          </div>
        </>
      }
    </div>
  );
}
