const PointCard = props => {
  return (
    <div class='bg-cyan text-yellow-400 mr-10 h-36 rounded-xl'>
      <div class='text-2xl px-14 pt-2'>
        {props.points}  Πόντοι
      </div>
      <div class='text-xl pt-16'>
        {props.cost} $
      </div>
    </div>
  )
}

export default PointCard
