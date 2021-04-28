import React, { useState } from "react";
import { Container, Form, Col, Button, Modal } from "react-bootstrap";
import ItemTable from "../components/ItemTable";
import db from "../config/db";
const Item = () => {
  const [item, setItem] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");
  const [itemList, setItemList] = useState([]);
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");
  const [lgShow, setLgShow] = useState(false);

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
  }, [item]);
  const edit = (e) => {
    setLgShow(true);
    const index = itemList.findIndex((el) => el.id === e);
    setItem(itemList[index].item);
    setDescription(itemList[index].description);
    setUnit(itemList[index].unit);
    setId(itemList[index].id);
    setUpdate(true);
  };
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
        <ItemTable itemLists={itemList} edit={edit} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default Item;
