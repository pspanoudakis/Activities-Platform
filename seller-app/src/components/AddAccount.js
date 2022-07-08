import {useState} from 'react';
import {addBankAccount} from "../api/profileAPI";

const AddAccount = ({addAccountCallback, close}) => {
    const [iban, setIban] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [ownerName, setOwnerName] = useState('')
    const [isAdded, setIsAdded] = useState(false);
    const [additionError, setAdditionError] = useState(false);


    function add() {
        addBankAccount({
            iban: iban,
            owner_name: ownerName,
            account_number: accountNumber
        }, (response) => {
            if (response.ok) {
                setIsAdded(true);
                addAccountCallback();
            } else {
                setAdditionError(true);
            }
        });
    }

    function renderForm() {
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
                           value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)}
                    />
                </div>
                <div className='mt-4'>
                    <div className=''>Ονοματεπώνυμο Δικαιούχου</div>
                    <input type='text' className='w-full h-8 pl-2 rounded-full shadow'
                           value={ownerName} onChange={(e) => setOwnerName(e.target.value)}
                    />
                </div>
                <button onClick={add}
                        className='bg-cyan hover:bg-hover mt-10 rounded-full w-full h-10 text-2xl font-light shadow'>Προσθήκη
                </button>
            </div>
        );

    }

    function renderAdditionCompleted() {
        return (
            <div className='bg-background px-10 pt-2 pb-8 rounded-3xl'>
                <h1 className='text-center text-2xl'>Ο Λογαρισμός εισήχθει με επιτυχία</h1>
            </div>
        )

    }

    function renderErrorDuringAddition() {
        return (
            <div className='bg-background px-10 pt-2 pb-8 rounded-3xl'>
                <h1 className='text-center text-2xl'>Σφάλμα κατα την εισαγωγή</h1>
            </div>
        )
    }


    function renderComponent() {
        if (isAdded)
            return renderAdditionCompleted();
        if(additionError)
            return renderErrorDuringAddition();
        return renderForm()

    }

    return renderComponent();

}

export default AddAccount
