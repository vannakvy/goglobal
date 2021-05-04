import React, { useState } from "react";
import { Row, Button, Col, Modal, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import DonationTable from "./DonationTable";
import TaskList from "./TaskList";
import { useDispatch, useSelector } from "react-redux";
import { addDonation, getDonation } from "../../action/donationAction";
import { getDoneeAndDonors } from "../../action/doneeAndDonor";
import { getItem } from "../../action/itemAction";
import { useHistory } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

const Donation = () => {
  const dispatch = useDispatch();
  const { location } = useHistory();
  const condition = location.pathname.substring(1);
  const [lgShow, setLgShow] = useState(false);

  const [data, setData] = useState({
    taskList: [{ index: Math.random(), item: "", qty: "", price: "" }],
    date: "",
    cash: 0,
    userId: "",
  });
  const { error: itemError, itemList } = useSelector((state) => state.itemList);
  const { error: doneeAndDonorError, doneeAndDonorList } = useSelector(
    (state) => state.doneeAndDonorList
  );

  const donationCreate = useSelector((state) => state.donationCreate);
  const { error } = donationCreate;
  const { donationList, loading } = useSelector((state) => state.donationList);
  React.useEffect(() => {
    let query;
    if (condition === "donation") {
      query = {
        donor: true,
        donee: false,
      };
    } else {
      query = {
        donor: false,
        donee: true,
      };
    }

    dispatch(getDoneeAndDonors(query));
    dispatch(getDonation(condition));
  }, [condition, donationCreate]);

  React.useEffect(() => {
    dispatch(getItem());
  }, []);

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
    let con;
    if (condition === "donation") {
      con = true;
    } else {
      con = false;
    }
    dispatch(addDonation(data, con));

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
      {itemError && <Message variant="danger">{itemError}</Message>}
      {doneeAndDonorError && (
        <Message variant="danger">{doneeAndDonorError}</Message>
      )}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader hg={30} wd={30} />}
      <div className="mt-2 p-1">
        <Row>
          <Col md={3}>
            <Button size="sm" variant="info" onClick={() => setLgShow(true)}>
              <FaPlus />
              <span className="pl-2">
                {condition === "donation"
                  ? "បញ្ចូលការឧបត្ថម"
                  : "បញ្ចូលការចែកឧបត្ថម"}
              </span>
            </Button>
          </Col>
        </Row>
        <div className="donation_table">
          <DonationTable donationList={donationList} />
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
              បញ្ចូលការឧបត្ថម
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit} onChange={handleChange}>
              <Form.Row>
                <Col xs={12} sm={4} md={3} lg={3}>
                  <Form.Control
                    size="sm"
                    name="date"
                    required
                    id="date"
                    type="date"
                  />
                </Col>
                <Col xs={12} sm={4} md={3} lg={3}>
                  <Form.Control
                    size="sm"
                    required
                    type="number"
                    name="cash"
                    id="cash"
                    placeholder="Cash Amount"
                  />
                </Col>
                <Col xs={12} sm={4} md={6} lg={6}>
                  <Form.Control
                    size="sm"
                    required
                    as="select"
                    custom
                    type="text"
                    name="userId"
                    id="userId"
                  >
                    <option selected disabled>
                      រើសអ្នកឧបត្ថម
                    </option>
                    {doneeAndDonorList &&
                      doneeAndDonorList.map((user) => (
                        <option value={user.userName}>{user.userName}</option>
                      ))}
                  </Form.Control>
                </Col>
              </Form.Row>
              <div className="mt-2"></div>

              <TaskList
                add={addNewRow}
                delete={clickOnDelete}
                taskList={data.taskList}
                itemList={itemList}
              />
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
                      <span className="pl-2">Add Donation</span>
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
                    <span className="pl-2">Submit</span>
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </Modal.Body>
        </Modal>
      </div>

      {/* Modal for Form Field */}
    </div>
  );
};

export default Donation;
