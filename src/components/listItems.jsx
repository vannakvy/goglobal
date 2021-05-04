import React from "react";

import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";

import PersonAddIcon from "@material-ui/icons/PersonAdd";
import LayersIcon from "@material-ui/icons/Layers";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { Link } from "react-router-dom";
import "./ListItem.css";

import { ListGroup } from "react-bootstrap";
export const mainListItems = (
  <>
    <ListGroup variant="flush">
      <ListGroup.Item className="sidebarList">
        <a href="/">
          <DashboardIcon color="primary" />
          <span className="pl-3 ml-3">ទិន្នន័យរួម</span>
        </a>
      </ListGroup.Item>
      <ListGroup.Item className="sidebarList">
        <Link to="/item">
          <LayersIcon color="secondary" />
          <span className="pl-3 ml-3">បញ្ចូលអីវ៉ាន់</span>
        </Link>
      </ListGroup.Item>
      <ListGroup.Item className="sidebarList">
        <Link to="/users">
          <PersonAddIcon color="light" />
          <span className="pl-3 ml-3">អ្នកទទួលនិងឧបត្ថម</span>
        </Link>
      </ListGroup.Item>

      <ListGroup.Item className="sidebarList">
        <Link to="/donation">
          <KeyboardArrowLeftIcon className="text-success" />
          <span className="pl-3 ml-3">ការទទួលការឧបត្ថម</span>
        </Link>
      </ListGroup.Item>
      <ListGroup.Item className="sidebarList">
        <Link to="/donate">
          <DoubleArrowIcon className="text-warning" />
          <span className="pl-3 ml-3">ការចែកការឧបត្ថម</span>
        </Link>
      </ListGroup.Item>
    </ListGroup>
  </>
);
