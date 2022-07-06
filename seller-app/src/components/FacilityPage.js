import { useState, useEffect } from "react";
import { sendFacilityData } from '../api/api.js'

const FacilityPage = ({data, cancel}) => {
  const [name, setName] = useState('')
  const [street, setStreet] = useState('')
  const [location, setLocation] = useState('')

  useEffect(() => {
    setName(data.name)
    setStreet(data.street)
    setLocation(data.location)
  }, [])

  function sendNewFacilityInfo(){
    sendFacilityData(
    {
      name: name,
      street: street,
      location: location,
    })
  }

  return (
    <div className='font-normal px-10 pb-6'>
      <div className='text-3xl text-center px-12 font-light'>Επεξεργασία Υποδομής</div>
      <div className='mt-10 w-full'>
          <div className=''>Όνομα Υπηρεσίας*</div>
          <input type='text' className='bg-white w-full h-8 px-4 rounded-full shadow'
            value={name} onChange={(e) => setName(e.target.value)}
          />
      </div>
      <div className='mt-6 w-full'>
        <div className=''>Οδός*</div>
        <input type='text' className='bg-white w-full h-8 px-4 rounded-full shadow'
            value={street} onChange={(e) => setStreet(e.target.value)}
        />
      </div>
      <div className='mt-6'>
          <div className=''>Περιοχή*</div>
          <input type='text' className='bg-white w-full h-8 px-4 rounded-full shadow'
            value={location} onChange={(e) => setLocation(e.target.value)}
          />
      </div>
      <div className='flex justify-between mt-16'>
        <button onClick={() => cancel()} className="bg-gray-200 border-2 hover:bg-gray-300 hover:text-white w-5/12 h-10 rounded-full">Ακύρωση</button>
        <button onClick={() => sendNewFacilityInfo()} className="bg-cyan w-5/12 h-8 hover:bg-hover h-10 rounded-full">Αποθήκευση</button>
      </div>
    </div>
  );
}

export default FacilityPage
