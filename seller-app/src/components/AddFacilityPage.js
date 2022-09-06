import React, { useState, useEffect } from "react";
import { createNewFacility } from '../api/facilitiesAPI.js'
//import { SingleMarkerMap } from "@johnvaiosdimopoulos/software-engineering-project-spring-2022-team1";
import { SingleMarkerMap } from "../shared/Maps";
import { defaultHomePosition } from "@johnvaiosdimopoulos/software-engineering-project-spring-2022-team1";


export default function AddFacilityPage() {
  const [name, setName] = useState('')
  const [street, setStreet] = useState('')
  const [location, setLocation] = useState('')
  const [canSubmit, setCanSubmit] = useState(false)
  const [facilityPosition, setFacilityPosition] = useState(defaultHomePosition)

  useEffect(() => {
    if(name !== '' && street !== '' && location) {
      setCanSubmit(true)
    }
    else {
      setCanSubmit(false)
    }
  }, [name, street, location])

  function sendNewFacilityInfo(){
    createNewFacility(
    {
      name: name,
      address: street,
      district: location,
      longitude: facilityPosition.lng,
      latitude: facilityPosition.lat
    },null)
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
      <div className='mt-4 text-sm text-gray-500'>*Τα πεδία με '*' είναι υποχρεωτικά</div>
      <div className='mt-8'>Επιλέξτε στο χάρτη τη τοποθεσία της υποδομής σας:</div>
      <SingleMarkerMap
          position={facilityPosition}
          style={{width: '100%', height: '20rem'}}
          onClick={setFacilityPosition}
          initialZoom={10}
      />
      <button onClick={() => sendNewFacilityInfo()} className={`${canSubmit ? 'hover:bg-hover' : 'opacity-70 cursor-default' } bg-cyan w-full h-8 mt-12 h-12 rounded-full`}>Καταχώρηση Υποδομής</button>
      {
        canSubmit ? '' :
        <div className='mt-2 text-center text-sm text-red-400'>Τα πεδία με '*' είναι υποχρεωτικά</div>
      }
    </div>
  );
}
