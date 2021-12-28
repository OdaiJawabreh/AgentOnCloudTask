import React from 'react'
import { useSelector} from "react-redux";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom"
import "./searchresult.css"
function SearchResult() {
    const history = useNavigate()
    const state = useSelector((state) => {
        return {
          searches: state.searches.searches,
        };
      });
    return (
        <div>
             <div className="container">
      <Row xs={1} md={3} className="g-4">
        {state.searches.length &&
          state.searches.map((elem) => {
            return (
              
                <Col key={elem.id}>
                  <Card>
                    <Card.Img className="img" variant="top" src={elem.img} />
                    <Card.Body>
                      <div className="movie-info">
                      
                      <Card.Title style={{ fontSize: "16px" }}>{elem.firstName}</Card.Title>
                        <span> {elem.Doctor_Scout}JD</span>
                      </div>
                      <Card.Title style={{ fontSize: "16px" }}>{elem.major} Doctor</Card.Title>
                      <Button onClick={()=>{ history(`/boocking/${elem.id}`)}}   >More Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
              
            );
          })}
      </Row>
      </div>
        </div>
    )
}

export default SearchResult
