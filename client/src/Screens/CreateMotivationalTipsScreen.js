import React, { useState } from "react";
import { useSelector } from 'react-redux'
import { Form, Button } from "react-bootstrap";
import axios from 'axios';
import Moment from 'moment'

function MotivationalTipsScreen(props) {
  const profile = useSelector(state => state.user.profile)
  const [newMotivationalTips, setNewMotivationalTips] = useState({ patientEmail: '', tip: '' });

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const newRecord = {
      patientEmail: newMotivationalTips.patientEmail,
      tip: newMotivationalTips.tip,
      updatedAt: Moment().format('YYYY-MM-DD'),
      updatedBy: profile._id,
    }
    axios.post('/api/user/newMotivationalTips', newRecord)
      .then(res => props.history.push(res.data), alert("Daily motivational tip is saved"))
      .catch(err => alert(err.response.data.msg))
      setNewMotivationalTips(() => ({
        patientEmail: '', 
        tip: ''
    }));
  };
  
  const handleInputChange = (e) => {
      e.persist();
      setNewMotivationalTips({...newMotivationalTips, [e.target.name]: e.target.value});
    }
  
  return (
    <div className="container">
      <h2>Motivational Tips</h2>
      <Form className="register-form" onSubmit={handleOnSubmit}>
        <Form.Group>
          <Form.Label>Patient Email:</Form.Label>
          <Form.Control
            type="text"
            className="form-control w-25"
            name="patientEmail"
            value={newMotivationalTips.patientEmail}
            required
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Tip:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            className="form-control w-50"
            name="tip"
            value={newMotivationalTips.tip}
            required
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default MotivationalTipsScreen
