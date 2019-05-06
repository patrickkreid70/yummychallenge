const express = require("express");
const mysql = require("mysql");
const _ = require("lodash");
const cors = require("cors");
const bodyParser = require("body-parser");
const date = require("date-fns");
const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pattycake",
  database: "yumi_db"
});

connection.connect();

app.listen(8080, () => console.log("listening on 8080"));

const queryPromisified = query =>
  new Promise((resolve, reject) =>
    connection.query(query, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    })
  );

app.use(cors());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  connection.query(`SELECT * FROM users`, function(error, results) {
    if (error) throw error;
    res.send(results);
  });
});
app.get("/api/v1/orders", (req, res) => {
  let orders = [];

  connection.query(
    `SELECT * FROM orders WHERE user_id=${req.query.user_id}`,
    function(error, results) {
      if (error) {
        res.send("User Id is Required");
      }
      if (!results[0]) {
        res.send(`User ${req.query.user_id} does not exist!`);
      }
      results.forEach(({ id, delivery_date }) => {
        const deliveryDate = date.format(new Date(delivery_date), "M/DD/YYYY");
        orders.push({ id, deliveryDate });
      });

      let promises = [];
      let pages = [];

      Promise.all(
        results.map(({ id }) =>
          queryPromisified(
            `SELECT * FROM order_attributes WHERE order_id = ${id}`
          )
        )
      ).then(attr => {
        attr.forEach((mealAr, i) => {
          orders[i].meals = [];
          orders[i].meal_count = _.sumBy(mealAr, "quantity");
          mealAr.forEach((meal, j) => {
            promises.push(
              queryPromisified(
                `SELECT * FROM meals WHERE id = ${meal.meal_id}`
              ).then(mealType => {
                const { name, description, image_url } = mealType[0];
                orders[i].meals[j] = {
                  id: meal.meal_id,
                  quantity: meal.quantity,
                  name: name,
                  description: description,
                  image_url: image_url
                };
              })
            );
          });
        });
        Promise.all(promises).then(() => {
          let finalOrders = orders;

          let sortBy = "" + req.query.sort;

          if (req.query.sort) {
            if ((req.query.sort = "delivery_date")) {
              sortBy = "deliveryDate";
            }
            finalOrders = _.orderBy(
              finalOrders,
              [`${sortBy}`],
              [`${req.query.direction}`]
            );
          }

          if (req.query.delivery_date) {
            finalOrders = finalOrders.filter(
              order => order.deliveryDate === req.query.delivery_date
            );
          }

          if (req.query.page) {
            let per = 4;
            if (req.query.per) {
              per = parseInt(req.query.per);
            }
            console.log(per);
            if (orders.length < per) {
              pages[0] = orders;
            } else {
              orders.forEach((order, index) => {
                if (index % per === 0) {
                  pages.push(orders.slice(index, index + per));
                }
              });
            }
            finalOrders = pages[parseInt(req.query.page) - 1];
          }

          res.send(finalOrders);
        });
      });
    }
  );
});
