import React, {useState,useEffect} from"react";
import axios from "axios";
import { Table } from "react-bootstrap";

function SubimtedAppts() {
  const hashToken = localStorage.getItem("token1");

    const [appts, setAppts] = useState("");
    const [message, setMessage] = useState("");
  function getAppts() {
    axios
      .get("http://localhost:5000/app/sub/doc", {
        headers: { Authorization: `Bearer ${hashToken}` },
      })
      .then((result) => {
        setAppts(result.data.result);
      });
  }
  useEffect(() => {
    setMessage("you dont have any appointments till now");
    getAppts();
  }, [localStorage.getItem("token")]);
  return <div>
<div style={{ padding: "45px" }}>
      {appts ? (
        <div>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>#</th>
                <th style={{ textAlign: "center" }}>patient Name</th>
                <th style={{ textAlign: "center" }}>Start Appointment</th>
                <th style={{ textAlign: "center" }}>End Appointment</th>
                <th style={{ textAlign: "center" }}>Mobile Number</th>
                <th style={{ textAlign: "center" }}>Status</th>
                
              </tr>
            </thead>
            <tbody>
              {appts.map((elem, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td style={{ textAlign: "center" }}>
                        Mr.{elem.firstName}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {elem.start_Datee}
                      </td>
                      <td style={{ textAlign: "center" }}>{elem.end_Date}</td>

                      <td style={{ textAlign: "center" }}>{elem.mobile}</td>
                      <td style={{ textAlign: "center" }}>Approved</td>
                   
                   
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
        </div>
      ) : (
        <div>{message}</div>
      )}
    </div>

  </div>;
}

export default SubimtedAppts;
