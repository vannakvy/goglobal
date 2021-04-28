import React, { useState } from "react";
import { Form, FormGroup, Row, Col } from "react-bootstrap";
import DoneeAndDonorTable from "../components/DoneeAndDonorTable";

import db from "../config/db";

const Donee = () => {
  const [userLists, setUserLists] = useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await db
        .collection("user")
        .where("donor", "==", false)
        .get();
      setUserLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);
  return (
    <div className="donee">
      <br />
      <br />
      <br />
      <br />
      <div className="donee_search p-3">
        <Form>
          <FormGroup as={Row}>
            <Form.Label>Search the Name</Form.Label>
            <Col md={3}>
              <Form.Control type="text" placeholder="Search by Name" />
            </Col>
          </FormGroup>
        </Form>
      </div>
      <div className="donee_table">
        <DoneeAndDonorTable userList={userLists} />
      </div>
    </div>
  );
};

export default Donee;
