
import './App.css'
import Register from './Register';
import Login from './Login';
import Concert from './Concert';
import ConcertDetails from './Concertdetails';
import AdminConcerts from './AdminConcerts';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route  path='/register'  element={<Register/>} />
        <Route  path='/login' element={<Login/>}/>
        <Route  path='/concerts'   element={<Concert/>}/>
        <Route  path='/concerts/:id'  element={<ConcertDetails/>}/>
        <Route  path='/admin/concerts'  element={<AdminConcerts/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
