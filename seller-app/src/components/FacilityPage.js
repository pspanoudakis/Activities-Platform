import { useState, useEffect } from "react";
import {updateFacility} from "../api/facilitiesAPI";

const FacilityPage = ({data, cancel,update}) => {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [district, setDistrict] = useState('')
  const [updateComplete,setUpdateComplete] = useState(false)

  useEffect(() => {
    setName(data.name)
    setAddress(data.address)
    setDistrict(data.district)
  }, [data.name, data.address, data.district])

  function sendNewFacilityInfo(){
      const updatedData = {
          name:name,
          address:address,
          district:district
      }
      updateFacility(updatedData,data.id,(response) => {
          if(response.ok){
              setUpdateComplete(true);
              update()
          }else{
              alert('Αποτυχία κατα την εκτέλεση');
          }
      })
  }

  function renderForm(){
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
                         value={address} onChange={(e) => setAddress(e.target.value)}
                  />
              </div>
              <div className='mt-6'>
                  <div className=''>Περιοχή*</div>
                  <input type='text' className='bg-white w-full h-8 px-4 rounded-full shadow'
                         value={district} onChange={(e) => setDistrict(e.target.value)}
                  />
              </div>
              <div className='flex justify-between mt-16'>
                  <button onClick={() => cancel()} className="bg-gray-200 border-2 hover:bg-gray-300 hover:text-white w-5/12 h-10 rounded-full">Ακύρωση</button>
                  <button onClick={() => sendNewFacilityInfo()} className="bg-cyan w-5/12 h-8 hover:bg-hover h-10 rounded-full">Αποθήκευση</button>
              </div>
          </div>
      );
  }

  function renderUpdateCompleted(){
      return(
          <div className='font-normal px-10 pb-6'>
              <div className='text-3xl text-center px-12 font-light'>H Eπεξεργασία ολοκληρώθηκε</div>
          </div>

      )
  }


  function render(){
      if(updateComplete)
          return renderUpdateCompleted()
      return renderForm();
  }

  return render();
}

export default FacilityPage
