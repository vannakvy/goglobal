import React, { useState } from "react";
import { Row, Button, Col, Modal, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
// import DonationTable from "../components/DonationTable";
import ModalDonation from "../components/ModalDonation";
// import TaskList from "../components/TaskList";
import db from "../config/db";
import firebase from "firebase";
// import ItemListField from "../components/TaskList";
const DonationOut = () => {
  const [lgShow, setLgShow] = useState(false);
  const [lgShow2, setLgShow2] = useState(false);
  const [userList, setUserList] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [donationList, setDonationList] = useState([]);
  const [data, setData] = useState({
    taskList: [{ index: Math.random(), item: "", qty: "", price: "" }],
    date: "",
    cash: 0,
    userId: "",
  });
  //use Effect get data for user select input field
  React.useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection("user").get();
      setUserList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);
  React.useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection("item").get();
      setItemList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection("donation_out").get();
      setDonationList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, [lgShow]);

  const handleChange = (e) => {
    if (["item", "qty", "price"].includes(e.target.name)) {
      let d = [...data.taskList];
      d[e.target.dataset.id][e.target.name] = e.target.value;
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const addNewRow = () => {
    setData({
      ...data,
      taskList: [
        ...data.taskList,
        {
          index: Math.random(),
          qty: 0,
          price: 0,
          item: "",
        },
      ],
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    var batch = db.batch();
    db.collection("donation_out")
      .add({
        date: new Date(`${data.date}`).toISOString(),
        cash: data.cash,
        userId: data.userId,
        numberOfItem: data.taskList.length,
      })
      .then((doc) => {
        db.collection("conclusion")
          .doc("QMfeme9U318gGqYGUNed")
          .update({
            totaCash: firebase.firestore.FieldValue.increment(-data.cash),
          });
        data.taskList.forEach((d) => {
          db.collection("item")
            .doc(d.item)
            .update({
              countInStock: firebase.firestore.FieldValue.increment(-d.qty),
            });
          var docRef = db.collection("donate_item").doc(); //automatically generate unique id
          batch.set(docRef, { ...d, donationInId: doc.id });
        });
        batch.commit();
      });
    setData({
      taskList: [{ index: Math.random(), item: "", qty: "", price: "" }],
      date: "",
      cash: 0,
      userId: "",
    });
    setLgShow(false);
  };
  const clickOnDelete = (record) => {
    setData({
      taskList: data.taskList.filter((r) => r !== record),
    });
  };

  return (
    <div className="donation">
      <br />
      <br />
      <br />
      <div className="mt-2 p-1">
        <Row>
          <Col md={3}>
            <Button variant="info" onClick={() => setLgShow(true)}>
              <FaPlus />
              <span className="pl-2">បញ្ចូលទិន្នន័យការឧបត្ថម</span>
            </Button>
          </Col>
        </Row>
        <div className="donation_table">
          {/* <DonationTable donationList={donationList} /> */}
        </div>
        <Modal
          style={{ Zindex: "1000", marginTop: "50px", marginLeft: "30px" }}
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              បញ្ចូលទិន្នន័យការឧបត្ថម
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit} onChange={handleChange}>
              <Form.Row>
                <Col xs={12} sm={4} md={3} lg={3}>
                  <Form.Control name="date" id="date" type="date" />
                </Col>
                <Col xs={12} sm={4} md={3} lg={3}>
                  <Form.Control
                    type="number"
                    name="cash"
                    id="cash"
                    placeholder="Cash Amount"
                  />
                </Col>
                <Col xs={12} sm={4} md={6} lg={6}>
                  <Form.Control
                    as="select"
                    custom
                    type="text"
                    name="userId"
                    id="userId"
                  >
                    {userList &&
                      userList.map((user) => (
                        <option value={user.name}>{user.name}</option>
                      ))}
                  </Form.Control>
                </Col>
              </Form.Row>
              <div className="mt-2"></div>

              {/* <TaskList
                add={addNewRow}
                delete={clickOnDelete}
                taskList={data.taskList}
                itemList={itemList}
              /> */}
              <Form.Row>
                {!lgShow ? (
                  <Col md={4}>
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      className="mt-2"
                    >
                      <FaPlus />
                      <span className="pl-2">បញ្ចូលការឧបត្ថម</span>
                    </Button>
                  </Col>
                ) : null}

                <Col md={4}>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    className="mt-2"
                  >
                    <FaPlus />
                    <span className="pl-2">បញ្ចូលទិន្នន័យ</span>
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
      <ModalDonation lgShow={lgShow2} setLgShow={setLgShow2} />

      {/* Modal for Form Field */}
    </div>
  );
};

export default DonationOut;
