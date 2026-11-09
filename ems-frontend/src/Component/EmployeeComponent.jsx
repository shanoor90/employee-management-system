import {useEffect, useState} from 'react'
import { createEmployee, getEmployeeById, updateEmployee } from '../Services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom';
const EmployeeComponent = () => {
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [email,setEmail] = useState('')
  const{id}=useParams();
  const [isLoading, setIsLoading] = useState(Boolean(id))
  const [loadError, setLoadError] = useState('')
  const [errors,setErrors]=useState({
    firstName: '',
    lastName:'',
    email:''
  })
  const [submitError, setSubmitError] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }

    getEmployeeById(id)
      .then(({data}) => {
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
      })
      .catch(error => {
        console.error('Failed to load employee:', error);
        setLoadError('Unable to load this employee. Please check the server and try again.');
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  async function saveEmployee(e){
    e.preventDefault();
    if(!validateForm()){
      return;
    }

    const employee = {firstName, lastName, email};
    setSubmitError('');
    try {
      const response = id
        ? await updateEmployee(id, employee)
        : await createEmployee(employee);
      console.log(response.data);
      navigate('/employees');
    } catch (error) {
      console.error(`Failed to ${id ? 'update' : 'create'} employee:`, error);
      setSubmitError(`Unable to ${id ? 'update' : 'save'} employee. Please check the server and try again.`);
    }
  }
  function validateForm(){
    let valid=true;
    const errorsCopy={...errors}
    if(firstName.trim()){
      errorsCopy.firstName='';
    }else{
      errorsCopy.firstName='First Name is required';
      valid=false;
    }
    if(lastName.trim()){
      errorsCopy.lastName='';
    }else{
      errorsCopy.lastName='Last Name is required';
      valid=false;
    }
    if(email.trim()){
      errorsCopy.email='';
    }else{
      errorsCopy.email='Email is required';
      valid=false;
    }
    setErrors(errorsCopy);
    return valid;
  }
  function pageTitle(){
    if(id){
      return <h2 className='text-center'>Update Employee</h2>
    }else{
      return <h2 className='text-center'>Add Employee</h2>
  }
}

  return (
    <div>
      <div className='container'>
        <br /><br />
        <div className='row'>
          <div className='card col-md-6 offset-md-3 offset-md-3 '>
            {pageTitle()}
            <div className='card-body'>
              {loadError && <div className='alert alert-danger' role='alert'>{loadError}</div>}
              {isLoading && <div role='status'>Loading employee...</div>}
              <form onSubmit={saveEmployee}>
                {submitError && <div className='alert alert-danger' role='alert'>{submitError}</div>}
                <div className='form-group mb-2'>
                  <label className='form-label'>First Name :</label>
                  <input type='text' placeholder='Enter Employee First Name'name='firstName' className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} value={firstName} onChange={(e)=>setFirstName(e.target.value)} disabled={isLoading || Boolean(loadError)} >
                    </input>
                    {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                </div>
                <div className='form-group mb-2'>
                  <label className='form-label'>Last Name :</label>
                  <input type='text' placeholder='Enter Employee Last Name' name='lastName' className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} value={lastName} onChange={(e)=>setLastName(e.target.value)} disabled={isLoading || Boolean(loadError)} >
                    </input>
                    {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                </div>
                     <div className='form-group mb-2'>
                  <label className='form-label'>Email :</label>
                  <input type='text' placeholder='Enter Employee Email' name='email' className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={email} onChange={(e)=>setEmail(e.target.value)} disabled={isLoading || Boolean(loadError)} >
                    </input>
                    {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                </div>
                <button type='submit' className='btn btn-success' disabled={isLoading || Boolean(loadError)}>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeComponent
