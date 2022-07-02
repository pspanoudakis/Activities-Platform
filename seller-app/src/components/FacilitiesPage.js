import ListItemFacility from "./ListItemFacility";
import { fetchFacilitiesPageData } from '../api.js'
import { useState, useEffect } from "react"

export default function FacilitiesPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [facilities, setFacilities] = useState([])
  
  useEffect(() => {
    fetchFacilitiesPageData( (response) => {
      if(response.ok){
        setData(response.data)
        setFacilities(response.data.facilities)
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
          <label for="cars">Ταξινόμηση:</label>
          <select className='ml-1' name="sortby" id="activities">
            <option value="activities">Δραστηριότητες</option>
            <option value="location">Περιοχή</option>
          </select>
          {
            facilities.map((activity, i) => <ListItemFacility key={i} data={activity} />)
          }
        </>
      }
    </div>
  );
}
