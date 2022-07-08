import ListItemBooking from "./ListItemBooking.js";
import { useState, useEffect } from "react";
import {fetchRecentBookings, fetchTotalActivities, fetchTotalFacilities} from "../api/homePageAPI";

export default function HomePage() {
  const [totalActivities, setTotalActivities] = useState(null)
  const [totalFacilities, setTotalFacilities] = useState(null)
  const [loading, setLoading] = useState(true)
  const [bookingData, setBookingData] = useState([])

  function getFacilitiesTotal(){
    fetchTotalFacilities((response) => {
      if(response.ok){
        setTotalFacilities(response.data.total_facilities)
      } else {
        alert('Αποτυχία κατα την εκτέλεση');
      }
    })

  }

  function getActivitiesTotal(){
    fetchTotalActivities((response) => {
      if(response.ok){
        setTotalActivities(response.data.total_activities)
      } else {
        alert('Αποτυχία κατα την εκτέλεση');
      }
    });
  }

  function getRecentBookings(){
    fetchRecentBookings((response) => {
      if(response.ok){
        setBookingData(response.data)
      } else {
        alert('Αποτυχία κατα την εκτέλεση');
      }
    });

  }

  useEffect(() => {
    getActivitiesTotal();
    getFacilitiesTotal();
    getRecentBookings();
    setLoading(false);

  }, [])

  return (
    <div className='font-light'>
      {
        loading ?
        <span>Φορτώνει...</span>
        :
        <>
          <div className='flex justify-between text-center text-2xl '>
            <span className='bg-white w-5/12 px-2 py-6 rounded-3xl shadow'>
              <div className=''>Συνολικές Δραστηριότητες</div>
              <div className=''>{totalActivities}</div>
            </span>
            <span className='bg-white w-5/12 px-2 py-6 rounded-3xl shadow'>
              <div className=''>Συνολικές Υποδομές</div>
              <div className='text-center'>{totalFacilities}</div>
            </span>
          </div>
          <div className='bg-white px-10 h-80 mt-10 mx-auto rounded-3xl overflow-hidden shadow'>
            <div className='text-2xl text-center'>Τελευταίες Κρατήσεις</div>
            <div className='mt-4 ml-6 flex justify-between font-normal'>
              <div className=''>Όνομα <br/> Δραστηριότητας</div>
              <div className='ml-4'>Ημ/νια <br/> Κράτησης</div>
              <div className='ml-4'>Ημ/νια <br/> Διεξαγωγής</div>
              <div className='ml-4'>Αριθμός <br/> Θέσεων</div>
              <div className='ml-4'>Όνομα <br/> Χρήστη</div>
              <div className='ml-4'>Αριθμός <br/> Πόντων</div>
            </div>
            <div className='h-52 mt-2'>
              {
                bookingData.map((booking, i) => <ListItemBooking key={i} data={booking} />)
              }
            </div>
          </div>
        </>
      }
    </div>
  );
}
