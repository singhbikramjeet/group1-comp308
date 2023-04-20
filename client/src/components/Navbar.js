import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

// Actions
import { getUser, logout } from '../redux/actions/userActions'
import { getAlerts } from '../redux/actions/alertActions'

function Navbar(props) {

  const dispatch = useDispatch()

  const { profile } = useSelector(state => state.user)
  const alerts = useSelector(state => state.alert.alerts)

  useEffect(() => {
    dispatch(getUser())
    dispatch(getAlerts())
  }, [dispatch])

  const logoutHandler = () => {
    dispatch(logout())
    props.history.push('/login')
  }

  return (
    <>
      <header className="d-flex flex-md-row justify-content-between align-items-center p-3 px-md-4 mb-3 bg-body border-bottom shadow-sm">
        <Link className="h5 my-0 me-md-auto text-dark" to="/">Hospital{profile ? ' - ' + profile.firstName : ''}</Link>
        <div className="d-flex justify-content-between align-items-center">
          <nav className="my-2 my-md-0 me-md-3">
            {profile && profile.role === 1 ? (
              <>
                <Link className="p-2 text-dark" to="/patients">Patients</Link>
                <Link className="p-2 text-dark" to="/createMotivationaltips">Motivational Tips</Link>
              </>
            ) : (
              <>
                <Link className="p-2 text-dark" to="/dailyinfo">Daily Information</Link>
                <Link className="p-2 text-dark" to="/medicalChecklist">Medical Checklist</Link>
                <Link className="p-2 text-dark" to="/getMotivationaltips">Motivational Tips</Link>

              </>
            )}
            <Link className="p-2 text-dark" to="/emergencyalerts">
              Emergency Alerts
              {profile && profile.role === 1 ? <span className="badge rounded-pill bg-danger text-white">{alerts && alerts.length}</span> : ''}
            </Link>
          </nav>
          {profile ? (
            <span className="btn btn-outline-primary ml-2" onClick={logoutHandler}>Log Out</span>
          ) : (
            <Link className="btn btn-outline-primary ml-2" to="/login">Log in</Link>
          )}
        </div>
      </header>
    </>
  )
}

export default withRouter(Navbar)
