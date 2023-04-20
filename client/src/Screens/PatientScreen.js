import './PatientScreen.css'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Moment from 'moment'

function PatientScreen() {

  const profile = useSelector(state => state.user.profile)

  const [isOpen, setIsOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState({})
  const [allPatients, setAllPatients] = useState([])
  const [newVitals, setNewVitals] = useState({
    bodyTemperature: 0, heartRate: 0, systolic: 0, diastolic: 0, respiratoryRate: 0
  })

  const onChange = (e) => {
    e.persist();
    setNewVitals({ ...newVitals, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    axios.get('/api/nurse/patients')
      .then(res => setAllPatients([...res.data]))
      .catch(err => alert(err.response.data.msg))
  }, [selectedPatient])

  const onDoubleClickHandler = (patient) => e => {
    e.preventDefault()
    setIsOpen(true)
    setSelectedPatient(patient)
  }

  const addNewRecord = e => {
    e.preventDefault()

    const newRecord = {
      patientId: selectedPatient._id,
      bodyTemperature: newVitals.bodyTemperature,
      heartRate: newVitals.heartRate,
      bloodPressure: {
        systolic: newVitals.systolic,
        diastolic: newVitals.diastolic
      },
      respiratoryRate: newVitals.respiratoryRate,
      updatedBy: profile._id
    }
    e.target.reset();
    axios.post('/api/user/newVitals', newRecord)
      .then(res => setSelectedPatient(res.data))
      .catch(err => alert(err.response.data.msg))
  }

  return (
    <>
      <div className="container">
        <h2>Patients</h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Birth</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {allPatients.map(patient => (
              <tr key={patient._id} className="cursor-pointer" onDoubleClick={onDoubleClickHandler(patient)}>
                <td>{patient.firstName}</td>
                <td>{patient.lastName}</td>
                <td>{Moment(patient.birth).format('YYYY-MM-DD')}</td>
                <td>{patient.gender}</td>
                <td>{patient.email}</td>
                <td>{patient.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isOpen ? (
        <div className="modal-backdrop">
          <div className="modal-content-wrapper">
            <div className="modal-content">
              <div className="modal-header">
                <span>Vital Histories - {selectedPatient.firstName} {selectedPatient.lastName}</span>
                <button onClick={() => setIsOpen(false)}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={addNewRecord}>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th className="align-middle" rowSpan="2">Body Temperature (°C)</th>
                        <th className="align-middle" rowSpan="2">Heart Rate (BPM)</th>
                        <th className="align-middle" colSpan="2">Blood Pressure</th>
                        <th className="align-middle" rowSpan="2">Respiratory Rate (BPM)</th>
                        <th className="align-middle" rowSpan="2">Update At</th>
                      </tr>
                      <tr>
                        <th>Systolic (mmHg)</th>
                        <th>Diastolic (mmHg)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPatient.vitalHistories.map((record, index) => {
                        return (
                          <tr key={index}>
                            <td>{record.bodyTemperature}</td>
                            <td>{record.heartRate}</td>
                            <td>{record.bloodPressure.systolic}</td>
                            <td>{record.bloodPressure.diastolic}</td>
                            <td>{record.respiratoryRate}</td>
                            <td>{Moment(record.updatedAt).format('YYYY-MM-DD')}</td>
                          </tr>
                        )
                      })}
                      <tr key={-1}>
                        <td><input className="form-control" type="number" name="bodyTemperature" onChange={onChange} required /></td>
                        <td><input className="form-control" type="number" name="heartRate" onChange={onChange} required /></td>
                        <td><input className="form-control" type="number" name="systolic" onChange={onChange} required /></td>
                        <td><input className="form-control" type="number" name="diastolic" onChange={onChange} required /></td>
                        <td><input className="form-control" type="number" name="respiratoryRate" onChange={onChange} required /></td>
                        <td><button className="btn btn-outline-primary btn-block" type="submit">New</button></td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default PatientScreen
