import {createSearchParams, useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";


const ListItemActivity = ({data}) => {
  const navigate = useNavigate();
  const [nextOccurrence,setNextOccurrence] = useState(null);
  const [status,setStatus] = useState(null);


  useEffect(() => {
    if(data.next_occurrence == null)
      setNextOccurrence("Δεν υπαρχει μελλοντικη ημερομινια")
    else
      setNextOccurrence(data.next_occurrence)

    data.is_approved ? setStatus("Εχει εγκριθεί") : setStatus("Αναμένει έγκριση")


  }, [data])

  function goToDetails(){
    const params = {id:data.id}
    navigate({
      pathname: '/activity',
      search:`?${createSearchParams(params)}`

    });
  }

  return (
    <button onClick={goToDetails} className='bg-white hover:bg-gray-50 w-full px-8 py-3 rounded-3xl mt-4 font-normal shadow-lg'>
      <div className='flex'>
        <img class='w-2/5 h-32 rounded-3xl' src={data.image_urls[0]} alt=''/>
        <div className='mx-auto ml-4 w-8/12'>
          <div className='text-2xl mb-3'>{data.activity_name}</div>
          <div className='float-left'>Ημερομηνία:</div>
          <div className='float-left ml-1 font-light'>{nextOccurrence}</div><br/>
          <div className='float-left'>Κατάσταση:</div>
          <div className='float-left ml-1 font-light'>{status}</div><br/>
          <div className='float-left'>Υποδομή:</div>
          <div className='float-left ml-1 font-light'>{data.facility_name}</div>
          <div className='float-right mr-1 text-lg font-light'>{data.total_reservations}</div>
          <div className='float-right mr-1 text-lg'>Κρατήσεις:</div>
        </div>
      </div>
    </button>
  );
}

export default ListItemActivity
