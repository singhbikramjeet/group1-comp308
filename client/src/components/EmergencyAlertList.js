import React from 'react'
import Moment from 'moment'

import { useSelector } from 'react-redux'
 
function EmergencyAlertList() {
  const {alerts_loading, alerts} = useSelector(state => state.alert)

  return (
    <>
    {alerts_loading ? 'Loading...':(
      <div className="container">
        <h2>EMERGENCY ALERTS FROM PATIENTS PROFILE</h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>DATE</th>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>ALERT MESSAGE</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map(alert => (
              <tr key={alert._id} className="cursor-pointer">
                <td>{Moment(alert.updatedAt).format('YYYY-MM-DD')}</td>
                <td>{alert.firstName}</td>
                <td>{alert.lastName}</td>
                <td>{alert.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
      
    </>
  )
}

export default EmergencyAlertList
