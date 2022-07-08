const ListItemBooking = ({data}) => {
  return (
    <div className='bg-cyan flex mt-2 px-6 justify-between rounded-full font-light'>
      <div className='w-26'>{data.activity_name}</div>
      <div className='ml-4 w-24'>{data.reservation_date}</div>
      <div className='ml-4 w-28'>{data.activity_date}</div>
      <div className='ml-4 w-10'>{data.number_of_people_in_reservation}</div>
      <div className='ml-4 w-20'>{data.parent_username}</div>
      <div className='ml-4 w-8'>{data.total_cost}</div>
    </div>
  );
}

export default ListItemBooking
