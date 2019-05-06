import React, { useState } from "react";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const rt = {
  maxWidth: 400,
  flexGrow: 1
};
const header = {
  display: "flex",
  alignItems: "center",
  height: 50
};
const img = {
  height: 150,
  maxWidth: 120,
  overflow: "hidden",
  display: "flex",
  width: "100%",
  margin: "2em",
  contentAlign: "center",
  justifyContent: "center",
  transition: "all 2s"
};

export const TextMobileStepper = props => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const maxSteps = props.steps.length;

  return (
    <div style={rt}>
      <div
        style={{
          display: "flex",
          contentAlign: "center",
          justifyContent: "center",
          padding: "none"
        }}
      >
        <img
          style={img}
          src={props.steps[activeStep].img}
          alt={props.steps[activeStep].name}
        />
      </div>
      <Paper
        style={{
          display: "flex",
          flexWrap: "wrap",
          margin: "2em",
          alignItems: "center",
          justifyContent: "center"
        }}
        square
        elevation={0}
      >
        <Typography gutterBottom variant="h6">
          {props.steps[activeStep].name}
          <Typography gutterBottom variant="caption">
            {props.steps[activeStep].description}
          </Typography>
          <Typography gutterBottom variant="caption">
            Quantity: {props.steps[activeStep].quantity}
          </Typography>
        </Typography>
      </Paper>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={() => handleNext()}
            disabled={activeStep === maxSteps - 1}
          >
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={() => handleBack()}
            disabled={activeStep === 0}
          >
            <KeyboardArrowLeft />
          </Button>
        }
      />
    </div>
  );
};

export default TextMobileStepper;
