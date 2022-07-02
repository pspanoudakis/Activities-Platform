export default function AddAccount() {
  return (
    <div className='bg-background px-10 pt-4 pb-8 rounded-3xl'>
      <div className='text-center px-8 text-2xl'>Προσθήκη Λογαριασμού</div>
      <div className='mt-6'>
        <div className=''>IBAN</div>
        <input type='text' className='w-full h-8 px-2 rounded-full shadow'/>
      </div>
      <div className='mt-4'>
        <div className=''>Αριθμός Λογαριασμού</div>
        <input type='text' className='w-full h-8 px-2 rounded-full shadow'/>
      </div>
      <div className='mt-4'>
        <div className=''>Ονοματεπώνυμο Δικαιούχου</div>
        <input type='text' className='w-full h-8 px-2 rounded-full shadow'/>
      </div>
      <button className='bg-cyan hover:bg-hover mt-8 rounded-full w-full h-10 text-2xl font-light shadow'>Προσθήκη</button>
    </div>
  );
}
