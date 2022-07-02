import ListItemDate from "./ListItemDate.js";
import GoBackButton from "./GoBackButton.js";
import AllReviews from "./AllReviews.js";
import { useState, useEffect } from "react"
import { fetchActivityPageData } from '../api.js'
import { Modal } from '../shared/Modal.js';

export default function ActivityPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [dateData, setDateData] = useState([])
  const [showReviews, setShowReviews] = useState(false)

  useEffect(() => {
    fetchActivityPageData(1, (response) => {
      if(response.ok){
        setData(response.data)
        setDateData(response.data.dates)
      }
      else{
        console.log('failed to fetch data');
      }
      setLoading(false)
    })
  }, [])

  return (
    <div className=''>
      {
        loading ? 
        <span>Φορτώνει...</span>
        :
        <>
          <GoBackButton/>
          <div className='text-3xl mt-10 text-center'>{data.title}</div>
          <img className='w-full h-64 rounded-3xl mx-auto mt-10 shadow' src={data.imgUrl} alt=''/>
          <div className='flex mt-10 justify-between font-normal'>
            <div>
              <div className='flex'>
                <div className=''>Κατηγορία:</div>
                <div className='font-light ml-1'>{data.category}</div>
              </div>
              <div className='flex'>
                <div className=''>Ηλικιακή Κατηγορία:</div>
                <div className='font-light ml-1'>{data.age}</div>
              </div>
              <div className='flex'>
                <div className=''>Αριθμός Κρατήσεων:</div>
                <div className='font-light ml-1'>{data.bookCount}</div>
              </div>
            </div>
            <div>
              <div className='flex'>
                <div className=''>Τιμή:</div>
                <div className='font-light ml-1'>{data.price}</div>
              </div>
              <div className='flex'>
                <div className=''>Ποσοστό Ακυρώσεων:</div>
                <div className='font-light ml-1'>{data.cancelRate}</div>
              </div>
              <div className='flex'>
                <div className=''>Διαθέσιμες Θέσεις:</div>
                <div className='font-light ml-1'>{data.seats}</div>
              </div>
            </div>
            <div>
             <div className='flex'>
                <div className=''>Υποδομή:</div>
                <div className='font-light ml-1'>{data.facility}</div>
              </div>
              <div className='flex'>
                <div className=''>Αριθμός Ακυρώσεων:</div>
                <div className='font-light ml-1'>{data.cancelCount}</div>
              </div>
              <div className='flex'>
                <div className=''>Μέση Αξιολόγηση:</div>
                <div className='font-light ml-1'>{data.avgScore}</div>
              </div>
            </div>
          </div>
          <div className='mt-10'>
            <div className='font-normal'>Περιγραφή:</div>
            <div className='bg-white w-full h-32 px-4 py-2 mt-2 shadow rounded-xl font-light'>
              {data.description}
            </div>
          </div>
          <div className='flex justify-center mt-10 text-lg'>
            <div className='font-normal'>Σύνολο Κερδών:</div>
            <div className='ml-1 font-light'>{data.earnings}</div>
          </div>
          <button onClick={() => setShowReviews(true)} className='bg-cyan hover:bg-hover rounded-full w-full mt-10 font-light text-2xl shadow'>Εμφάνιση Κριτικών</button>
          <div className='flex justify-center mt-10 text-lg'>
            <div className='font-normal'>Συχνότητα Διεξαγωγής:</div>
            <div className='ml-1 font-light'>{data.occurence}</div>
          </div>
          <div className='mt-10 text-lg text-center font-normal'>Ημερομηνίες Διεξαγωγής:</div>
          <div className='bg-white w-full h-52 p-2 mt-2 font-light rounded-xl overflow-hidden shadow'>
            <div className='flex px-16 justify-between font-normal'>
              <div className=''>Ημερομηνία</div>
              <div className=''>Ώρα</div>
            </div>
            <div className='h-52 mt-2 overflow-y-scroll'>
              {
                dateData.map((date, i) => <ListItemDate key={i} data={date} />)
              }
            </div>
          </div>
          <div className='mt-20 text-center text-2xl'>
            <button className='bg-cyan hover:bg-hover rounded-full w-full font-light shadow'>Επεξεργασία Δραστηριότητας</button>
            <button className='bg-white hover:bg-red-400 hover:text-white w-full border-2 border-red-400 my-4 rounded-full font-light shadow'>Ακύρωση Δραστηριότητας</button>
          </div>
          <Modal show={showReviews} children={<AllReviews data={data.reviews} />} color='bg-background' closeCallback={() => setShowReviews(false)} />
        </>
      }
    </div>
  );
}
