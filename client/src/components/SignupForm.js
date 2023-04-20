import './SignupForm.css'
import { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'

function SignupForm(props) {
  axios.defaults.withCredentials = true

  const [user, setUser] = useState({
    _id: '', email: '', password: '', firstName: '', lastName: '', phone: '', birth: '', gender: '', role: ''
  })

  const onChange = (e) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const { _id, ...newUser } = user

    axios.post('api/user', newUser)
      .then(() => props.history.push('/login'))
      .catch(err => {
        if (err.response.data.msg) alert(err.response.data.msg);
      })
  }

  return (
    <div className="container signup-form">
      <article className="card-body">
        <Link to="/login" className="float-right btn btn-outline-primary">LOGIN</Link>
        <h4 className="card-title mb-4 mt-1">SIGN UP</h4>
        <form onSubmit={onSubmit}>
            <div className="form-group row">
              <label className="col-form-label col-4">EMAIL</label>
              <input name="email" placeholder="Enter email" className="form-control col-8" type="email" onChange={onChange} required />
            </div>
            <div className="form-group row">
              <label className="col-form-label col-4">PASSWORD</label>
              <input name="password" placeholder="Enter password" className="form-control col-8" type="password" onChange={onChange} required />
            </div>
            <div className="form-group row">
              <label className="col-form-label col-4">FIRST NAME</label>
              <input name="firstName" placeholder="Enter First Name" className="form-control col-8" type="text" onChange={onChange} required />
            </div>
            <div className="form-group row">
              <label className="col-form-label col-4">LAST NAME</label>
              <input name="lastName" placeholder="Enter Last Name"className="form-control col-8" type="text" onChange={onChange} required />
            </div>
            <div className="form-group row">
              <label className="col-form-label col-4">CONTACT</label>
              <input name="phone" placeholder="Enter Contact Number" className="form-control col-8" type="text" onChange={onChange} required />
            </div>
            <div className="form-group row">
              <label className="col-form-label col-4">DATE OF BIRTH</label>
              <input name="birth" placeholder="Enter DOB" className="form-control col-8" type="date" onChange={onChange} required />
            </div>
            <div className="form-group row">
              <label className="col-form-label col-4">GENDER</label>
              <select className="form-control col-8" name="gender" value={user.gender} onChange={onChange} required>
                <option key="" value="">Select Gender</option>
                <option key="Female">FEMALE</option>
                <option key="Male">MALE</option>
              </select>
            </div>
            <div className="form-group row">
              <label className="col-form-label col-4">ROLE</label>
              <select className="form-control col-8" name="role" value={user.role} onChange={onChange} required>
                <option key="" value="">Select Role</option>
                <option key="0" value={0}>PATIENT</option>
                <option key="1" value={1}>NURSE</option>
              </select>
            </div>
          <div className="form-group row">
            <button type="submit" className="btn btn-primary btn-block">SIGN UP</button>
          </div>
        </form>
      </article>
    </div>
  )
}

export default withRouter(SignupForm)
