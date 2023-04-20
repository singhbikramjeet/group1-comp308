import React, { useState} from "react";
import axios from "axios";
import { Spinner, Jumbotron, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { useSelector } from 'react-redux'


function DailyInfoScreen(props) {

  const profile = useSelector(state => state.user.profile)

  const [dailyInfo, setDailyInfo] = useState({
    bodyTemperature: 0, 
    heartRate: 0, 
    systolic: 0, 
    diastolic: 0, 
    respiratoryRate: 0
  })

    const [showLoading, setShowLoading] = useState(false);

    const apiUrl = "http://localhost:3000/api/user/newVitals";

    const saveDailyInfo = (e) => {
        setShowLoading(true);
        e.preventDefault();

	    const data = {
		  patientId: profile._id,
		  bodyTemperature: dailyInfo.bodyTemperature,
		  heartRate: dailyInfo.heartRate,
		  bloodPressure: {
		  systolic: dailyInfo.systolic,
		  diastolic: dailyInfo.diastolic
		  },
		  respiratoryRate: dailyInfo.respiratoryRate,
		  updatedBy: profile._id
		}
        axios
        .post(apiUrl, data)
        .then((result) => {
            setShowLoading(false);
            alert("Daily information has been saved!");
        }).catch((error)=> setShowLoading(false));
        setDailyInfo(() => ({
            bodyTemperature: 0, 
            heartRate: 0, 
            systolic: 0, 
            diastolic: 0, 
            respiratoryRate: 0
        }));
    };


    const onChange = (e) => {
        e.persist();
        setDailyInfo({ ...dailyInfo, [e.target.name]: e.target.value });
    };


    return (
        <div className="container-fluid col-5 div-right">
            <div className="span12 div-style p-10">
                {showLoading && (
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )}
                {profile ? (
                    <div className="container-fluid margins">
                        <center><h2 className="mb-3">Add Your Daily Information</h2></center>
                        <Jumbotron className="bg-light p-4">
                            <Form onSubmit={saveDailyInfo}>
                                <Form.Group>
                                    <Form.Label>BODY TEMPERATURE(°C)</Form.Label>
                                    <Form.Control
                                    type="number"
                                    name="bodyTemperature"
                                    id="bodyTemperature"
                                    min="1"
                                    step="1"
                                    value={dailyInfo.bodyTemperature}
                                    onChange={onChange}
                                    required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>HEART RATE(BPM)</Form.Label>
                                    <Form.Control
                                    type="text"
                                    name="heartRate"
                                    id="heartRate"
                                    value={dailyInfo.heartRate}
                                    onChange={onChange}
                                    required
                                    />
                                </Form.Group>
                                
                                <Form.Group>
                                    <Form.Label>DIASTOLIC(mmHg)</Form.Label>
                                    <Form.Control
                                    type="number"
                                    name="diastolic"
                                    id="diastolic"
                                    min="1"
                                    step="0.1"
                                    value={dailyInfo.diastolic}
                                    onChange={onChange}
                                    required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>SYSTOLIC(mmHg)</Form.Label>
                                    <Form.Control
                                    type="number"
                                    name="systolic"
                                    id="systolic"
                                    min="1"
                                    step="0.1"
                                    value={dailyInfo.systolic}
                                    onChange={onChange}
                                    required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>RESPIRATORY RATE(BPM)</Form.Label>
                                    <Form.Control
                                    type="number"
                                    name="respiratoryRate"
                                    id="respiratoryRate"
                                    min="1"
                                    step="1"
                                    value={dailyInfo.respiratoryRate}
                                    onChange={onChange}
                                    required
                                    />
                                </Form.Group>
                                
                                <div className="text-center">
                                    <Button variant="outline-primary col-6 mt-3" type="submit">
                                        SAVE
                                    </Button>
                                </div>
                            </Form>
                        </Jumbotron>
                    </div>
                ): ''}
            </div>
        </div>
    );
}

export default withRouter(DailyInfoScreen);