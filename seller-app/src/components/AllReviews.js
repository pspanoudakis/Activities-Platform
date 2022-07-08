import ListItemReview from "./ListItemReview.js";
import {useEffect, useState} from "react";
import {fetchActivityReviews} from "../api/activitiesAPI";

const AllReviews = (id) => {
  const [data,setData] = useState([]);

  useEffect(()=>{
    fetchActivityReviews(id.id,(response)=>{
      if (response.ok){
        setData(response.data);
      } else {
        alert('Αποτυχία κατα την εκτέλεση');
      }
    })
  },[])

  function renderReviews(){
    console.log(data.length)
    if(data.length === 0){
      return <div className='text-center text-3xl'>Δεν υπαρχουν κριτικές</div>
    }
    else {
      return data.map((review, i) => <ListItemReview key={i} data={review} />)
    }
  }



  return (
    <div className='bg-background px-2 pb-8 rounded-3xl'>
      <div className='text-center text-3xl'>Κριτικές Χρηστών</div>
      <div className='h-96 mt-4 overflow-y-scroll overflow-hidden'>
        {
          renderReviews()
        }
      </div>
    </div>
  );
}

export default AllReviews