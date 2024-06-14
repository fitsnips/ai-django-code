import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddPatient from './components/AddPatient';
import AddClinicals from './components/AddClinicals';
import Home from './components/Home';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addPatient" element={<AddPatient />} />
        <Route path="/addClinicals/:patientId" element={<AddClinicals />} />
      </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={2000} position='bottom-center' />

    </div>
  );
}

export default App;
