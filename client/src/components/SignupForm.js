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
        <Link to="/login" className="float-right btn btn-outline-primary">Log in</Link>
        <h4 className="card-title mb-4 mt-1">Sign up</h4>
        <form onSubmit={onSubmit}>
            <div className="form-group row">
              <label className="col-form-label col-4">Email</label>
              <input name="email" className="form-control col-8" type="email" onChange={onChange} required />
            </div>
            <div className="form-group row">
              <label className="col-form-label col-4">Password</label>
              <input name="password" className="form-control col-8" type="password" onChange={onChange} required />
            </div>
            <div className="form-group row">
              <label className="col-form-label col-4">First Name</label>
              <input name="firstName" className="form-control col-8" type="text" onChange={onChange} required />
            </div>
            <div className="form-group row">
              <label className="col-form-label col-4">Last Name</label>
              <input name="lastName" className="form-control col-8" type="text" onChange={onChange} required />
            </div>
            <div className="form-group row">
              <label className="col-form-label col-4">Phone</label>
              <input name="phone" className="form-control col-8" type="text" onChange={onChange} required />
            </div>
            <div className="form-group row">
              <label className="col-form-label col-4">Birth</label>
              <input name="birth" className="form-control col-8" type="date" onChange={onChange} required />
            </div>
            <div className="form-group row">
              <label className="col-form-label col-4">Gender</label>
              <select className="form-control col-8" name="gender" value={user.gender} onChange={onChange} required>
                <option key="" value="">Select Gender</option>
                <option key="Female">Female</option>
                <option key="Male">Male</option>
              </select>
            </div>
            <div className="form-group row">
              <label className="col-form-label col-4">Role</label>
              <select className="form-control col-8" name="role" value={user.role} onChange={onChange} required>
                <option key="" value="">Select Role</option>
                <option key="0" value={0}>Patient</option>
                <option key="1" value={1}>Nurse</option>
              </select>
            </div>
          <div className="form-group row">
            <button type="submit" className="btn btn-primary btn-block"> Sign up  </button>
          </div>
        </form>
      </article>
    </div>
  )
}

export default withRouter(SignupForm)
