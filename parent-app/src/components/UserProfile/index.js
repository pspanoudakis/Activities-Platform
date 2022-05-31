import { Form } from 'react-bootstrap'


export default function UserProfile() {
  return (
    <div class='bg-cyan mx-auto flex my-10 p-10 w-full'>
      <div class='px-10'>
        <button class='bg-button text-white h-8 w-10 mt-2 mx-2 rounded-full'>
          &lt;-
        </button>
        <h2 class='inline'>Το προφίλ μου</h2>
        <img class='w-52 h-52 mx-4 my-4 rounded-full' src='' alt='' />
        <button class='absolute left-56 top-80 bg-black bg-opacity-25 text-white h-12 w-12 mt-2 rounded-full'>
          -
        </button>
        <button class='bg-button text-white h-8 w-44 mt-2 rounded-full'>
          Οι δραστηριότητες μου
        </button><br/>
        <button class='bg-button text-white h-8 w-44 mt-2 rounded-full'>
          Οι κάρτες μου
        </button><br/>
        <button class='bg-button text-white h-8 w-44 mt-2 rounded-full'>
          Ιστορικό αγορών
        </button><br/>
        <button class='text-red-800 mt-16'>
          Διαγραφή λογαριασμού
        </button>
      </div>
      <div class='mx-auto'>
        <form method='POST' action=''>
          <div class='flex mt-10'>
            <div class='mx-4'>
              <div class='mr-36 pb-1'>Όνομα*</div>
              <input type='text' class='px-2 w-52 h-8 rounded-full'/>
            </div>
            <div class=''>
              <div class='mr-36 pb-1'>Επίθετο</div>
              <input type='text' class='px-2 w-52 h-8 rounded-full'/>
            </div>
          </div>
          <div class='mr-24 mt-2'>
            <div class='mr-64 pb-1'>Email</div>
            <input type='text' class='w-80 px-2 h-8 rounded-full'/>
          </div>
          <div class='flex mt-2'>
            <div class='mx-4'>
              <div class='mr-28 pb-1'>Διεύθυνση</div>
              <input type='text' class='px-2 w-52 h-8 rounded-full'/>
            </div>
            <div class=''>
              <div class='mr-6 pb-1'>Ταχυδρομικός Κώδικας</div>
              <input type='text' class='px-2 w-52 h-8 rounded-full'/>
            </div>
          </div>
          <div class='mt-10'>Επιλέξτε την περιοχή σας στον χάρτη</div>
          <br/><br/>---Map---<br/><br/>

          <button class='bg-button text-white h-8 w-44 mt-20 ml-72 rounded-full'>
            Αποθήκευση
          </button><br/>
        </form>
      </div>
    </div>
  );
}
