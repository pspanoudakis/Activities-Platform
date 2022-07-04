import { useState } from 'react';

const AddAccount = ({ addAccountCallback, close }) => {
  const [iban, setIban] = useState('')
  const [number, setNumber] = useState('')
  const [cardNumber, setCardNumber] = useState('')

  return (
    <div className='bg-background px-10 pt-2 pb-8 rounded-3xl'>
      <div className='text-center px-8 text-2xl'>Προσθήκη Λογαριασμού</div>
      <div className='mt-6'>
        <div className=''>IBAN</div>
        <input type='text' className='w-full h-8 pl-2 rounded-full shadow'
            value={iban} onChange={(e) => setIban(e.target.value)}
        />
      </div>
      <div className='mt-4'>
        <div className=''>Αριθμός Λογαριασμού</div>
        <input type='text' className='w-full h-8 pl-2 rounded-full shadow'
            value={number} onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <div className='mt-4'>
        <div className=''>Ονοματεπώνυμο Δικαιούχου</div>
        <input type='text' className='w-full h-8 pl-2 rounded-full shadow'
          value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}
        />
      </div>
      <button onClick={() => {addAccountCallback({iban:iban, number:number, cardNumber:cardNumber}); close()}}
        className='bg-cyan hover:bg-hover mt-10 rounded-full w-full h-10 text-2xl font-light shadow'>Προσθήκη</button>
    </div>
  );
}

export default AddAccount
