import ListItemFacility from "./ListItemFacility";
import { fetchFacilitiesPageData } from '../api.js'
import { useState, useEffect } from "react"
import FacilityPage from './FacilityPage.js';
import { Modal } from '../shared/Modal.js';

export default function FacilitiesPage() {
  const [loading, setLoading] = useState(true)
  const [facilities, setFacilities] = useState([])
  const [showFacility, setShowFacility] = useState(false)
  const [facilityData, setFacilityData] = useState(null)
  
  useEffect(() => {
    fetchFacilitiesPageData( (response) => {
      if(response.ok){
        setFacilities(response.data.facilities)
      }
      else{
        console.log('failed to fetch data');
      }
      setLoading(false)
    })
  }, [])

  function facilityClicked(data){
    setFacilityData(data)
    setShowFacility(true)
  }

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
            facilities.map((activity, i) => <ListItemFacility key={i} clicked={() => facilityClicked(activity)} data={activity} />)
          }
          <Modal show={showFacility} children={<FacilityPage data={facilityData} cancel={() => setShowFacility(false)}/>} color='bg-background' closeCallback={() => setShowFacility(false)}/>
        </>
      }
    </div>
  );
}
