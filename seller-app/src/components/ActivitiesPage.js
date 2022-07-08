import ListItemActivity from "./ListItemActivity.js";
import { fetchActivities } from '../api/activitiesAPI.js'
import { useState, useEffect } from "react"

export default function ActivitiesPage() {
  const [loading, setLoading] = useState(true)
  const [activities, setActivities] = useState([])


  function getActivities() {
    fetchActivities( (response) => {
      if(response.ok){
        setActivities(response.data)
      }
      else{
        alert('Αποτυχία κατα την εκτέλεση');
      }
      setLoading(false)
    })
  }

  useEffect(() => {
    getActivities()
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
