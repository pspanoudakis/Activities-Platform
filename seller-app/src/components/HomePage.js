import ListItemBooking from "./ListItemBooking.js";
import ListItemReview from "./ListItemReview.js";
import { useState, useEffect } from "react";
import { fetchHomePageData } from '../api.js'

export default function HomePage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [bookingData, setBookingData] = useState([])
  const [reviewData, setReviewData] = useState([])
  
  useEffect(() => {
    fetchHomePageData( (response) => {
      if(response.ok){
        setData(response.data)
        setBookingData(response.data.bookings)
        setReviewData(response.data.reviews)
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
          <div className='flex justify-between text-center text-2xl '>
            <span className='bg-white w-5/12 px-2 py-6 rounded-3xl shadow'>
              <div className=''>Συνολικές Δραστηριότητες</div>
              <div className=''>{data.totalActivities}</div>
            </span>
            <span className='bg-white w-5/12 px-2 py-6 rounded-3xl shadow'>
              <div className=''>Συνολικές Υποδομές</div>
              <div className='text-center'>{data.totalFacilities}</div>
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
            <div className='h-52 mt-2 overflow-y-scroll'>
              {
                bookingData.map((booking, i) => <ListItemBooking key={i} data={booking} />)
              }
            </div>
          </div>
          <div className=''>
            <div class='mt-16 mb-6 text-2xl text-center'>Πρόσφατες Κριτικές</div>
              {
                reviewData.map((review, i) => <ListItemReview key={i} data={review} />)
              }
          </div>
        </>
      }
    </div>
  );
}
