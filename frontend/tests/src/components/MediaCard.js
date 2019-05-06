import React, { useState } from "react";
import { TextMobileStepper } from "./TextMobileStepper.js";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import SwipeableViews from "react-swipeable-views";

export const MediaCard = props => {
  const mealSteps = props.order.meals.map((meal, i) => ({
    name: meal.name,
    img: `https://email.helloyumi.com/assets/${meal.image_url.match("[^/]+$")}`,
    quantity: meal.quantity,
    description: meal.description
  }));
  return (
    <Card
      style={{
        flex: "1 1 330px",
        margin: "1em",
        maxWidth: "340px"
      }}
    >
      <CardActionArea>
        <CardContent style={{ margin: "auto" }}>
          <Typography gutterBottom variant="h5" component="h4">
            Order {props.id} Summary
            <Typography gutterBottom variant="caption">
              {`Total Meals: ${props.order.meal_count}`}
            </Typography>
            <Typography gutterBottom variant="caption">
              {`Delivery Date: ${props.order.deliveryDate}`}
            </Typography>
          </Typography>
        </CardContent>
      </CardActionArea>
      <SwipeableViews>
        <TextMobileStepper steps={mealSteps} />
      </SwipeableViews>
    </Card>
  );
};

export default MediaCard;
