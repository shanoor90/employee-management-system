import React,{useState} from 'react'
import { createEmployee } from '../Services/EmployeeService'
import { useNavigate } from 'react-router-dom';
const EmployeeComponent = () => {
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [email,setEmail] = useState('')
  const navigate = useNavigate();

  const handlefirstName=(e)=>setFirstName(e.target.value);
  const handlelastName=(e)=>setLastName(e.target.value);
 

  const handleEmail=(e)=>setEmail(e.target.value);

  function saveEmployee(e){
    e.preventDefault();
    const employee = {firstName,lastName,email};
    console.log(employee);
    createEmployee(employee).then((response)=>{
      console.log(response.data);
      navigator('/employees')
    })
  }
  

  return (
    <div>
      <div className='container'>
        <br /><br />
        <div className='row'>
          <div className='card col-md-6 offset-md-3 offset-md-3 '>
            <h2 className='text-center'>Add Employee</h2>
            <div className='card-body'>
              <form>
                <div className='form-group mb-2'>
                  <label className='form-label'>First Name :</label>
                  <input type='text' placeholder='Enter Employee First Name'name='firstName' className='form-control' value={firstName} onChange={(e)=>setFirstName(e.target.value)} >
                    </input>
                </div>
                <div className='form-group mb-2'>
                  <label className='form-label'>Last Name :</label>
                  <input type='text' placeholder='Enter Employee Last Name' name='lastName' className='form-control' value={lastName} onChange={(e)=>setLastName(e.target.value)} >
                    </input>
                </div>
                     <div className='form-group mb-2'>
                  <label className='form-label'>Email :</label>
                  <input type='text' placeholder='Enter Employee Email' name='email' className='form-control' value={email} onChange={(e)=>setEmail(e.target.value)} >
                    </input>
                </div>
                <button className='btn btn-success' onClick={saveEmployee }>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeComponent
