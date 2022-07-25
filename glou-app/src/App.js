import './App.css';
import { Route, Routes} from 'react-router-dom';
import FormCreate from './components/formCreate/FormCreate';
import LandingPage from './components/landingPage/LandingPage';
import Dashboard from './components/dashboard/Dashboard';



function App() {
  return (
    <>
    <Routes>
    <Route path='/' element={<LandingPage/>}/>
    <Route exact path="/create" element={<FormCreate/>} />
    <Route exact path='/dashboard' element={<Dashboard/>} />
   </Routes>
    </>
 
  );
}

export default App;
