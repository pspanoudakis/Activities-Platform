const ListItemDate = ({data}) => {
  return (
    <div className='flex border-b-2 px-16 justify-between mt-2 font-light'>
      <div className=''>{data.date}</div>
      <div className=''>{data.time}</div>
    </div>
  );
}

export default ListItemDate