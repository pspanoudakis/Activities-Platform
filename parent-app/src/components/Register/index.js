import { Form } from 'react-bootstrap'


const Register = props => {
  return (
      <div class='bg-cyan w-96 h-auto px-12 pt-6 mx-auto rounded-3xl'>
        <h3 class='inline ml-20'>Εγγραφή</h3>
        <button onClick={props.onClose} class='bg-gray-700 text-white h-6 w-6 ml-16 rounded-full'>x</button>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div class='mr-36 mt-8 pb-1'>Όνομα χρήστη:</div>
            <Form.Control type="email" placeholder="Εισάγετε το email σας" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div class='mr-52 pb-1'>Email:</div>
            <Form.Control type="email" placeholder="Εισάγετε το email σας" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div class='mr-48 pb-1'>Κωδικός:</div>
            <Form.Control type="email" placeholder="Εισάγετε το email σας" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
          <div class='mr-40 p-1'>Επιβεβαίωση:</div>
          <Form.Control type="password" placeholder="Εισάγετε Κωδικό" />
          </Form.Group><br/>
          <button class='bg-button text-white h-10 w-32 rounded-lg'>Εγγραφή</button>
          <br/>Έχετε ήδη λογαριασμό; <a href='/login'>Συνδεθείτε</a>
        </Form>
        <br/>
      </div>
  )
}

export default Register
