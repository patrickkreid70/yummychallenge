import React, { useState, useEffect } from "react";
import "./App.css";
import { NavBar } from "./components/NavBar.js";
import { MediaCard } from "./components/MediaCard.js";
import Button from "@material-ui/core/Button";
import { Typography, SvgIcon } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import axios from "axios";

function App() {
  const [currentUser, setUser] = useState({});
  const [userID, setUserID] = useState(1);
  const [orders, setOrders] = useState([]);
  const [page, setCurrentPage] = useState(1);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const user = await axios(`http://localhost:8080/`);
      console.log(user.data);
      setUser(user.data[0]);

      const result = await axios(
        `http://localhost:8080/api/v1/orders?user_id=${userID}`
      );
      setOrders(result.data);
    };
    fetchData();
  }, []);

  const Account = () => {
    return (
      <Card
        style={{
          padding: "4em",
          contentAlign: "center",
          margin: "1em",
          maxWidth: "345px"
        }}
      >
        <Typography
          style={{
            fontSize: "1.5em"
          }}
        >
          {currentUser.name}
        </Typography>
        <Typography>{currentUser.email}</Typography>
        <Typography>{currentUser.phone}</Typography>
      </Card>
    );
  };

  const Orders = () =>
    orders.map((order, i) => (
      <MediaCard order={order} key={order.id} id={i + 1} />
    ));

  const Content = () => (page === 0 ? <Account /> : <Orders />);

  return (
    <div>
      <div style={{ margin: "1em" }}>
        <NavBar
          currentUser={currentUser}
          page={page}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          marginLeft: "11em"
        }}
      >
        <Typography variant="h2">
          {loggedIn
            ? page === 0
              ? `Your Account Information`
              : `Your Orders`
            : ""}
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          margin: "2em",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Content />
      </div>
    </div>
  );
}
export default App;
