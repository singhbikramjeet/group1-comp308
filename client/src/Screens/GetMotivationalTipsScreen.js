import './GetMotivationalTipsScreen.css'
import React from "react";
import { useSelector } from 'react-redux'
import { Form, Button } from "react-bootstrap";

function MotivationalTipsScreen() {
  const profile = useSelector(state => state.user.profile)
  console.log(profile)

  return (
    <div className="container">
      
      {profile ? (
        <>
          {profile.motivationalTips.length === 0 ? 'No Record' : (
            <Form className="register-form" method="get" action="http://youtu.be/c06dTj0v0sM" target="_blank">
              <h2>Motivational Tips</h2>
              <Form.Group>
                <Form.Label>Last updated at:</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control w-25"
                  name="updatedAt"
                  value={profile.motivationalTips[0].updatedAt.substring(0, 10)}
                  readOnly
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Daily tip from nurse:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className="form-control w-50"
                  name="tip"
                  value={profile.motivationalTips[0].tip}
                  readOnly
                />
              </Form.Group>
              <br />
              <Button variant="primary" type="submit" style={{ width: "300px" }}>
                Watch Motivational Video
              </Button>
            </Form>
          )}
        </>
      ): ''}
    </div>
  )
}

export default MotivationalTipsScreen
