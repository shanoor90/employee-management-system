

import './App.css'
import FooterComponent from './Component/FooterComponent'
import HeaderComponent from './Component/HeaderComponenet'
import ListEmployeeComponent from './Component/ListEmployeeComponent'
import EmployeeComponent from './Component/EmployeeComponent'
import {BrowserRouter,Route,Routes } from  'react-router-dom'
function App() {
 

  return (
    <>
    <BrowserRouter>
    <HeaderComponent/>
    <Routes>  
     {/* // http://localhost:3000 */}
    <Route path='/' element={<ListEmployeeComponent/>}></Route>
      {/* // http://localhost:3000/employees */}
    <Route path='/employees' element={<ListEmployeeComponent/>}></Route>
      {/* //http://localhost:3000/add-employee */}
    <Route path='/add-employee' element={<EmployeeComponent/>}></Route>
       </Routes>
      <FooterComponent/>
    </BrowserRouter>
    </>
    
  )
}

export default App
