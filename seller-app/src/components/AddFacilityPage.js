import { useState } from "react";
import { sendFacilityData } from '../api.js'


export default function AddFacilityPage() {
  const [name, setName] = useState('')
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [location, setLocation] = useState('')

  function sendNewFacilityInfo(){
    sendFacilityData(
    {
      name: name,
      street: street,
      number: number,
      postalCode: postalCode,
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
      <div className='flex mt-8 mx-auto justify-between'>
        <div className='w-full'>
          <div className=''>Αριθμός*</div>
          <input type='text' class='bg-white w-10/12 h-8 px-4 rounded-full shadow'
            value={number} onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className='w-full'>
          <div className=''>Τ.Κ.*</div>
          <input type='text' className='bg-white w-full h-8 px-4 rounded-full shadow'
            value={postalCode} onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
      </div>
      <div className='mt-8 '>
          <div className=''>Περιοχή*</div>
          <input type='text' className='bg-white w-full h-8 px-4 rounded-full shadow'
            value={location} onChange={(e) => setLocation(e.target.value)}
          />
      </div>
      <button onClick={() => sendNewFacilityInfo()} className="bg-cyan w-full h-8 mt-12 hover:bg-hover h-12 rounded-full">Καταχώρηση Υποδομής</button>
    </div>
  );
}
