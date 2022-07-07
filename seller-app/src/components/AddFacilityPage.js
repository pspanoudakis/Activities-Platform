import { useState, useEffect } from "react";
import { sendFacilityData } from '../api/api.js'


export default function AddFacilityPage() {
  const [name, setName] = useState('')
  const [street, setStreet] = useState('')
  const [location, setLocation] = useState('')
  const [canSubmit, setCanSubmit] = useState(false)

  useEffect(() => {
    if(name !== '' && street !== '' && location) {
      setCanSubmit(true)
    }
    else {
      setCanSubmit(false)
    }
  }, [name, street, location])

  function sendNewFacilityInfo(){
    sendFacilityData(
    {
      name: name,
      street: street,
      location: location,
    })
  }

  return (
    <div className='font-normal'>
      <div className='text-3xl text-center font-light'>Νέα Υποδομή</div>
      <div className='mt-10 w-full'>
          <div className=''>Όνομα Υπηρεσίας*</div>
          <input type='text' className='bg-white w-full h-8 px-4 rounded-full shadow'
            value={name} onChange={(e) => setName(e.target.value)}
          />
      </div>
      <div className='mt-8 w-full'>
        <div className=''>Οδός*</div>
        <input type='text' className='bg-white w-full h-8 px-4 rounded-full shadow'
            value={street} onChange={(e) => setStreet(e.target.value)}
        />
      </div>
      <div className='mt-8 '>
          <div className=''>Περιοχή*</div>
          <input type='text' className='bg-white w-full h-8 px-4 rounded-full shadow'
            value={location} onChange={(e) => setLocation(e.target.value)}
          />
      </div>
      <div className='mt-4 text-sm text-gray-500'>Τα πεδία με '*' είναι υποχρεωτικά</div>
      <button onClick={() => sendNewFacilityInfo()} className={`${canSubmit ? 'hover:bg-hover' : 'opacity-70 cursor-default' } bg-cyan w-full h-8 mt-12 h-12 rounded-full`}>Καταχώρηση Υποδομής</button>
      {
        canSubmit ? '' :
        <div className='mt-2 text-center text-sm text-red-400'>Τα πεδία με '*' είναι υποχρεωτικά</div>
      }
    </div>
  );
}
