import React, { useState } from 'react'
import Header from './components/Header.js';
import Managerfrontpage from './components/Managerfrontpage.js';
import Footer from './components/Footer.js';
import Errorpage from './components/Errorpage.js';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Frontpage from './components/Frontpage';
import TempRestManagerList from './components/TempRestManagerList';
import ManagerAccountPage from './components/ManagerAccountPage';
import Registerpage from './components/Registerpage';
import Loginpage from './components/Loginpage';
import Payload from './components/Payload.js';

const jwtFromLocalStorage = window.localStorage.getItem('localStorageJWT');


function App() {

  const [userJWT, setUserJWT] = useState(jwtFromLocalStorage);


    //routes which are accessable only when user is not logged in
    let accessableRoutes = <>
      <Route path="/registerpage"element={<Registerpage />}/>  
      <Route path="/loginpage"element={<Loginpage login={ newJWToken => {
        setUserJWT(newJWToken)
      window.localStorage.setItem('localStorageJWT', newJWToken)
      }
      }/>}/>  
    </>

    //these routes are accessable only when user is logged in
    if (userJWT != null) {
      accessableRoutes =
    <>
    <Route path="/restmanagerlist" element={<TempRestManagerList/>}/>
    <Route path="/payload" element={<Payload jwt={userJWT} />}/>
    </>
    }




  return (
    <div >


<Header userLoggedIn={userJWT != null} logout={()=> {
  setUserJWT(null)
  window.localStorage.removeItem('localStorageJWT');
}}/>

<Router>
      <div style={{ display:"flex", justifyContent: "space-around" }}>

      <Link to='/payload'>Payload</Link> 
        {/* <Link to='/restmanagerlist'>Restaurant manager list</Link> 
        <Link to='/registerpage'>Register page</Link>
        <Link to='/loginpage'>Login page</Link>
         <Link to='/restaurantaccountpage'>Restaurant account page</Link>
        <Link to='/managerorderhistorypage'>Manager Order History</Link>
        <Link to='/searchresultpage'>Search Result Page</Link>
        <Link to='/foodcategoriespage'>Food Categories Page</Link>
        <Link to='/restaurantinfopage'>Restaurant Info Page</Link> */}
        
        
      </div>      
    <Routes>
    <Route path="/" element={<Frontpage userLoggedIn={userJWT != null}/>}/>
    <Route path="/managerfrontpage" element={<Managerfrontpage/>}/>
      <Route path="/*" element={<Errorpage/>}/>
      
      <Route path="/manageraccpage" element={<ManagerAccountPage/>}/>
      <Route path="manageraccpage/:params" element={<ManagerAccountPage/>}/>
      {accessableRoutes}

      
    </Routes>

   </Router>
    
      <Footer/>
    </div>
  );
}

export default App;
