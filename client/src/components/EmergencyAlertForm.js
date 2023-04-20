import { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

function EmergencyAlertForm() {
  const profile = useSelector(state => state.user.profile)

  const [newAlert, setNewAlert] = useState({ message: '' })

  const onChange = (e) => {
    e.persist();
    setNewAlert({ ...alert, [e.target.name]: e.target.value })
  }

  const sendAlert = (e) => {
    e.preventDefault()

    const requestAlert = {
      patientId: profile._id,
      message: newAlert.message
    }
    axios.post('/api/patient/alert', requestAlert)
      .then(({data}) => {
        alert(data.msg)
      })
      .catch(err => {
        if (err.response && err.response.data.msg) alert(err.response.data.msg);
      })
    e.target.reset();
  }

  return (
    <div className="container">
      <h2>This is an Emergency Alert page.</h2>
      <p>The message you type will be automatically sent to:</p>
      <ul>
        <li>Emergency Service Of Ontario</li>
        <li>The hospital</li>
      </ul>
      <form onSubmit={sendAlert}>
        <label>Alert Message</label>
        <textarea className="form-control mb-2" rows={5} name="message" onChange={onChange}></textarea>
        <button type="submit" className="btn btn-outline-success">Send</button>
      </form>
    </div>
  )
}

export default EmergencyAlertForm
