import React from 'react'

var height = document.body.style.height;
var overflow = document.body.style.overflow;

function Scroll(scrollable) {
  if(!scrollable) {
    document.body.style.height = "100%";
    document.body.style.overflow = "hidden";
  }
  else {
    document.body.style.height = height;
    document.body.style.overflow = overflow;
  }
}

const Modal = props => {
  if(!props.show) {
    return null
  }
  function close() {
    Scroll(true);
    props.onClose()
  }
  return (
    <>
      {Scroll(false)}
      <div onClick={close} class='bg-black bg-opacity-25 fixed top-0 bottom-0 right-0 left-0 z-40'></div>
      <div class='fixed top-20 left-0 right-0 w-96 mx-auto z-50'>
        {React.cloneElement(props.children, { onClose: close })}
      </div>
    </>
  )
}

export default Modal
