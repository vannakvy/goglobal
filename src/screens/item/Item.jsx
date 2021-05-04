import React, { useState } from "react";
import { Container, Form, Col, Button, Modal } from "react-bootstrap";
import ItemTable from "./ItemTable";
import db from "../../config/db";
import { useDispatch, useSelector } from "react-redux";

import {
  addItem,
  getItem,
  updateItem,
  deleteItem,
} from "../../action/itemAction";

const Item = () => {
  const [item, setItem] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");
  const [update, setUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [lgShow, setLgShow] = useState(false);
  const dispatch = useDispatch();

  const itemCreate = useSelector((state) => state.itemCreate);
  const { error: createError } = itemCreate;
  const itemUpdate = useSelector((state) => state.itemUpdate);
  const { error: updateError } = itemUpdate;
  const itemDelete = useSelector((state) => state.itemDelete);
  const { error: deleteError } = itemDelete;
  const { loading, error, itemList } = useSelector((state) => state.itemList);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addItem(item, description, unit));
    if (update) {
      dispatch(updateItem(item, description, unit, updateId));
      setUpdate(false);
    }
    clearInput();
    setLgShow(false);
  };
  const clearInput = () => {
    setItem("");
    setUnit("");
    setDescription("");
  };
  const onDelete = (id) => {
    dispatch(deleteItem(id));
  };

  const onUpdate = (e) => {
    setLgShow(true);
    const index = itemList.findIndex((el) => el.id === e);
    const data = itemList[index];
    setItem(data.item);
    setDescription(data.description);
    setUnit(data.unit);
    setUpdate(true);
    setUpdateId(data.id);
  };
  React.useEffect(() => {
    dispatch(getItem());
  }, [itemCreate, itemDelete, itemUpdate]);

  return (
    <div className="p-2">
      <div className="" style={{ marginTop: "40px" }}></div>
      <br />
      <Button onClick={() => setLgShow(true)}>បញ្ចូលមុខទំនិញ់</Button>
      <Container>
        <Modal
          style={{ Zindex: "1000", marginTop: "50px", marginLeft: "30px" }}
          size="md"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              បញ្ចូលមុខទំនិញ់
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <Form onSubmit={handleSubmit}>
              <Form.Row>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <Form.Control
                    required
                    type="text"
                    value={item}
                    size="sm"
                    placeholder="Enter item"
                    onChange={(e) => setItem(e.target.value)}
                  />
                </Col>

                <Col lg={6} md={6} sm={12} xs={12}>
                  <Form.Control
                    required
                    type="text"
                    size="sm"
                    placeholder="Enter Unit"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  />
                </Col>
              </Form.Row>
              <Form.Row className="mt-2">
                <Col lg={6} md={6} sm={12} xs={12}>
                  <Form.Control
                    required
                    type="text"
                    size="sm"
                    value={description}
                    placeholder="Enter Item Description..."
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <Button
                    type="submit"
                    size="sm"
                    variant={update ? "success" : "info"}
                  >
                    {update ? "កែប្រែ" : "បញ្ចូលមុខទំនិញ់"}
                  </Button>

                  {update ? (
                    <Button
                      className="ml-1"
                      type="button"
                      size="sm"
                      variant="warning"
                      onClick={() => {
                        setUpdate(false);
                        setItem("");
                        setUnit("");
                        setDescription("");
                      }}
                    >
                      លុបការកែរប្រែ
                    </Button>
                  ) : null}
                </Col>
              </Form.Row>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
      <div className="item_table">
        <ItemTable
          itemLists={itemList}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

export default Item;
