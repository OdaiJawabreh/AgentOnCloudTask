import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
function MyAppointment() {
  let count = 1;

  const hashToken = localStorage.getItem("token1");
  const [appts, setAppts] = useState("");
  const [message, setMessage] = useState("");
  function getAllAppts() {
    axios
      .get("http://localhost:5000/app/pat", {
        headers: { Authorization: `Bearer ${hashToken}` },
      })
      .then((result) => {
        console.log(result.data.result);
        console.log(typeof(result.data.result[0].statuss));
        setAppts(result.data.result);
      });
  }
  useEffect(() => {
    setMessage("you dont have any appointments till now");
    getAllAppts();
  }, []);
  return (
    <div style={{ padding: "45px" }}>
      {appts ? (
        <div>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>#</th>
                <th style={{ textAlign: "center" }}>Doctor Name</th>
                <th style={{ textAlign: "center" }}>Start Appointment</th>
                <th style={{ textAlign: "center" }}>End Appointment</th>
                <th style={{ textAlign: "center" }}>Scout</th>
                <th style={{ textAlign: "center" }}>Address</th>
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
                        Dr.{elem.firstName}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {elem.start_Datee}
                      </td>
                      <td style={{ textAlign: "center" }}>{elem.end_Date}</td>
                      <td style={{ textAlign: "center" }}>
                        {elem.Doctor_Scout}JD
                      </td>
                      <td style={{ textAlign: "center" }}>{elem.address}</td>
                      <td style={{ textAlign: "center" }}>{elem.mobile}</td>
                      <td style={{ textAlign: "center" }}>
                        {elem.statuss===1 ? (
                          <span style={{ color: "green" }}>approved</span>
                        ) : elem.statuss === 2 ? (
                          <span style={{ color: "red" }}>Rejected</span>
                        ) : (
                          <span>Pending</span>
                        )}
                      </td>
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
  );
}

export default MyAppointment;
