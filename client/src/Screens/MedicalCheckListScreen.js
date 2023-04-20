import React, { useState } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useSelector } from 'react-redux'


function MedicalCheckListScreen() {
    const profile = useSelector(state => state.user.profile)
    
    const [userValues, setValues] = useState({
        age: "",
        sex: "",
        steroid: "",
        antivirals: "",
        fatigue: "",
        malaise: "",
        anorexia: "",
        liver_big: "",
        liver_firm: "",
        spleen_palpable: "",
        spiders: "",
        ascites: "",
        varices: "",
        bilurubin: "",
        alk_phosphate: "",
        sgot: "",
        albumin: "",
        protime: "",
        histology: ""
    });

    const [showLoading, setShowLoading] = useState(false)
    const [data, setData] = useState([])
    const [output, setOutput] = useState(false)
    const apiUrl = "http://localhost:3000/api/patient/result"

    const handleOnSubmit = (event) => {
        setShowLoading(true)
        event.preventDefault()
        // const data = {
        //     age: userValues.age,
        //     sex: userValues.sex,
        //     steroid: userValues.steroid,
        //     antivirals: userValues.antivirals,
        //     fatigue: userValues.fatigue,
        //     malaise: userValues.malaise,
        //     anorexia: userValues.anorexia,
        //     liver_big: userValues.liver_big,
        //     liver_firm: userValues.liver_firm,
        //     spleen_palpable: userValues.spleen_palpable,
        //     spiders: userValues.spiders,
        //     ascites: userValues.ascites,
        //     varices: userValues.varices,
        //     bilurubin: userValues.bilurubin,
        //     alk_phosphate: userValues.alk_phosphate,
        //     sgot: userValues.sgot,
        //     albumin: userValues.albumin,
        //     protime: userValues.protime,
        //     histology: userValues.histology
        // };
        // console.log(data)
        axios
            .post(apiUrl, userValues)
            .then((result) => {
                setShowLoading(false)
                setData(result.data)
                setOutput(true)
            })
            .catch((error) => setShowLoading(false))
    };

    const handleInputChange = (event) => {
        event.persist()
        if (event.target.id === 'male' || event.target.id === 'no') {
            event.target.value = 1
        }
        else if (event.target.id === 'female' || event.target.id === 'yes') {
            event.target.value = 2
        }
        setValues({ ...userValues, [event.target.name]: event.target.value })
    }

    return (
        <div className="container-fluid col-5 div-right">
            <div className="span12 div-style p-10">
                {showLoading && (
                    <Spinner animation="border" role="status">
                        <span className="sr-only"></span>
                    </Spinner>
                )}
                {profile ? (
                    <div className="container-fluid margins">
                        <center><h2 className="mb-3">Use Medical Checklist for Hepatitis</h2></center>                        
                        <Jumbotron className="bg-light p-4">
                            <Form onSubmit={handleOnSubmit}>
                                <Form.Group>
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control className="col-5"
                                        type="number"
                                        name="age"
                                        id="age"
                                        value={userValues.age}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Sex</Form.Label>
                                    <br />
                                    <input className="mr-2"
                                        type="radio"
                                        name="sex"
                                        id="male"
                                        value={userValues.sex}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    Male
                                    <input className="ml-4 mr-2"
                                        type="radio"
                                        name="sex"
                                        id="female"
                                        value={userValues.sex}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    Female
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Steroid Treatment?</Form.Label>
                                    <br />
                                    <input className="mr-2"
                                        type="radio"
                                        name="steroid"
                                        id="yes"
                                        value={userValues.steroid}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    Yes
                                    <input className="ml-4 mr-2"
                                        type="radio"
                                        name="steroid"
                                        id="no"
                                        value={userValues.steroid}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    No
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Antivirals?</Form.Label>
                                    <br />
                                    <input className="mr-2"
                                        type="radio"
                                        name="antivirals"
                                        id="yes"
                                        value={userValues.antivirals}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    Yes
                                    <input className="ml-4 mr-2"
                                        type="radio"
                                        name="antivirals"
                                        id="no"
                                        value={userValues.antivirals}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    No
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Have Fatigue?</Form.Label>
                                    <br />
                                    <input className="mr-2"
                                        type="radio"
                                        name="fatigue"
                                        id="yes"
                                        value={userValues.fatigue}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    Yes
                                    <input className="ml-4 mr-2"
                                        type="radio"
                                        name="fatigue"
                                        id="no"
                                        value={userValues.fatigue}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    No
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Have Malaise?</Form.Label>
                                    <br />
                                    <input className="mr-2"
                                        type="radio"
                                        name="malaise"
                                        id="yes"
                                        value={userValues.malaise}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    Yes
                                    <input className="ml-4 mr-2"
                                        type="radio"
                                        name="malaise"
                                        id="no"
                                        value={userValues.malaise}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    No
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Have Anorexia?</Form.Label>
                                    <br />
                                    <input className="mr-2"
                                        type="radio"
                                        name="anorexia"
                                        id="yes"
                                        value={userValues.anorexia}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    Yes
                                    <input className="ml-4 mr-2"
                                        type="radio"
                                        name="anorexia"
                                        id="no"
                                        value={userValues.anorexia}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    No
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Have Big Liver?</Form.Label>
                                    <br />
                                    <input className="mr-2"
                                        type="radio"
                                        name="liver_big"
                                        id="yes"
                                        value={userValues.liver_big}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    Yes
                                    <input className="ml-4 mr-2"
                                        type="radio"
                                        name="liver_big"
                                        id="no"
                                        value={userValues.liver_big}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    No
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Have Big Firm?</Form.Label>
                                    <br />
                                    <input className="mr-2"
                                        type="radio"
                                        name="liver_firm"
                                        id="yes"
                                        value={userValues.liver_firm}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    Yes
                                    <input className="ml-4 mr-2"
                                        type="radio"
                                        name="liver_firm"
                                        id="no"
                                        value={userValues.liver_firm}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    No
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Spleen palpable?</Form.Label>
                                    <br />
                                    <input className="mr-2"
                                        type="radio"
                                        name="spleen_palpable"
                                        id="yes"
                                        value={userValues.spleen_palpable}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    Yes
                                    <input className="ml-4 mr-2"
                                        type="radio"
                                        name="spleen_palpable"
                                        id="no"
                                        value={userValues.spleen_palpable}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    No
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Have Spiders?</Form.Label>
                                    <br />
                                    <input className="mr-2"
                                        type="radio"
                                        name="spiders"
                                        id="yes"
                                        value={userValues.spiders}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    Yes
                                    <input className="ml-4 mr-2"
                                        type="radio"
                                        name="spiders"
                                        id="no"
                                        value={userValues.spiders}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    No
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Have Ascites?</Form.Label>
                                    <br />
                                    <input className="mr-2"
                                        type="radio"
                                        name="ascites"
                                        id="yes"
                                        value={userValues.ascites}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    Yes
                                    <input className="ml-4 mr-2"
                                        type="radio"
                                        name="ascites"
                                        id="no"
                                        value={userValues.ascites}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    No
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Have Varices?</Form.Label>
                                    <br />
                                    <input className="mr-2"
                                        type="radio"
                                        name="varices"
                                        id="yes"
                                        value={userValues.varices}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    Yes
                                    <input className="ml-4 mr-2"
                                        type="radio"
                                        name="varices"
                                        id="no"
                                        value={userValues.varices}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    No
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Bilurubin</Form.Label>
                                    <Form.Control className="col-5"
                                        type="number"
                                        name="bilurubin"
                                        id="bilurubin"
                                        value={userValues.bilurubin}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Alk Phosphate</Form.Label>
                                    <Form.Control className="col-5"
                                        type="number"
                                        name="alk_phosphate"
                                        id="alk_phosphate"
                                        value={userValues.alk_phosphate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Sgot</Form.Label>
                                    <Form.Control className="col-5"
                                        type="number"
                                        name="sgot"
                                        id="sgot"
                                        value={userValues.sgot}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Albumin</Form.Label>
                                    <Form.Control className="col-5"
                                        type="number"
                                        name="albumin"
                                        id="albumin"
                                        value={userValues.albumin}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Protime</Form.Label>
                                    <Form.Control className="col-5"
                                        type="number"
                                        name="protime"
                                        id="protime"
                                        value={userValues.protime}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Have Histology?</Form.Label>
                                    <br />
                                    <input className="mr-2"
                                        type="radio"
                                        name="histology"
                                        id="yes"
                                        value={userValues.histology}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    Yes
                                    <input className="ml-4 mr-2"
                                        type="radio"
                                        name="histology"
                                        id="no"
                                        value={userValues.histology}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    No
                                </Form.Group>
                                <div className="text-center">
                                    <Button variant="outline-primary col-6 mt-3" type="submit">
                                        Predict
                                    </Button>
                                </div>
                            </Form>
                        </Jumbotron>
                    </div>
                ): ''}
            </div>

            <center>
                {output && !showLoading && (
                    <Table
                        style={{ paddingLeft: "50px", width: "80%" }}
                        striped
                        bordered
                        responsive="lg" >
                        <thead>
                            <tr>
                                <th>Die</th>
                                <th>Live</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-table">
                                <td className="border-table">{data[0]}</td>
                                <td className="border-table">{data[1]}</td>
                            </tr>
                        </tbody>
                        
                    </Table>
                )}
            </center>
            <div className="container-fluid col-10 mb-3">
                <h4>Comment:</h4>
                {data[0] > data[1] &&
                    <p>
                        There's a high probability of hepatitis. Get a consultation with your doctor as soon as possible.
                    </p>
                    ||
                    <p>
                        There's a low probability of hepatitis.
                    </p>
                }
            </div>
        </div>
    )
}
export default MedicalCheckListScreen;