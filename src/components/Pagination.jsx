import React from "react";
import { Button } from "react-bootstrap";
import { BsChevronDoubleRight } from "react-icons/bs";
import { BsChevronDoubleLeft } from "react-icons/bs";
import db from "../config/db";

const Pagination = ({ field, pageSize, collection, first, last, setData }) => {
  const prevPage = () => {
    const fetchData = async () => {
      const data = await db
        .collection(collection) //collection
        .orderBy(field, "asc") //field
        .endBefore(first) //first
        .limit(pageSize)
        .get();
      setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  };
  const nextPage = () => {
    const fetchData = async () => {
      const data = await db
        .collection(collection) //collection
        .orderBy(field, "asc") //field
        .endBefore(last) //first
        .limit(pageSize)
        .get();
      setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  };
  return (
    <div className="text-right mr-2">
      <Button size="sm" variant="info" onClick={prevPage}>
        <BsChevronDoubleLeft />
      </Button>{" "}
      <Button size="sm" variant="info" onClick={nextPage}>
        <BsChevronDoubleRight />
      </Button>
    </div>
  );
};

export default Pagination;
