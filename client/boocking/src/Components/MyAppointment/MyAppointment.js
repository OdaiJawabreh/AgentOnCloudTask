import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiTwotoneEdit } from "react-icons/ai";
import swal from "sweetalert"
import { useNavigate } from "react-router-dom";

function MyAppointment() {
  const history = useNavigate()
  const hashToken = localStorage.getItem("token1");
  const [appts, setAppts] = useState("");
  const [message, setMessage] = useState("");
  function getAllAppts() {
    axios
      .get("http://localhost:5000/app/pat", {
        headers: { Authorization: `Bearer ${hashToken}` },
      })
      .then((result) => {
       
        setAppts(result.data.result);
      });
  }
  function deleteApp(id) {
    axios
      .delete(`http://localhost:5000/app/${id}`, {
        headers: { Authorization: `Bearer ${hashToken}` },
      })
      .then((result) => {
        setAppts(
          appts.filter((elem) => {
            return elem.appointments_id !== id;
          })
        );
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
                <th style={{ textAlign: "center" }}>Action</th>
                <th style={{ textAlign: "center" }}>Action</th>
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
                        {elem.statuss === 1 ? (
                          <span style={{ color: "green" }}>approved</span>
                        ) : elem.statuss === 2 ? (
                          <span style={{ color: "red" }}>Rejected</span>
                        ) : (
                          <span>Pending</span>
                        )}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {elem.statuss === 0 ? (
                          <RiDeleteBin6Line
                            style={{
                              color: "red",
                              fontSize: "20px",
                              cursor: "pointer",
                            }}
                            onClick={() => {

                              deleteApp(elem.appointments_id);
                            }}
                          ></RiDeleteBin6Line>
                        ) : (
                          ""
                        )}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {elem.statuss === 0 ? (
                          <AiTwotoneEdit
                            style={{
                              color: "green",
                              fontSize: "20px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              history(`/MyAppointment3/boockings/${elem.appointments_id}`)
                             
                            }}
                          ></AiTwotoneEdit>
                        ) : (
                          ""
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
