import {AiFillStar} from 'react-icons/ai';

const ListItemReview = ({data}) => {
  return (
    <div className='bg-cyan rounded-3xl px-4 py-2 mt-2 font-light shadow overflow-hidden'>
      <div className='flex justify-between'>
        <div className='text-xl'>{data.activity}</div>
        <div className='ml-80'>Από: {data.user}</div>
      </div>
      <div className='flex'>
        {
          [...Array(Math.round(+data.rating)).keys()].map(i => 
            <AiFillStar className='text-2xl'/>
          )
        }
      </div>
      <div className='font-medium mt-2'>βαθμολογία: {data.rating}/5</div>
      <div className='mt-2 break-words'>{data.comment}</div>
    </div>
  );
}

export default ListItemReview
