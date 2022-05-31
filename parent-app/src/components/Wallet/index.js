import CreditCard from '../WalletCards/CreditCard'
import PointCard from '../WalletCards/PointCard'


const Wallet = props => {
  return (
    <div class='m-20'>
      <div class='mr-96'>
        <h5>Πόντοι</h5>
        <h1>120</h1>
      </div>
      <div class='mr-96 mt-32'>
        <h5>Κάρτες</h5>
        <div class='ml-14 flex'>
          <CreditCard cardBrand='Visa' cardNumber='****8427'/>
          <CreditCard cardBrand='Mastercard' cardNumber='****4829'/>
          <button class='bg-cyan p-10 h-32 mx-auto rounded-xl'>
          <h1>+</h1>
          </button>
        </div>
      </div>
      <div class='mr-96 mt-20'>
        <h5>Αγορά πόντων</h5>
        <div class='ml-14 flex'>
          <PointCard points='20' cost='10' />
          <PointCard points='45' cost='20' />
          <PointCard points='120' cost='50' />
        </div>
      </div>
      <button class='bg-logobar text-white w-32 h-10 mt-12 rounded-xl'>Αγορά</button>
    </div>
  )
}

export default Wallet
