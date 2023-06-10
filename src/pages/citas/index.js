import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { QontoConnector, QontoStepIcon } from "@/styles/stepper_component";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import Services from "@/components/reservations/service";
import NavBar from "@/components/reservations/navbar";

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <section
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      hidden={value !== index}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <>{children}</>}
    </section>
  );
}

export default function HorizontalLinearStepper() {
  const steps = [
    "Elige tu servicio",
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
    <>
      <NavBar />
      <main className="pt-10 sm:pt-0 flex bg-secondary justify-center sm:items-center m-auto min-h-screen ">
        <div className=" bg-white  shadow-lg  rounded-xl sm:h-[600px] w-full sm:w-[600px] p-4  sm:m-2  ">
          <header className="flex justify-between">
            <IconButton
              aria-label="Retroceder"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
              className=" text-primary"
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <p>{steps[activeStep]}</p>
            <Button
              onClick={handleNext}
              disabled={activeStep === steps.length - 1}
              className="text-primary"
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </header>
          <Stepper activeStep={activeStep} connector={<QontoConnector />}>
            {steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel StepIconComponent={QontoStepIcon}></StepLabel>
                </Step>
              );
            })}
          </Stepper>

          <TabPanel value={activeStep} index={0}>
            <Services handleNext={handleNext} />
          </TabPanel>
          <TabPanel value={activeStep} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={activeStep} index={2}>
            Item Three
          </TabPanel>
          {/* <p sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</p> */}
        </div>
      </main>
    </>
  );
}
