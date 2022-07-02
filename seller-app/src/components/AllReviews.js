import ListItemReview from "./ListItemReview.js";

const AllReviews = ({data}) => {
  return (
    <div className='bg-background px-2 pb-8 rounded-3xl'>
      <div className='text-center text-3xl'>Κριτικές Χρηστών</div>
      <div className='h-96 mt-4 overflow-y-scroll overflow-hidden'>
        {
          data.map((review, i) => <ListItemReview key={i} data={review} />)
        }
      </div>
    </div>
  );
}

export default AllReviews