import ListItemDate from "./ListItemDate.js";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { sendActivityData } from '../api.js'


export default function AddActivityPage() {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [age, setAge] = useState('')
  const [seats, setSeats] = useState('')
  const [facility, setFacility] = useState('')
  const [description, setDescription] = useState('')

  function sendNewActivityInfo(){
    sendActivityData(
    {
      name: name,
      category: category,
      price: price,
      age: age,
      seats: seats,
      facility: facility,
      description: description
    })
  }

  return (
    <div className='font-light'>
      <div className='text-3xl text-center'>Νέα Δραστηριότητα</div>
      <div className='relative w-full mt-8'>
        <img className='w-full h-48 rounded-3xl' src='' alt=''/>
        <button className='absolute bg-cyan hover:bg-hover rounded-full p-1 w-1/2 top-20 left-1/4 shadow'>Ανεβάστε μία Eικόνα</button>
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
          <input type='text' class='bg-white w-10/12 px-4 rounded-full shadow'
            value={category} onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className='w-full'>
          <div className=''>Τιμή*</div>
          <input type='text' className='bg-white w-9/12 px-4 rounded-full shadow'
            value={price} onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>
      <div className='flex justify-between mt-6 font-normal'>
        <div className='w-1/2'>
          <div className=''>Ηλικιακή Κατηγορία</div>
          <input type='text' className='bg-white w-11/12 px-4 rounded-full shadow'
            value={age} onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className='w-1/3'>
          <div className=''>Αριθμός Θέσεων*</div>
          <input type='text' className='bg-white w-10/12 px-4 rounded-full shadow'
            value={seats} onChange={(e) => setSeats(e.target.value)}
          />
        </div>
      </div>
      <div className='flex mt-6 justify-between font-normal'>
        <div className='w-full'>
          <div className=''>Υποδομή*</div>
          <input type='text' className='bg-white w-1/2 px-4 rounded-full shadow'
            value={facility} onChange={(e) => setFacility(e.target.value)}
          />
        </div>
        <button className='bg-cyan hover:bg-hover w-1/2 h-12 rounded-full shadow'>Νέα Υποδομή</button>
      </div>
      <div className='mt-10 font-normal'>
        <div className=''>Περιγραφή*</div>
        <form>
          <textarea className='bg-white w-full h-32 px-2 py-1 mt-2 rounded-xl font-light resize-none shadow'
            value={description} onChange={(e) => setDescription(e.target.value)}
          />
        </form>
      </div>
      <div className='mt-10'>
        <div className='flex space-x-4'>
          <div className='font-medium'>Ημέρες και Ώρες Διεξαγωγής:</div>
          <div>
            <input type='radio' name='occurs'/>
            <label>Περιοδικά</label>
          </div>
          <div>
            <input type='radio' name='occurs'/>
            <label>Επιλεκτικά</label>
          </div>
        </div>
        <div className='bg-white w-full mt-4 px-8 py-4 rounded-3xl'>
          <div className='font-medium text-center'>Εισαγωγή Ημερομηνίας</div>
          <div className='flex mt-2 justify-between'>
            <div className='font-medium'>Ημέρα:</div>
            <div>
              <input type='radio' id='mon' className=''/>
              <label for='monday'>ΔΕΥ</label>
            </div>
            <div>
              <input type='radio' id='tue' className=''/>
              <label for='monday'>ΤΡΙ</label>
            </div>
            <div>
              <input type='radio' id='wed' className=''/>
              <label for='monday'>ΤΕΤ</label>
            </div>
            <div>
              <input type='radio' id='thu' className=''/>
              <label for='monday'>ΠΕΜ</label>
            </div>
            <div>
              <input type='radio' id='fri' className=''/>
              <label for='monday'>ΠΑΡ</label>
            </div>
            <div className='flex w-3/12 space-x-2'>
              <div className='font-medium'>Ώρα</div>
              <input type='text' className='bg-gray-200 w-1/2 px-4 rounded-full shadow'/>
            </div>
          </div>
          <div className='flex mt-4 w-full justify-center space-x-6'>
            <div className='flex'>
              <div className='font-medium'>Από</div>
              <DatePicker className='bg-gray-200 w-16  ml-1 rounded-full shadow'/>
            </div>
            <div className='flex'>
              <div class='font-medium'>Έως</div>
              <DatePicker className='bg-gray-200 w-16 ml-1 rounded-full shadow'/>
            </div>
          </div>
          <div className='text-center mt-4'>
            <button className='bg-cyan hover:bg-hover w-1/3 h-8  rounded-full shadow'>Προσθήκη</button>
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
      <button onClick={() => sendNewActivityInfo()} className='bg-cyan w-full my-10 rounded-full h-14 hover:bg-hover text-lg shadow'>Καταχώρηση Δραστηριότητας</button>
    </div>
  );
}
