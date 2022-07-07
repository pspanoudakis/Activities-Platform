import ListItemDate from "./ListItemDate.js";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { sendActivityData } from '../api/api.js'
import { useNavigate } from 'react-router-dom';
import { isNumberKey, isTimeKey } from '../shared/ValidInput.js';
import Dropdown from '../shared/Dropdown.js';
import { fetchAddActivityPageData } from '../api/api.js'


export default function AddActivityPage() {
  const navigate = useNavigate();
  const [images, setImages] = useState([])
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [age, setAge] = useState('')
  const [facility, setFacility] = useState('')
  const [description, setDescription] = useState('')
  const [occurence, setOccurence] = useState('')
  const [time, setTime] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [dateList, setDateList] = useState([])
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [canSubmit, setCanSubmit] = useState(false)
  
  useEffect(() => {
    fetchAddActivityPageData( (response) => {
      if(response.ok){
        response.data.categories = [{ label: 'Επιλέξτε', value: '' }, ...response.data.categories]
        response.data.ageCategories = [{ label: 'Επιλέξτε', value: '' }, ...response.data.ageCategories]
        response.data.facilities = [{ label: 'Επιλέξτε', value: '' }, ...response.data.facilities]
        setData(response.data)
      }
      else{
        console.log('failed to fetch data');
      }
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if(name !== '' && category !== '' && price !== '' && facility !== '') {
      setCanSubmit(true)
    }
    else {
      setCanSubmit(false)
    }
  }, [name, category, price, facility])

  function sendNewActivityInfo() {
    sendActivityData(
    {
      images: images,
      name: name,
      category: category,
      price: price,
      age: age,
      facility: facility,
      description: description,
      occurence: occurence,
      dateList: dateList
    })
  }

  function onImageChange(e) {
    setImages([...e.target.files])
  }

  function AddDates() {
  }
  
  return (
    <div className='font-light'>
      {
        loading ? 
        <span>Φορτώνει...</span>
        :
        <>
          <div className='text-3xl text-center'>Νέα Δραστηριότητα</div>
          <div className='relative mt-8'>
            <img className='w-full h-48 rounded-3xl' src='' alt=''/>
            <label className='absolute bg-cyan hover:bg-hover rounded-full p-1 w-1/2 top-20 left-1/4 text-center shadow' for='upload'>Ανεβάστε αρχεία...</label>
            <input type='file' id='upload' className='opacity-0 absolute' multiple accept='image/*' onChange={onImageChange}/>
          </div>
          <div className='flex mt-6 mx-auto justify-between font-normal'>
            <div className='w-full'>
              <div className=''>Όνομα Υπηρεσίας*</div>
              <input type='text' className='bg-white w-11/12 px-4 rounded-full shadow'
                value={name} onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='w-full'>
              <div className=''>Κατηγορία*</div>
              <Dropdown
                options={data.categories}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className='w-full'>
              <div className=''>Τιμή*</div>
              <input className='bg-white w-9/12 px-4 rounded-full shadow'
                value={price} onChange={(e) => isNumberKey(e, setPrice)}
              />
            </div>
          </div>
          <div className='flex justify-between mt-6 font-normal'>
            <div className='w-1/2'>
              <div className=''>Ηλικιακή Κατηγορία</div>
              <Dropdown
                options={data.ageCategories}
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
          </div>
          <div className='flex mt-6 justify-between font-normal'>
            <div className='w-full'>
              <div className=''>Υποδομή*</div>
              <Dropdown
                options={data.facilities}
                value={facility}
                onChange={(e) => setFacility(e.target.value)}
              />
            </div>
            <button onClick={() => navigate('/add-facility')} className='bg-cyan hover:bg-hover w-1/2 h-12 rounded-full shadow'>Νέα Υποδομή</button>
          </div>
          <div className='mt-10 font-normal'>
            <div className=''>Περιγραφή*</div>
            <form>
              <textarea className='bg-white w-full h-32 px-2 py-1 mt-2 rounded-xl font-light resize-none shadow'
                value={description} onChange={(e) => setDescription(e.target.value)}
              />
            </form>
          </div>
          <div className='mt-2 text-sm text-gray-500'>Τα πεδία με '*' είναι υποχρεωτικά</div>
          <div className='mt-10'>
            <div className='flex space-x-4'>
              <div className='font-medium'>Ημέρες και Ώρες Διεξαγωγής:</div>
              <div>
                <input type='radio' value='periodically' name='occurs' onChange={(e) => setOccurence(e.currentTarget.value)}/>Περιοδικά
                <input type='radio' value='selectively' className='ml-4' name='occurs' onChange={(e) => setOccurence(e.currentTarget.value)}/>Επιλεκτικά
              </div>
            </div>
            <div className='bg-white w-full mt-4 px-8 py-4 rounded-3xl overflow-hidden'>
              <div className='font-medium text-center'>Εισαγωγή Ημερομηνίας</div>
              <div className='flex mt-2 justify-between'>
                <div className='font-medium'>Ημέρα:</div>
                <div>
                  <input type='radio' className=''/>
                  <label>ΔΕΥ</label>
                </div>
                <div>
                  <input type='radio' className=''/>
                  <label>ΤΡΙ</label>
                </div>
                <div>
                  <input type='radio' className=''/>
                  <label>ΤΕΤ</label>
                </div>
                <div>
                  <input type='radio' className=''/>
                  <label>ΠΕΜ</label>
                </div>
                <div>
                  <input type='radio' className=''/>
                  <label>ΠΑΡ</label>
                </div>
                <div className='flex w-3/12 space-x-2'>
                  <div className='font-medium'>Ώρα</div>
                  <input type='text' className='bg-gray-200 w-24 px-4 rounded-full text-center shadow'
                  value={time} onChange={(e) => isTimeKey(e, setTime)}
                  placeholder='hh:mm'
                  />
                </div>
              </div>
              <div className='flex mt-4 w-full justify-center space-x-6'>
                <div className='flex'>
                  <div className='font-medium'>Από</div>
                  <DatePicker
                    className='bg-gray-200 w-28 ml-1 rounded-full text-center caret-transparent	shadow'
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    placeholderText='επιλογή'
                  />
                </div>
                <div className='flex'>
                  <div class='font-medium'>Έως</div>
                  <DatePicker
                    className='bg-gray-200 w-28 ml-1 rounded-full text-center caret-transparent shadow'
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    placeholderText='επιλογή'
                  />
                </div>
              </div>
              <div className='text-center mt-4'>
                <button onClick={() => AddDates()} className='bg-cyan hover:bg-hover w-1/3 h-8 rounded-full shadow'>Προσθήκη</button>
              </div>
            </div>
          </div>
          <div className='bg-white w-full h-52 p-2 mt-10 font-light rounded-xl overflow-hidden shadow'>
            <div className='flex px-16 justify-between font-normal'>
              <div className=''>Ημερομηνία</div>
              <div className=''>Ώρα</div>
            </div>
            <div className='h-52 mt-2 overflow-y-scroll'>
            </div>
          </div>
          <button onClick={() => sendNewActivityInfo()} className={`${canSubmit ? 'hover:bg-hover' : 'opacity-70 cursor-default'} bg-cyan w-full mt-10 rounded-full h-14 text-lg shadow`}>Καταχώρηση Δραστηριότητας</button>
          {
            canSubmit ? '' :
              <div className='mt-2 text-center text-sm text-red-400'>Τα πεδία με '*' είναι υποχρεωτικά</div>
          }
        </>
      }
    </div>
  );
}
