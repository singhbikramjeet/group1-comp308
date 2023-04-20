import React from 'react'
import Moment from 'moment'

import { useSelector } from 'react-redux'

function EmergencyAlertList() {
  const {alerts_loading, alerts} = useSelector(state => state.alert)

  return (
    <>
    {alerts_loading ? 'Loading...':(
      <div className="container">
        <h2>Emergency Alerts</h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Date</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Message</th>
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
