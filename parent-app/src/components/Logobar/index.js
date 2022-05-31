import { useState } from 'react'
import { Navbar } from 'react-bootstrap'
import Modal from '../Modal/index.js'
import Login from '../Login/index.js'
import Register from '../Register/index.js'

export default function Logobar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  
  return (
    <div class='bg-logobar h-15'>
      <Navbar class='flex'>
        <div class='h-12 p-2'>
          <a class='no-underline text-gray-700' href='/' id="a"><h3>Logo</h3></a>
        </div>
        <div class='px-4 py-1'>
          <input type='text' class='h-10 w-96 px-2 rounded-full' placeholder="Αναζητήστε κάποια δραστηριότητα.."></input>
        </div>
        <div class='text-gray-700 py-2 right-10 absolute flex'>
          <button>Partner</button>
          <button onClick={()=> setShowLogin(true)} class='bg-gray-100 h-8 w-20 mx-2 rounded-full'>Είσοδος</button>
          <button onClick={()=> setShowRegister(true)} class='bg-gray-100 h-8 w-20 rounded-full'>Εγγραφή</button>
        </div>
      </Navbar>
      <Modal onClose={()=> setShowLogin(false)} show={showLogin}><Login/></Modal>
      <Modal onClose={()=> setShowRegister(false)} show={showRegister}><Register/></Modal>
    </div>
  );
}
