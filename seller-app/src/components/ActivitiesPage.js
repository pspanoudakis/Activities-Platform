import ListItemActivity from "./ListItemActivity.js";
import { fetchActivitiesPageData } from '../api.js'
import { useState, useEffect } from "react"

export default function ActivitiesPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activities, setActivities] = useState([])
  
  useEffect(() => {
    fetchActivitiesPageData( (response) => {
      if(response.ok){
        setData(response.data)
        setActivities(response.data.activities)
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
          <label>Ταξινόμηση:</label>
          <select className='ml-1'>
            <option value="books">Κρατήσεις</option>
            <option value="date">Ημερομηνία</option>
            <option value="state">Κατάσταση</option>
          </select>
          {
            activities.map((activity, i) => <ListItemActivity key={i} data={activity} />)
          }
        </>
      }
    </div>
  );
}
