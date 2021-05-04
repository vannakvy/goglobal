import React, { useState } from "react";
import db from "../config/db";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "../components/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import LineChart from "../components/LineChart";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory } from "react-router-dom";
import { mainListItems } from "../components/listItems";
import SettingsIcon from "@material-ui/icons/Settings";
import SignUp from "./Signup/SignUp";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";
import Item from "./item/Item";
import AddUser from "./doneeAndDonor/AddUser";
import Donee from "./Donee";
import Donor from "./Donor";
import Donation from "../screens/donation/Donation";
import DonationOut from "./DonationOut";
import { Row, Col, ListGroup } from "react-bootstrap";
import DashboardTable from "../components/DashboardTable";
import UserDetial from "../screens/userDetail/UserDetial";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../action/authAction";

import ContactMailIcon from "@material-ui/icons/ContactMail";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 200,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const [itemList, setItemList] = useState([]);
  const [total, setTotal] = useState([]);
  const [totalDonor, setTotalDonor] = useState(0);
  const [totalDonee, setTotalDonee] = useState(0);
  const [totalItem, setTotalItem] = useState(0);
  const [OutOfStockItem, setOutOfStockItem] = useState(0);
  const history = useHistory();

  const { userInfo } = useSelector((state) => state.userInfo);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await db
        .collection("item")
        .where("countInStock", "!=", 0)
        .get();
      setItemList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await db
        .collection("conclusion")
        .doc("QMfeme9U318gGqYGUNed")
        .get();
      setTotal(data.data().totalCash);
    };
    fetchData();

    db.collection("user")
      .where("donor", "!=", true)
      .get()
      .then(function (querySnapshot) {
        setTotalDonee(querySnapshot.size);
      });
    db.collection("item")
      .get()
      .then(function (querySnapshot) {
        setTotalItem(querySnapshot.size);
      });

    db.collection("user")
      .where("donor", "==", true)
      .get()
      .then(function (querySnapshot) {
        setTotalDonor(querySnapshot.size);
      });
    db.collection("item")
      .where("countInStock", "==", 0)
      .get()
      .then(function (querySnapshot) {
        setOutOfStockItem(querySnapshot.size);
      });
  }, []);

  React.useEffect(() => {
    if (userInfo === null) {
      history.push("/login");
    }
  }, [history, userInfo]);

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          ></Typography>
          <IconButton color="inherit">
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              GO GLOBAL SCHOOL
            </Typography>
          </IconButton>
          <IconButton color="secondary">
            <ExitToAppIcon
              color="secondary"
              onClick={() => dispatch(signout())}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        {/* <List>{secondaryListItems}</List> */}
        <br />
        <List>
          <ListGroup variant="flush">
            <ListGroup.Item className="sidebarList">
              <Link to="/setting">
                <SettingsIcon className="text-primary" />
                <span className="pl-3 ml-3">កែប្រែ</span>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item className="sidebarList">
              <Link to="/signup">
                <ContactMailIcon className="text-danger" />
                <span className="pl-3 ml-3">បង្កើតគណនី</span>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item className="sidebarList">
              <Link to="/signout">
                <ExitToAppIcon className="text-danger" />
                <span className="pl-3 ml-3">ចាកចេញ់</span>
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </List>
      </Drawer>
      <main className={classes.content}>
        <Switch>
          <Route path="/" exact>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              <Row>
                <Col xs={12} md={4} sm={12} lg={4} className="mt-2">
                  <Box
                    title="ចំនួនអ្នកបានឧបត្ថម"
                    data={totalDonor}
                    unit="នាក់"
                    bg="warning"
                  />
                </Col>
                <Col xs={12} md={4} sm={12} lg={4} className="mt-2">
                  <Box
                    title="ចំនួនអ្នកទទួលបានការឧបត្ថម"
                    data={totalDonee}
                    unit="នាក់"
                    bg="info"
                  />
                </Col>
                <Col xs={12} md={4} sm={12} lg={4} className="mt-2">
                  <Box
                    title="ចំនួនទំនិញ់សរុប"
                    data={totalItem}
                    unit="មុខ"
                    bg="success"
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col xs={12} md={8} sm={12} lg={8}>
                  <div className="chart">
                    <LineChart
                      outOfStock={OutOfStockItem}
                      totalDonor={totalDonor}
                      total={total}
                      totalDonee={totalDonee}
                      totalItem={totalItem}
                    />
                  </div>
                </Col>
                <Col xs={12} md={4} sm={12} lg={4}>
                  <Row>
                    <Col xs={12} md={12} sm={12} lg={12}>
                      <Box
                        title="លុយមូលនិធិនៅសល់សរុប"
                        data={total}
                        unit="$"
                        bg="primary"
                      />
                    </Col>
                    <Col xs={12} md={12} sm={12} lg={12} className="my-2">
                      <Box
                        title="ចំនួនទំនិញ់ដែលអស់"
                        data={OutOfStockItem}
                        unit="មុខ"
                        bg="danger"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <div className="dashboardTable">
                <DashboardTable itemList={itemList} />
              </div>
            </Container>
          </Route>
          <Route path="/userdetail/:id" component={UserDetial} />
          <Route path="/item" component={Item} />
          <Route path="/users" component={AddUser} />
          {/* <Route path="/donees" component={Donee} />
          <Route path="/donors" component={Donor} /> */}
          <Route path="/donation" component={Donation} />
          <Route path="/donate" component={Donation} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </main>
    </div>
  );
}
