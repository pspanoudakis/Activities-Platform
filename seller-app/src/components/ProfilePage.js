import ListItemBankAccount from './ListItemBankAccount.js';
import AddAccount from './AddAccount.js';
import { BsArrowRight } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { sendProfileData, onRedeem } from '../api.js';
import { fetchProfilePageData, sendWatermarkData, sendRemovedAccountIdx } from '../api.js';
import { Modal } from '../shared/Modal.js';
import Prompt from './Prompt.js';

export default function ProfilePage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [canEdit, setCanEdit] = useState(false)
  const [username, setUsername] = useState('')
  const [pwd, setPwd] = useState('')
  const [watermark, setWatermark] = useState('')
  const [redeemPoints, setRedeemPoints] = useState('')
  const [email, setEmail] = useState('')
  const [accounts, setAccounts] = useState([])
  const [selectedAccount, setSelectedAccount] = useState(-1)
  const [showAddAccountPanel, setShowAddAccountPanel] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptText, setPromptText] = useState('');
  const [promptConfirmCallback, setPromptConfirmCallback] = useState(null);
  const [accountToRemove, setAccountToRemove] = useState(null);

  useEffect(() => {
    fetchProfilePageData( (response) => {
      if(response.ok){
        setData(response.data)
        setUsername(response.data.username)
        setEmail(response.data.email)
        setAccounts(response.data.bankAccounts)
        for (const i in response.data.bankAccounts) {
          if (response.data.bankAccounts[i].isSelected) {
            setSelectedAccount(i)
            break
          }
        }
      }
      else{
        console.log('failed to fetch data');
      }
      setLoading(false)
    })
  }, [])
  
  function sendNewProfileInfo(){
    sendProfileData({
      username: username,
      email: email,
      password: pwd
    })
    setCanEdit(false)
  }

  function handleEditOrSave() {
    if (canEdit) {
      sendNewProfileInfo()
    }
    else {
      setCanEdit(true)
    }
  }

  function sendWatermark(){
    sendWatermarkData({
      watermark: watermark
    })
  }

  function switchBankAccount(idx){
    setSelectedAccount(idx)
  }

  function redeem(){
    onRedeem({
      redeemPoints:redeemPoints
    })
  }

  function removeBankAccount(){
    setAccounts([
      ...accounts.slice(0, accountToRemove),
      ...accounts.slice(accountToRemove+1, accounts.length)
    ])
    sendRemovedAccountIdx(accountToRemove)
  }

  function setPrompt(text, onConfirm) {
    setPromptText(text)
    setPromptConfirmCallback(onConfirm)
    setShowPrompt(true);
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
              <button onClick={() => setPrompt('Είστε σίγουρος οτι θέλετε να διαγράψετε τον λογαριασμό σας στο ParentApp;')} className='bg-white hover:bg-red-400 hover:text-white w-11/12 mt-8 border-2 border-red-400 rounded-full font-light text-lg shadow'>Διαγραφή Λογαριασμού</button>
            </div>
          </div>
          <div className='text-2xl mt-12 text-center'>Υδατογράφημα</div>
          <div className='flex justify-between mt-6'>
            <input type='text' className='px-4 w-1/2 p-1 rounded-full shadow' placeholder='Μέχρι 30 χαρακτήρες'
                value={watermark} onChange={(e) => setWatermark(e.target.value)}
            />
            <button onClick={() => sendWatermark()} className='bg-cyan hover:bg-hover w-1/3 h-8 mx-auto text-lg rounded-full shadow'>Προσθήκη</button>
          </div>
          <div className='text-2xl mt-12 text-center'>Οι Πόντοι Μου</div>
          <div className='bg-white rounded-full w-96 p-1 mx-auto text-center text-3xl'>{data.totalPoints} / 3000$</div>
          <div className='text-2xl mt-12 text-center'>Εξαργύρωση Πόντων</div>
          <div className='flex justify-between mt-8'>
            <div className='flex justify-center w-2/5'>
              <input type='text' className='w-full px-4 rounded-full shadow' placeholder='Αριθμός Πόντων'
                  value={redeemPoints ? redeemPoints : ''} onChange={(e) => setRedeemPoints(e.target.value)}
              />
              <div className='ml-2 text-3xl text-gray-500'>pts</div>
            </div>
            <BsArrowRight className='w-10 h-10'/>
            <div className='flex justify-center w-2/5'>
              <input type='text' className='px-4 w-full p-1 rounded-full shadow' placeholder='Αριθμός €'
                value={redeemPoints ? parseInt(redeemPoints)/5 : ''} onChange={(e) => setRedeemPoints(parseInt(e.target.value)*5)}
              />
              <div className='ml-2 text-4xl text-gray-500'>€</div>
            </div>
          </div>
          <button onClick={() => redeem()} className='bg-cyan hover:bg-hover w-full h-8 mt-4 mx-auto text-lg rounded-full shadow'>Εξαργύρωση</button>
          <div className='text-2xl mt-12 text-center'>Οι Λογαριασμοί Μου</div>
          <div className='h-52 overflow-y-scroll overflow-hidden'>
            {
              accounts.map((account, i) => <ListItemBankAccount key={i} clicked={() => switchBankAccount(i)} isSelected={i === selectedAccount} data={account} remove={() => {setPrompt('Είστε σίγουρος οτι θέλετε να διαγράψετε τον λογαριασμό;', () => removeBankAccount()); setAccountToRemove(i)}} />)
            }
          </div>
          <div className='text-center mt-4'>
            <button onClick={() => setShowAddAccountPanel(true)} className='bg-white hover:bg-hover hover:text-white border-4 border-cyan w-16 h-16 pb-1 pl-1 text-5xl text-cyan rounded-full shadow'>+</button>
          </div>
          <Modal show={showAddAccountPanel} children={<AddAccount/>} color='bg-background' closeCallback={() => setShowAddAccountPanel(false)}/>
          <Modal show={showPrompt} children={<Prompt text={promptText} handleConfirm={() => promptConfirmCallback} cancel={() => setShowPrompt(false)}/>} color='bg-background' closeCallback={() => setShowPrompt(false)}/>
        </>
      }
    </div>
  );
}
