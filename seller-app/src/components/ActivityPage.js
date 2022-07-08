import ListItemDate from "./ListItemDate.js";
import GoBackButton from "./GoBackButton.js";
import AllReviews from "./AllReviews.js";
import { useState, useEffect } from "react"
import { Modal } from '../shared/Modal.js';
import {useSearchParams} from "react-router-dom";
import {fetchActivityInfo} from "../api/activitiesAPI";

export default function ActivityPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showReviews, setShowReviews] = useState(false)
  const [searchParams,setSearchParams] = useSearchParams();
  let id = searchParams.get("id");

  useEffect(() => {
    fetchActivityInfo(id,(response)=>{
      if(response.ok){
        setData(response.data)
        setLoading(false);
      } else {
        alert('Αποτυχία κατα την εκτέλεση');
      }
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
          <div className='text-3xl mt-10 text-center'>{data.name}</div>
          <img className='w-full h-64 rounded-3xl mx-auto mt-10 shadow' src={data.images[0]} alt=''/>
          <div className='flex mt-10 justify-between font-normal'>
            <div>
              <div className='flex'>
                <div className=''>Κατηγορία:</div>
                <div className='font-light ml-1'>{data.category_name}</div>
              </div>
              <div className='flex'>
                <div className=''>Ηλικιακή Κατηγορία:</div>
                <div className='font-light ml-1'>{data.age_category_name}</div>
              </div>
            </div>
            <div>
              <div className='flex'>
                <div className=''>Τιμή:</div>
                <div className='font-light ml-1'>{data.cost}</div>
              </div>
              <div className='flex'>
                <div className=''>Αριθμός Κρατήσεων:</div>
                <div className='font-light ml-1'>{data.total_reservations}</div>
              </div>
            </div>
            <div>
             <div className='flex'>
                <div className=''>Υποδομή:</div>
                <div className='font-light ml-1'>{data.facility_name}</div>
              </div>
              <div className='flex'>
                <div className=''>Μέση Αξιολόγηση:</div>
                <div className='font-light ml-1'>{data.average_rating}</div>
              </div>
            </div>
          </div>
          <div className='flex justify-center mt-10 text-lg'>
            <div className='font-normal'>Σύνολο Κερδών:</div>
            <div className='ml-1 font-light'>{data.total_earnings}</div>
          </div>
          <div className='mt-10'>
            <div className='font-normal'>Περιγραφή:</div>
            <div className='bg-white w-full h-32 px-4 py-2 mt-2 shadow rounded-xl font-light'>
              {data.description}
            </div>
          </div>
          <button onClick={() => setShowReviews(true)} className='bg-cyan hover:bg-hover rounded-full w-full mt-10 font-light text-2xl shadow'>Εμφάνιση Κριτικών</button>
          <div className='flex justify-center mt-10 text-lg'>
            <div className='font-normal'>Συχνότητα Διεξαγωγής:</div>
            {
              data.recursive ? <div className='ml-1 font-light'>Περιοδική</div> : <div className='ml-1 font-light'>Επιλεκτική Διεξαγωγή</div>
            }
          </div>
          <div className='mt-10 text-lg text-center font-normal'>Ημερομηνίες Διεξαγωγής:</div>
          <div className='bg-white w-full h-52 p-2 mt-2 font-light rounded-xl overflow-hidden shadow'>
            <div className='flex px-16 justify-between font-normal'>
              <div className=''>Ημερομηνία</div>
              <div className=''>Ώρα</div>
            </div>
            <div className='h-52 mt-2 overflow-y-scroll'>
              {
                data.occurrences.map((date, i) => <ListItemDate key={i} data={date} />)
              }
            </div>
          </div>
          <Modal show={showReviews} children={<AllReviews id={id}/>} color='bg-background' closeCallback={() => setShowReviews(false)} />
        </>
      }
    </div>
  );
}
