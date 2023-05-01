import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import config from "../config/config";

export default function FormDialog({
  handleClose,
  show,
  reportsById,
  setShow,
}) {
  const { register, handleSubmit, getValues } = useForm();
  const [reportedClaims, setReportedClaims] = useState();
  const [settledClaims, setSettledClaims] = useState();
  const [outStanding, setOutStanding] = useState();
  const [dr, setDr] = useState();
  const [aboveThirtyDays, setAboveThirtyDays] = useState();
  const [pending, setPending] = useState();
  const [lksPending, setLksPending] = useState();
  const [nosPending, setNosPending] = useState();
  const [rlmPending, setRlmPending] = useState();

  const updateReport = async () => {
    var data = {
      reportedClaims,
      settledClaims,
      outStanding,
      dr,
      aboveThirtyDays,
      pending,
      lksPending,
      nosPending,
      rlmPending
    }
    await axios
      .put(`${config.apiUrl}/updateReport/${reportsById._id}`, data)
      .then((response) => {
        console.log("updated", response);
      });
  };

  // const submitReport = (data) => {
  //   setShow(false);
    
  //   updateReport();
  //   window.location.reload(false);
  //   console.log("submitReport", data);
  // };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <div className="container">
          <Modal.Header closeButton>
            <Modal.Title>{reportsById.location}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={updateReport}>
              <div className="container">
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="Reported" className="form-label">
                      Reported Claims
                    </label>
                    <input
                      name="reportedClaims"
                      type="number"
                      className="form-control"
                      id="Reported"
                      placeholder="enter your value"
                      onChange={(e) => {
                        setReportedClaims(e.target.value);
                      }}
                      defaultValue={reportsById.reportedClaims}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="Settled" className="form-label">
                      Settled Claims
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="Settled"
                      placeholder="enter your value"
                      onChange={(e) => {
                        setSettledClaims(e.target.value);
                      }}
                      defaultValue={reportsById.settledClaims}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="Outstanding" className="form-label">
                      Outstanding
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="Outstanding"
                      placeholder="enter your value"
                      onChange={(e) => {
                        setOutStanding(e.target.value);
                      }}
                      defaultValue={reportsById.outStanding}
                    />
                  
                  </div>
                  <div className="col">
                    <label htmlFor="DR" className="form-label">
                      DR %
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="DR"
                      placeholder="enter your value"
                      onChange={(e) => {
                        setDr(e.target.value);
                      }}
                      defaultValue={reportsById.dr}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="Above" className="form-label">
                      Above 30 days
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="Above"
                      placeholder="enter your value"
                      onChange={(e) => {
                        setAboveThirtyDays(e.target.value);
                      }}
                      defaultValue={reportsById.aboveThirtyDays}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="Payment" className="form-label">
                      Payment Approved Pending
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="Payment"
                      placeholder="enter your value"
                      onChange={(e) => {
                        setPending(e.target.value);
                      }}
                      defaultValue={reportsById.pending}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="LVS" className="form-label">
                      LVS DONE
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="LVS"
                      placeholder="enter your value"
                      onChange={(e) => {
                        setLksPending(e.target.value);
                      }}
                      defaultValue={reportsById.lksPending}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="NOS" className="form-label">
                      NOS Pending
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="NOS"
                      placeholder="enter your value"
                      onChange={(e) => {
                        setNosPending(e.target.value);
                      }}
                      defaultValue={reportsById.nosPending}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-8">
                    <label htmlFor="RLM" className="form-label">
                      RLM Pending
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="RLM"
                      placeholder="enter your value"
                      onChange={(e) => {
                        setRlmPending(e.target.value);
                      }}
                      defaultValue={reportsById.rlmPending}
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-4">
                    <Button variant="warning" type="submit">
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}
