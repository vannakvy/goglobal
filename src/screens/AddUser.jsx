import React, { useState } from "react";
import { Container, Form, FormGroup, Row, Col, Button } from "react-bootstrap";
import Switch from "@material-ui/core/Switch";
import UserTable from "../components/UserTable";
import db from "../config/db";
import { computeHeadingLevel } from "@testing-library/dom";
function AddUser() {
  const [userName, setUserName] = useState("");
  const [donor, setDonor] = useState(false);
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");
  const [company, setCompany] = useState("");
  const [userList, setUserList] = useState([]);
  const [id, setId] = useState("");
  const [update, setUpdate] = useState(false);
  //   console.log(userList);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (update) {
      db.collection("user").doc(id).update({
        name: userName,
        donor: donor,
        address: address,
        tel: tel,
        company: company,
      });
      setUpdate(false);
    } else {
      db.collection("user").add({
        name: userName,
        donor: donor,
        address: address,
        tel: tel,
        company: company,
      });
    }

    clearInput();
  };
  const onUpdate = (id) => {
    const index = userList.findIndex((el) => el.id === id);
    const data = userList[index];
    setUserName(data.name);
    setDonor(data.donor);
    setAddress(data.address);
    setTel(data.tel);
    setCompany(data.company);
    setId(data.id);
    setUpdate(true);
  };
  const clearInput = () => {
    setDonor("");
    setUserName("");
    setAddress("");
    setTel("");
    setCompany("");
  };
  React.useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection("user").get();
      setUserList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, [userName, onUpdate]);
  const onDelete = (id) => {
    db.collection("user").doc(id).delete();
  };

  return (
    <div className="addUser">
      <br />
      <br />
      <br />
      <Container>
        <h2>Add Donees and Doner info</h2>
        <div className="AddUser_form">
          <Form onSubmit={handleSubmit}>
            <FormGroup as={Row}>
              <Form.Label md={1}>Username:</Form.Label>
              <Col md={3}>
                <Form.Control
                  size="sm"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  type="text"
                  placeholder="username"
                />
              </Col>
              <Form.Label md={1}>Address:</Form.Label>
              <Col md={3}>
                <Form.Control
                  size="sm"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  placeholder="Address"
                />
              </Col>
              <Form.Label md={1}>Donor:</Form.Label>
              <Col md={3}>
                <Switch
                  onChange={() => setDonor(!donor)}
                  checked={donor}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </Col>
            </FormGroup>
            <FormGroup as={Row}>
              <Form.Label md={1}>Tel:</Form.Label>
              <Col md={3}>
                <Form.Control
                  size="sm"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  type="text"
                  placeholder="Tel"
                />
              </Col>
              <Form.Label md={1}>Company:</Form.Label>
              <Col md={3}>
                <Form.Control
                  size="sm"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  type="text"
                  placeholder="company"
                />
              </Col>
              <Col md={3}>
                <Button type="submit" variant={update ? "warning" : "info"}>
                  {update ? "update" : "Add user"}
                </Button>
                {update ? (
                  <Button
                    className="ml-3"
                    type="button"
                    onClick={() => {
                      clearInput();
                      setUpdate(false);
                    }}
                    variant="warning"
                  >
                    cancel
                  </Button>
                ) : null}
              </Col>
            </FormGroup>
          </Form>
        </div>
      </Container>
      <div className="Item_talble">
        <UserTable
          userList={userList}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}

export default AddUser;
