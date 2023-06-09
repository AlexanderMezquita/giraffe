import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { QontoConnector, QontoStepIcon } from "@/styles/stepper_component";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import { Fade } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <section
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </section>
  );
}

export default function HorizontalLinearStepper() {
  const steps = [
    "Select campaign settings",
    "Create an ad group",
    "Create an ad",
    "alex",
  ];

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <main className="flex justify-center items-center m-auto min-h-screen ">
      <div className=" bg-white  shadow-lg  rounded-xl h-[600px] w-96 p-4  m-2  ">
        <div className="flex justify-between">
          <IconButton
            aria-label="Retroceder"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
            className=" text-primary"
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <Button
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
        <Stepper activeStep={activeStep} connector={<QontoConnector />}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}></StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <React.Fragment>
          <TabPanel value={activeStep} index={0}>
            Item One
          </TabPanel>

          <TabPanel value={activeStep} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={activeStep} index={2}>
            Item Three
          </TabPanel>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
        </React.Fragment>
      </div>
    </main>
  );
}
