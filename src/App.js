import React, { useState, useEffect } from "react";
import { useAPI } from "./contexts/apiContexts";
import axios from "axios";
import config from "./config/config";
import FormDialog from "./components/formDialog";

function App() {
  const [reports, setReports] = useState([]);
  const [show, setShow] = useState(false);
  const [reportsById, setReportsById] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = (id) =>
  {
    setShow(true);

    const getReportsById = async () => {
      await axios.get(`${config.apiUrl}/getReportsById/${id}`).then((response) => {
        console.log("id",response);
        setReportsById(response.data);
      });
    };
    getReportsById();

  }

  useEffect(() => {
    const getAllReports = async () => {
      await axios.get(`${config.apiUrl}/getAllReports`).then((response) => {
        console.log(response);
        setReports(response.data);
      });
    };
    getAllReports();
  }, []);

  return (
    <>
    <div className="container">
      <table className="table table-bordered table-striped">
        <thead class="table-light">
          <tr>
            <th scope="col">Location</th>
            <th scope="col">Reported Claims</th>
            <th scope="col">Settled Claims</th>
            <th scope="col">Outstanding</th>
            <th scope="col">DR %</th>
            <th scope="col">Above 30 days</th>
            <th scope="col">Payment Approved Pending</th>
            <th scope="col">LVS DONE</th>
            <th scope="col">NOS Pending</th>
            <th scope="col">RLM Pending</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.length > 0 &&
            reports.map((report) => {
              return (
                <tr key={report._id}>
                  <td>{report.location}</td>
                  <td>{report.reportedClaims}</td>
                  <td>{report.settledClaims}</td>
                  <td>{report.outStanding}</td>
                  <td>{report.dr}</td>
                  <td>{report.aboveThirtyDays}</td>
                  <td>{report.pending}</td>
                  <td>{report.lksPending}</td>
                  <td>{report.nosPending}</td>
                  <td>{report.rlmPending}</td>
                  <td>
                  <button type="button" className="btn btn-primary" onClick={() => handleShow(report._id)}>Edit</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

       {/* Form Modal dialog */}
     <FormDialog handleClose={handleClose} setShow={setShow} show={show} reportsById={reportsById} />
    </div>
     </>
  );
}

export default App;
