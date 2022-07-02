import { useNavigate } from 'react-router-dom';

const ListItemActivity = ({data}) => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/activity')} className='bg-white hover:bg-gray-50 w-full px-8 py-3 rounded-3xl mt-4 font-normal shadow-lg'>
      <div className='flex'>
        <img class='w-2/5 h-32 border-2 border-gray-300 rounded-3xl' src={data.imgUrl} alt=''/>
        <div className='mx-auto ml-4 w-8/12'>
          <div className='text-2xl mb-3'>{data.title}</div>
          <div className='float-left'>Ημερομηνία:</div>
          <div className='float-left ml-1 font-light'>{data.date}</div><br/>
          <div className='float-left'>Κατάσταση:</div>
          <div className='float-left ml-1 font-light'>{data.state}</div><br/>
          <div className='float-left'>Υποδομή:</div>
          <div className='float-left ml-1 font-light'>{data.facility}</div>
          <div className='float-right mr-1 text-lg font-light'>{data.bookCount}</div>
          <div className='float-right mr-1 text-lg'>Κρατήσεις:</div>
        </div>
      </div>
    </button>
  );
}

export default ListItemActivity
