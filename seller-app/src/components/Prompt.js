const Prompt = ({text, handleConfirm, cancel}) => {

  return (
    <div className='bg-background px-4 pb-4 w-80 rounded-3xl font-normal'>
      <div className='text-xl text-center'>{text}</div>
      <div className='flex justify-between mt-6'>
        <button onClick={() => {handleConfirm(); cancel()}} class='bg-cyan hover:bg-hover rounded-xl text-xl w-1/3'>Ναι</button>
        <button onClick={() => cancel()} class='bg-cyan hover:bg-hover rounded-xl text-xl w-1/3'>Όχι</button>
      </div>
    </div>
  );
}

export default Prompt
