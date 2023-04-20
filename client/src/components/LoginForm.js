import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'


// Actions
import { getUser } from '../redux/actions/userActions'
import { getAlerts } from '../redux/actions/alertActions'

function LoginForm(props) {
  axios.defaults.withCredentials = true

  const dispatch = useDispatch()

  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' })

  const onChange = (e) => {
    e.persist()
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const user = {
      email: loginInfo.email,
      password: loginInfo.password,
    }

    axios.post('api/user/login', user)
      .then((res) => {
        dispatch(getUser())
        dispatch(getAlerts())
        
        props.history.push('/')
      } )
      .catch(err => {
        if(err.response.data.msg) alert(err.response.data.msg);
      })
  }

  return (
    <div className="container w-25">
      <article className="card-body">
        <Link to="/signup" className="float-right btn btn-outline-primary">Sign up</Link>
        <h4 className="card-title mb-4 mt-1">Log in</h4>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
              </div>
              <input name="email" className="form-control" placeholder="Email or login" type="email" onChange={onChange} required />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
              </div>
              <input name="password" className="form-control" placeholder="******" type="password" onChange={onChange} required />
            </div>
          </div>
          <div className="form-group">
            <div className="checkbox">
              <label> <input type="checkbox" /> Save password </label>
            </div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block"> Login  </button>
          </div>
        </form>
      </article>
    </div>
  )
}

export default withRouter(LoginForm)
