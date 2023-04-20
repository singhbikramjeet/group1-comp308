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
      <h2>Emergency Alert Sender</h2>
      <p>Your alert will automatically be sent to:</p>
      <ul>
        <li>Emergency Health Service</li>
        <li>Your Hospital</li>
      </ul>
      <form onSubmit={sendAlert}>
        <label>Message</label>
        <textarea className="form-control mb-2" rows={5} name="message" onChange={onChange}></textarea>
        <button type="submit" className="btn btn-outline-primary">Send Alert</button>
      </form>
    </div>
  )
}

export default EmergencyAlertForm
