import React, { useState } from "react";
import { Container, Form, Col, Button, Modal } from "react-bootstrap";
import Switch from "@material-ui/core/Switch";
import UserTable from "../components/addUser/UserTable";
import db from "../config/db";
import { FaPlus } from "react-icons/fa";
// import Pagination from "../components/Pagination";
import { BsChevronDoubleRight } from "react-icons/bs";
import { BsChevronDoubleLeft } from "react-icons/bs";
import Pagination from "../components/Pagination";

function AddUser() {
  const [userName, setUserName] = useState("");
  const [donor, setDonor] = useState(false);
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");
  const [company, setCompany] = useState("");
  const [userList, setUserList] = useState([]);
  const [id, setId] = useState("");
  const [update, setUpdate] = useState(false);
  const [lgShow, setLgShow] = useState(false);

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
    setLgShow(true);
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
      const data = await db
        .collection("user")
        .orderBy("name", "asc")
        .limit(2)
        .get();
      setUserList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, [userName]);

  // console.log(userList[0].name);

  const onDelete = (id) => {
    db.collection("user").doc(id).delete();
  };

  const prevPage = (first) => {
    const fetchData = async () => {
      const data = await db
        .collection("user")
        .orderBy("name", "asc")
        .endBefore(userList[0].name)
        .limit(2)
        .get();
      setUserList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  };
  const nextPage = (last) => {
    const fetchData = async () => {
      const data = await db
        .collection("user")
        .orderBy("name", "asc")
        .startAfter(userList[userList.length - 1].name)
        .limit(2)
        .get();
      setUserList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  };

  return (
    <div className="addUser">
      <div style={{ marginTop: "75px" }}></div>
      <div className="mt-3"></div>

      <Container>
        <Button onClick={() => setLgShow(true)} color="info">
          <FaPlus />
          បញូលទិន្នន័យអ្នកឧបត្ថមនិងអ្នកទទួល
        </Button>
        <Modal
          style={{ Zindex: "1000", marginTop: "50px", marginLeft: "30px" }}
          size="md"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              បញូលទិន្នន័យអ្នក ឧបត្ថមនិងអ្នកទទួល
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="AddUser_form">
              <Form onSubmit={handleSubmit}>
                <Form.Row>
                  {" "}
                  <Col md={6} sm={12} xs={12} lg={6}>
                    <Form.Control
                      required
                      size="sm"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      type="text"
                      placeholder="username"
                    />
                  </Col>
                  <Col md={6} sm={12} xs={12} lg={6}>
                    <Form.Control
                      size="sm"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      type="text"
                      placeholder="Address"
                    />
                  </Col>
                </Form.Row>
                <Form.Row className="mt-2">
                  <Col md={6} sm={12} xs={12} lg={6}>
                    <Form.Control
                      size="sm"
                      value={tel}
                      onChange={(e) => setTel(e.target.value)}
                      type="text"
                      placeholder="Tel"
                    />
                  </Col>

                  <Col md={6} sm={12} xs={12} lg={6}>
                    <Form.Control
                      size="sm"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      type="text"
                      placeholder="company"
                    />
                  </Col>
                </Form.Row>
                <Form.Row className="mt-2">
                  <Col md={6} sm={12} xs={12} lg={6}>
                    <Switch
                      onChange={() => setDonor(!donor)}
                      checked={donor}
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  </Col>
                  <Col md={6} sm={12} xs={12} lg={6}>
                    <Button type="submit" variant={update ? "success" : "info"}>
                      {update ? "កែប្រែ" : "បញ្ចូលទិន្នន័យ"}
                    </Button>
                    {update ? (
                      <Button
                        className="ml-1"
                        type="button"
                        onClick={() => {
                          clearInput();
                          setUpdate(false);
                        }}
                        variant="warning"
                      >
                        លុបការកែរប្រែ
                      </Button>
                    ) : null}
                  </Col>
                </Form.Row>
              </Form>
            </div>
          </Modal.Body>
        </Modal>
      </Container>
      <div className="Item_talble">
        <UserTable
          userList={userList}
          onUpdate={onUpdate}
          onDelete={onDelete}
          setLgShow={setLgShow}
        />

        <div className="text-right mr-2">
          <Button size="sm" variant="info" onClick={prevPage}>
            <BsChevronDoubleLeft />
          </Button>{" "}
          <Button size="sm" variant="info" onClick={nextPage}>
            <BsChevronDoubleRight />
          </Button>
        </div>
        {/* field, pageSize, collection, first, last, setData */}
        {/* <Pagination
          field="name"
          pageSize={2}
          collection="user"
          // first={userList[0].name}
          // last={userList[userList.length - 1].name}
          setData={setUserList}
        /> */}
      </div>
    </div>
  );
}

export default AddUser;
