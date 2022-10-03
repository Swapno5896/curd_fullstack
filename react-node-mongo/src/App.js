import logo from './logo.svg';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import AddUser from './components/AddUser/AddUser';
import Home from './components/Home/Home';
import UpdateUser from './components/UpdateUser/UpdateUser';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='user/' element={<AddUser />}></Route>
        <Route path='/update/:_id' element={<UpdateUser />}></Route>
      </Routes>
    </div>
  );
}

export default App;
