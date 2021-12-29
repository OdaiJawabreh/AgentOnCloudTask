import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { FiPhoneCall } from "react-icons/fi";
import axios from "axios";
export default function MainPage() {
    const history = useNavigate()
  const [doctors, setDoctrs] = useState("");
  function gitAllDoctors() {
    axios.get("http://localhost:5000/app/doctors").then((result) => {
        setDoctrs(result.data.result)
    });
  }
  useEffect(() => {
    gitAllDoctors()
}, [])
  return (
       <div className="container" style={{ paddingTop: "45px" }} >
      <Row xs={1} md={3} className="g-4">
        {doctors.length &&
          doctors.map((elem) => {
            return (
              
                <Col key={elem.id}>
                  <Card>
                    <Card.Img className="img" variant="top" src={elem.img} />
                    <Card.Body>
                      <div className="movie-info">
                      
                      <Card.Title style={{ fontSize: "16px" }}>{elem.firstName}</Card.Title>
                        <span>Scout:{elem.Doctor_Scout}JD</span>
                      </div>
                      <Card.Title style={{ fontSize: "20px" }}>{elem.major} Doctor</Card.Title>
                      <Card.Title style={{ fontSize: "12px" }}>{elem.descriptionn} </Card.Title>
                      <Card.Title style={{ fontSize: "15px" }}>Address: {elem.address} </Card.Title>
                      <Card.Title style={{ fontSize: "15px"  }}><FiPhoneCall style={{ fontSize: "15px" , color:"green"}}></FiPhoneCall> {elem.mobile}</Card.Title>

                      <Button variant="outline-success" onClick={()=>{ history(`/boocking/${elem.doctor_id}`)}}   >Boocking Now</Button>
                    </Card.Body>
                  </Card>
                </Col>
              
            );
          })}
      </Row>
      </div>
  )
}
