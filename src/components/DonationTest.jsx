import React, { useState } from "react";
import TaskList from "./TaskList";

const Form = () => {
  const [data, setData] = useState({
    taskList: [{ index: Math.random(), item: "", qty: "", price: "" }],
    date: "",
    cash: 0,
    userId: "",
  });

  const handleChange = (e) => {
    if (["item", "qty", "price"].includes(e.target.name)) {
      let d = [...data.taskList];
      d[e.target.dataset.id][e.target.name] = e.target.value;
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
      console.log(data);
    }
  };
  //   addNewRow = () => {
  //     this.setState((prevState) => ({
  //         taskList: [...prevState.taskList, { index: Math.random(), projectName: "", task: "", taskNotes: "", taskStatus: "" }],
  //     }));
  // }
  const addNewRow = () => {
    setData({
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

  //   const deteteRow = (index) => {
  //     setData({
  //       taskList: data.taskList.filter((s, sindex) => index !== sindex),
  //     });
  //   };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };
  const clickOnDelete = (record) => {
    setData({
      taskList: data.taskList.filter((r) => r !== record),
    });
  };

  return (
    <div className="content">
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <div className="row" style={{ marginTop: 20 }}>
          <div className="col-sm-1"></div>
          <div className="col-sm-10">
            <div className="card">
              <div className="card-header text-center">Add Donation</div>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-4">
                    <div className="form-group ">
                      <label className="required">Date</label>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        className="form-control"
                        placeholder="Enter Date"
                      />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group ">
                      <label className="required">Cash</label>
                      <input
                        type="cash"
                        name="cash"
                        id="cash"
                        className="form-control"
                        placeholder="Enter Quantity"
                      />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group ">
                      <label className="required">Donor</label>
                      <input
                        type="text"
                        name="userId"
                        id="userId"
                        className="form-control sm"
                        placeholder="Enter Price"
                      />
                    </div>
                  </div>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th className="required">Item Name</th>
                      <th className="required">Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <TaskList
                      add={addNewRow}
                      delete={clickOnDelete}
                      taskList={data.taskList}
                    />
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="4">
                        <button
                          onClick={addNewRow}
                          type="button"
                          className="btn btn-primary text-center"
                        >
                          Add
                        </button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="card-footer text-center">
                {" "}
                <button type="submit" className="btn btn-primary text-center">
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-1"></div>
        </div>
      </form>
    </div>
  );
};

export default Form;
