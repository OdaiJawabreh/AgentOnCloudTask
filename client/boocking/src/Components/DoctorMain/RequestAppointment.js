import React, { useEffect, useState } from "react";
import "./main.css";
import axios from "axios";
import { Table } from "react-bootstrap";
import { FcApproval } from "react-icons/fc";
import { GiCancel } from "react-icons/gi";
import swal from "sweetalert"
function RequestAppointment() {
  const hashToken = localStorage.getItem("token1");
  const [state, setState] = useState("");
  const [appts, setAppts] = useState("");
  const [message, setMessage] = useState("");
  function getToken() {
    setState(JSON.parse(localStorage.getItem("token")));
  }
  function getAppts() {
    axios
      .get("http://localhost:5000/app/doc", {
        headers: { Authorization: `Bearer ${hashToken}` },
      })
      .then((result) => {
        console.log(result.data.result);
        setAppts(result.data.result);
      });
  }
  function acceptBoocking(id) {
    console.log(typeof id);
    axios
      .put(`http://localhost:5000/app/acc/${id}`)
      .then((result) => {
        setAppts(
          appts.filter((elem) => {
            return elem.appointments_id !== id;
          })
        );
        swal("Good job!", "The Boocking now Approved", "success");
      });
  }
  function rejectBoocking(id) {
    console.log(typeof id);
    axios
      .put(`http://localhost:5000/app/rej/${id}`, {
        headers: { Authorization: `Bearer ${hashToken}` },
      })
      .then((result) => {
        setAppts(
          appts.filter((elem) => {
            return elem.appointments_id !== id;
          })
        );
      
        swal("Good job!", "The Boocking now Rejected", "success");
      });
  }
  useEffect(() => {
    setMessage("you dont have any appointments till now");
    getToken();
    getAppts();
  }, [localStorage.getItem("token")]);
  return (
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
                <th style={{ textAlign: "center" }}>Approved</th>
                <th style={{ textAlign: "center" }}>Rejected</th>
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
                      <td style={{ textAlign: "center" }}>Pending</td>
                      <td style={{ textAlign: "center" }}>
                        <FcApproval
                          style={{
                            color: "red",
                            fontSize: "20px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            acceptBoocking(elem.appointments_id);
                          }}
                        ></FcApproval>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <GiCancel
                          style={{
                            color: "red",
                            fontSize: "20px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            rejectBoocking(elem.appointments_id);
                          }}
                        ></GiCancel>
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

export default RequestAppointment;
