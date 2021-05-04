import React from "react";
import { Table, Spinner } from "react-bootstrap";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
const ItemTable = ({ itemLists, onUpdate, onDelete }) => {
  let order = 1;

  return (
    <div className="productTable mt-1">
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <th>លេខរៀង</th>
          <th>ឈ្មោះទំនិញ់</th>
          <th>អែកតា</th>

          <th>សរុបក្នុងស្តុក</th>
          <th>អំពីទំនិញ់</th>
          <th colSpan="2">ផ្សេងៗ</th>
        </thead>
        <tbody>
          {itemLists &&
            itemLists.map((item) => (
              <tr key={item.id}>
                <td>{order++}</td>
                <td>{item.item}</td>
                <td>{item.unit}</td>

                <td>{item.countInStock}</td>
                <td>{item.description}</td>
                <td>
                  <FaEdit
                    className="text-info"
                    onClick={() => onUpdate(item.id)}
                  />{" "}
                  <span>Edit</span>
                </td>
                <td>
                  <FaTrashAlt
                    className="text-danger"
                    onClick={() => onDelete(item.id)}
                  />{" "}
                  <span>Delete</span>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ItemTable;
