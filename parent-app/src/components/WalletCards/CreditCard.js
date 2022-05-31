const CreditCard = props => {
  return (
    <div class='bg-cyan text-blue-500 mr-10 h-32 rounded-xl'>
      <button class='ml-44'>x</button>
      <div class='px-2 flex'>
        <div class='pt-20 pr-32'>
          {props.cardBrand}
        </div>
        <div class='pt-20'>
          {props.cardNumber}
        </div>
      </div>

    </div>
  )
}

export default CreditCard
