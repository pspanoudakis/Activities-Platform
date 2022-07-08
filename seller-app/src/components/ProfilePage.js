import ListItemBankAccount from './ListItemBankAccount.js';
import AddAccount from './AddAccount.js';
import { BsArrowRight } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { fetchSellerInfo, updateSellerProfile, redeemSellerPoints, fetchSellerBalance,fetchSellerBankAccounts,removeAccount} from '../api/profileAPI.js';
import { Modal } from '../shared/Modal.js';
import { isNumberKey } from '../shared/ValidInput.js';

export default function ProfilePage() {
  const [points, setPoints] = useState(null)
  const [loading, setLoading] = useState(true)
  const [canEdit, setCanEdit] = useState(false)
  const [username, setUsername] = useState('')
  const [pwd, setPwd] = useState('')
  const [redeemPoints, setRedeemPoints] = useState('')
  const [email, setEmail] = useState('')
  const [accounts, setAccounts] = useState([])
  const [selectedAccount, setSelectedAccount] = useState(-1)
  const [showAddAccountPanel, setShowAddAccountPanel] = useState(false);


  function getAccounts() {
    fetchSellerBankAccounts((response) =>{
      console.log(response.data)
      if(response.ok){
        setAccounts(response.data)
      } else {
        alert('Αποτυχία κατα την εκτέλεση');
      }
    })
  }

  function  getBalance() {
    fetchSellerBalance((response) => {
      if(response.ok){
        setPoints(response.data.points)
      }else{
        alert('Αποτυχία κατα την εκτέλεση');
      }
    })
  }

  function getProfileInfo() {
    fetchSellerInfo( (response) => {
      if(response.ok){
        setUsername(response.data.username)
        setEmail(response.data.email)
      }
      else{
        alert('Αποτυχία κατα την εκτέλεση');
      }
      setLoading(false)
    })
  }

  useEffect(() => {
    getProfileInfo();
    getBalance();
    getAccounts();

  }, [])
  
  function handleEditOrSave() {
    if (canEdit) {
      updateSellerProfile({
        username: username,
        email: email,
        password: pwd
      })
      setCanEdit(false)
    }
    else {
      setCanEdit(true)
    }
  }

  function redeem() {
    redeemSellerPoints(redeemPoints,onRedeem)    
  }

  function onRedeem() {
    getBalance();
    alert('Η συναλλαγή ολοκληρώθηκε με επιτυχία')
  }

  function removeBankAccount(id) {
    removeAccount(id,(response)=>{
      if(response.ok){
        getAccounts();
      } else {
        alert('Αποτυχία κατα την εκτέλεση');
      }
    })

  }


  return (
    <div className='font-light'>
      {
        loading ? 
        <span>Φορτώνει...</span>
        :
        <>
          <div className='text-3xl text-center'>Στοιχεία Λογαριασμού</div>
          <div className='relative flex justify-between'>
            <div className='w-full'>
              <div className='mt-8 font-normal'>Όνομα Χρήστη</div>
              <input type='text' className={`w-11/12 h-8 px-4 rounded-full shadow ${canEdit ? 'bg-white' : 'bg-gray-200  outline-none'}`}
                placeholder='Όνομα Χρήστη' readOnly={!canEdit}
                value={username} onChange={(e) => setUsername(e.target.value)}
              />
              <div className='mt-4 font-normal'>Διεύθυνση Email</div>
              <input type='text' className={`w-11/12 h-8 px-4 rounded-full shadow ${canEdit ? 'bg-white' : 'bg-gray-200 outline-none'}`}
                placeholder='Διεύθυνση Email' readOnly={!canEdit}
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
              <div className='mt-4 font-normal'>Κωδικός</div>
              <input type='password' className={`w-11/12 h-8 px-4 rounded-full shadow ${canEdit ? 'bg-white' : 'bg-gray-200 outline-none'}`}
                placeholder={canEdit ? 'Νέος Κωδικός' : 'Κωδικός'} readOnly={!canEdit}
                value={pwd} onChange={(e) => setPwd(e.target.value)}
              />
            </div>
            <div className='w-full mt-24'>
              <button onClick={() => handleEditOrSave()} className='bg-cyan hover:bg-hover w-11/12 h-8 text-lg rounded-full shadow'>
                {
                  canEdit ?
                  'Αποθηκευση'
                  :
                  'Επεξεργασία'
                }
              </button>
            </div>
          </div>
          <div className='text-2xl mt-12 text-center'>Οι Πόντοι Μου</div>
          <div className='bg-white rounded-full w-96 p-1 mt-1 mx-auto text-center text-3xl'>{points} / {parseInt(points)/5}$</div>
          <div className='text-2xl mt-16 text-center'>Εξαργύρωση Πόντων</div>
          <div className='flex justify-between mt-8'>
            <div className='flex justify-center w-2/5'>
              <input type='text' className='w-full px-4 rounded-full shadow' placeholder='Αριθμός Πόντων'
                  value={redeemPoints ? redeemPoints : ''} onChange={(e) => isNumberKey(e, setRedeemPoints)}
              />
              <div className='ml-2 text-3xl text-gray-500'>pts</div>
            </div>
            <BsArrowRight className='w-10 h-10'/>
            <div className='flex justify-center w-2/5'>
              <input type='text' className='px-4 w-full p-1 rounded-full shadow' placeholder='Αριθμός €'
                value={redeemPoints ? parseInt(redeemPoints)/5 : ''} onChange={(e) => isNumberKey(e, setRedeemPoints(parseInt(e.target.value)*5))}
              />
              <div className='ml-2 text-4xl text-gray-500'>€</div>
            </div>
          </div>
          <button onClick={() => redeem()} className={`${redeemPoints ? 'hover:bg-hover' : 'opacity-70 cursor-default' } bg-cyan  w-full h-8 mt-4 mx-auto text-lg rounded-full shadow`} disabled={!redeemPoints}>Εξαργύρωση</button>
          <div className='text-2xl mt-16 text-center'>Οι Λογαριασμοί Μου</div>
          <div className='h-52 mt-2 overflow-y-scroll overflow-hidden'>
            {
              accounts.map((account, i) => <ListItemBankAccount key={i} clicked={() => setSelectedAccount(i)} isSelected={i === selectedAccount} data={account} remove={() => {removeBankAccount(account.id)}} />)
            }
          </div>
          <div className='text-center mt-4'>
            <button onClick={() => setShowAddAccountPanel(true)} className='bg-white hover:bg-hover hover:text-white border-4 border-cyan w-16 h-16 pb-1 pl-1 text-5xl text-cyan rounded-full shadow'>+</button>
          </div>
          <Modal show={showAddAccountPanel} children={<AddAccount addAccountCallback={getAccounts} close={() => setShowAddAccountPanel(false)}/>} color='bg-background' closeCallback={() => setShowAddAccountPanel(false)}/>
          {/*<Modal show={showPrompt} children={<Prompt text={promptText} handleConfirm={() => removeBankAccount()} cancel={() => setShowPrompt(false)}/>} color='bg-background' closeCallback={() => setShowPrompt(false)}/>*/}
        </>
      }
    </div>
  );
}
