import { Carousel } from 'react-bootstrap'
import Card from '../Card'

export default function Home() {
  return (
    <div class='text-gray-700 p-2'><br/>
      <div class='bg-cyan rounded-3xl w-11/12 h-96 p-32 mx-auto'>
        <Carousel>
          <Carousel.Item>
            <h1>Καλωσορίσατε στο e-Parent</h1>
            <p>Το νέο site για γρήγορη εύρεση δραστηριοτήτων στην γειτονιά σου!</p>
          </Carousel.Item>
          <Carousel.Item class='text-center'>
            <h2>Βρείτε τώρα τη καλύτερη δραστηριότητα <br/> για εσάς και το παιδί σας από τις αμέτρητες επιλογές</h2>
            <p>Δεν ξέρεις από που να αρχίσεις; Δες όλες τις <a href="/">Κατηγορίες</a></p>
          </Carousel.Item>
        </Carousel>
      </div>
      <div class='mt-20'>
        <h2>Κατηγορίες</h2>
      </div>
      <div class='bg-cyan p-24 flex place-content-center'>
        <div class='relative bottom-16'>
          <div class='bg-blue-100 py-12 w-32 h-32 rounded-full shadow-lg'>
            -image-
          </div>
          <h5>Αθλητισμός</h5>
        </div>
        <div class='relative top-16'>
          <div class='bg-blue-100 py-12 px-2 w-32 h-32 rounded-full shadow-lg'>
            -image-
          </div>
          <h5>Εκδηλώσεις</h5>
        </div>
        <div class='relative bottom-16'>
          <div class='bg-blue-100 py-12 px-2 w-32 h-32 rounded-full shadow-lg'>
            -image-
          </div>
          <h5>Γυμναστήρια</h5>
        </div><div class='relative top-16'>
          <div class='bg-blue-100 py-12 px-2 w-32 h-32 rounded-full shadow-lg'>
            -image-
          </div>
          <h5>Χώροι</h5>
        </div>
        <div class='relative bottom-16'>
          <div class='bg-blue-100 py-12 px-2 w-32 h-32 rounded-full shadow-lg'>
            -image-
          </div>
          <h5>Χόμπι</h5>
        </div>
      </div>
      <div class='mt-20'>
        <h2>Δημοφιλέστερα</h2>
      </div>
      <div class='bg-cyan rounded-3xl mx-auto w-11/12 h-96 p-8 place-content-center flex'>
        <Card />
        <Card />
        <Card />
      </div>
      <div class='mt-40 ml-10 flex'>
        <img class='w-60 h-80 rounded-3xl' src='' alt='' />
        <div class='ml-2'>
          <h2>Γίνε τώρα συνεργάτης</h2>
            Ανέβασε και διαφήμισε τώρα τις υπηρεσίες που προσφέρεις μέσω του νέου αυτού ιστότοπου<br/>
            Επέλεξε από τα πολλά πλάνα συνδρομής και ανέβασε την επιχείρηση σου σε άλλο επίπεδο.
          <form class='px-1 pt-8' action='/'>
            <input type='button' class='bg-gray-100 h-8 w-72 rounded-full' value='Γίνε συνεργάτης' />
          </form>
        </div>
      </div>
    </div>
  );
}
