import React, { useState } from "react";
import { Container, Form, Col, Button, Modal, Row } from "react-bootstrap";
import Switch from "@material-ui/core/Switch";
import UserTable from "./UserTable";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { FaPlus } from "react-icons/fa";
import {
  addDoneeAndDonor,
  getDoneeAndDonors,
  updateDoneeAndDonor,
  deleteDoneeAndDonor,
} from "../../action/doneeAndDonor";
import { useSelector, useDispatch } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

function AddUser() {
  const [userName, setUserName] = useState("");
  const [donor, setDonor] = useState(false);
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");
  const [company, setCompany] = useState("");
  const [update, setUpdate] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [query, setQuery] = useState({
    donor: true,
    donee: true,
  });
  const dispatch = useDispatch();

  const doneeAndDonorCreate = useSelector((state) => state.doneeAndDonorCreate);
  const { error: createError } = doneeAndDonorCreate;
  const doneeAndDonorUpdate = useSelector((state) => state.doneeAndDonorUpdate);
  const { error: updateError } = doneeAndDonorUpdate;
  const doneeAndDonorDelete = useSelector((state) => state.doneeAndDonorDelete);
  const { error: deleteError } = doneeAndDonorDelete;
  const { loading, error, doneeAndDonorList } = useSelector(
    (state) => state.doneeAndDonorList
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (update) {
      dispatch(
        updateDoneeAndDonor(userName, donor, address, tel, company, updateId)
      );
    }
    dispatch(addDoneeAndDonor(userName, donor, address, tel, company));
    clearInput();
    setLgShow(false);
  };
  const onUpdate = (id) => {
    setLgShow(true);
    const index = doneeAndDonorList.findIndex((el) => el.id === id);
    const data = doneeAndDonorList[index];
    setUserName(data.userName);
    setDonor(data.donor);
    setAddress(data.address);
    setTel(data.tel);
    setCompany(data.company);
    setUpdate(true);
    setUpdateId(data.id);
  };
  const clearInput = () => {
    setDonor("");
    setUserName("");
    setAddress("");
    setTel("");
    setCompany("");
  };

  React.useEffect(() => {
    dispatch(getDoneeAndDonors(query));
  }, [doneeAndDonorCreate, doneeAndDonorUpdate, doneeAndDonorDelete, query]);

  const onDelete = (id) => {
    dispatch(deleteDoneeAndDonor(id));
  };
  return (
    <div className="addUser">
      <div style={{ marginTop: "75px" }}></div>
      <div className="mt-3"></div>
      {createError && <Message variant="danger">{createError}</Message>}
      {deleteError && <Message variant="danger">{deleteError}</Message>}
      {updateError && <Message variant="danger">{updateError}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader wd={40} hg={40} />}

      <Container>
        <Button onClick={() => setLgShow(true)} color="info">
          <FaPlus />
          បញូលទិន្នន័យអ្នកឧបត្ថមនិងអ្នកទទួល
        </Button>
        <div className="query p-2">
          <FormControlLabel
            control={
              <Checkbox
                name="c"
                onChange={() => setQuery({ ...query, donee: !query.donee })}
              />
            }
            label="តែអ្នកទទួលការឧបត្ថម"
            checked={query.donee}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="c"
                onChange={() => setQuery({ ...query, donor: !query.donor })}
              />
            }
            label="តែអ្នកផ្តល់ឧបត្ថម"
            checked={query.donor}
          />
        </div>
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
                      required
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
                      required
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
          userList={doneeAndDonorList}
          onUpdate={onUpdate}
          onDelete={onDelete}
          setLgShow={setLgShow}
        />
      </div>
    </div>
  );
}

export default AddUser;
