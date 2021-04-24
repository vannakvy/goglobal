import React, { useState } from "react";
import { Container, Form, FormGroup, Row, Col, Button } from "react-bootstrap";
import ItemTable from "../components/ItemTable";
import db from "../config/db";
const Item = () => {
  const [item, setItem] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");
  const [itemList, setItemList] = useState([]);
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (update) {
      db.collection("item").doc(id).update({
        item: item,
        description: description,
        unit: unit,
      });
    } else {
      db.collection("item").add({
        item: item,
        description: description,
        unit: unit,
        countInStock: 0,
      });
    }
    setItem("");
    setUnit("");
    setDescription("");
  };
  const onDelete = (id) => {
    db.collection("item").doc(id).delete();
  };
  React.useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection("item").get();
      setItemList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, [item, onDelete]);
  const edit = (e) => {
    const index = itemList.findIndex((el) => el.id === e);
    setItem(itemList[index].item);
    setDescription(itemList[index].description);
    setUnit(itemList[index].unit);
    setId(itemList[index].id);
    setUpdate(true);
  };
  return (
    <div className="p-2">
      <br />
      <br />
      <br />
      <Container>
        <Form onSubmit={handleSubmit}>
          <FormGroup as={Row}>
            <Form.Label md={1}>Item</Form.Label>
            <Col md={3}>
              <Form.Control
                type="text"
                value={item}
                size="sm"
                placeholder="Enter item"
                onChange={(e) => setItem(e.target.value)}
              />
            </Col>
            <Form.Label md={1}>Unit</Form.Label>
            <Col md={3}>
              <Form.Control
                type="text"
                size="sm"
                placeholder="Enter Unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <Form.Label>Description</Form.Label>
            <Col md={3}>
              <Form.Control
                type="text"
                size="sm"
                value={description}
                placeholder="Enter Item Description..."
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>
            <Col md={3}>
              <Button
                type="submit"
                size="sm"
                variant={update ? "success" : "info"}
              >
                {update ? "Update Item" : "Add Item"}
              </Button>
            </Col>
            {update ? (
              <Button
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
                Cancel
              </Button>
            ) : null}
          </FormGroup>
        </Form>
      </Container>
      <div className="item_table">
        <ItemTable itemLists={itemList} edit={edit} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default Item;
