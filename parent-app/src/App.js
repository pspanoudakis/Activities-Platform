import { Routes, Route } from "react-router-dom";

import Logobar from './components/Logobar';
import Home from './components/Home';
import Footer from './components/Footer';

function App() {
  return (
    <div class="text-center">
      <Logobar />
      <Routes>
        <Route exact path='/' element={<Home />}/>
      </Routes>
      <br/><br/>
      <Footer />
    </div>
  );
}

export default App;
