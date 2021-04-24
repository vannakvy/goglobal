import { Edit, SettingsRemote } from "@material-ui/icons";
import React from "react";
import { Table, Spinner } from "react-bootstrap";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
const ItemTable = ({ itemLists, edit, onDelete }) => {
  let order = 1;

  return (
    <div className="productTable mt-1">
      {itemLists.length == 0 ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <th>NO</th>
            <th>ITEM ID</th>
            <th>ITEM NAME</th>
            <th>UNIT</th>
            <th>DESCRIPTION</th>

            <th>COUNTINSTOCK</th>
            <th colSpan="2">ACTION</th>
          </thead>
          <tbody>
            {itemLists &&
              itemLists.map((item) => (
                <tr key={item.id}>
                  <td>{order++}</td>
                  <td>{item.id}</td>
                  <td>{item.item}</td>
                  <td>{item.unit}</td>
                  <td>{item.description}</td>

                  <td>{item.countInStock}</td>
                  <td>
                    <FaEdit
                      className="text-info"
                      onClick={() => edit(item.id)}
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
      )}
    </div>
  );
};

export default ItemTable;
