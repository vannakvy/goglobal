import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa";
const TaskList = (props) => {
  return props.taskList.map((val, idx) => {
    let item = `item-${idx}`,
      price = `price-${idx}`,
      qty = `qty-${idx}`;
    return (
      <Form.Row className="mt-2">
        <Col xs={12} sm={4} md={5} lg={5}>
          <Form.Control
            as="select"
            name="item"
            id={item}
            data-id={idx}
            custom
            size="sm"
          >
            {props.itemList &&
              props.itemList.map((item) => (
                <option value={item.id}>{item.item}</option>
              ))}
          </Form.Control>
        </Col>
        <Col xs={12} sm={4} md={3} lg={3}>
          <Form.Control
            size="sm"
            type="number"
            name="qty"
            data-id={idx}
            id={qty}
            placeholder="Enter Qty"
          />
        </Col>
        <Col xs={12} sm={4} md={3} lg={3}>
          <Form.Control
            size="sm"
            type="number"
            name="price"
            id={price}
            data-id={idx}
            placeholder="Enter Price"
          />
        </Col>

        <Col xs={12} sm={4} md={1} lg={1}>
          {idx === 0 ? (
            <Button
              onClick={() => props.add()}
              type="button"
              className="btn-sm btn-primary text-center"
            >
              <FaPlus color="success" />
            </Button>
          ) : (
            <Button
              className="btn-sm btn-danger"
              onClick={() => props.delete(val)}
            >
              <FaMinus color="danger" />
            </Button>
          )}
        </Col>
      </Form.Row>
    );
  });
};
export default TaskList;
