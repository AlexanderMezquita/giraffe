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
import Branch from "@/components/reservations/branch";
import Calendar from "@/components/reservations/calendar";

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
    "Elige la sucursal",
    "Elige tu servicio",
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
        <div className=" bg-white  shadow-lg overflow-y-auto  rounded-xl md:h-[640px] w-full md:w-[600px]   sm:m-2  ">
          <header className="flex items-center p-3 mt-3  justify-between">
            <div className="flex items-center">
              <IconButton
                aria-label="Retroceder"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
                className=" text-primary"
              >
                <ArrowBackIosNewIcon />
              </IconButton>
              <p className="text-lg">{steps[activeStep]}</p>
            </div>
            <Button
              onClick={handleNext}
              disabled={activeStep === steps.length - 1}
              className="text-primary"
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </header>
          <Stepper
            activeStep={activeStep}
            connector={<QontoConnector />}
            className="px-3"
          >
            {steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel StepIconComponent={QontoStepIcon}></StepLabel>
                </Step>
              );
            })}
          </Stepper>

          <TabPanel value={activeStep} index={0}>
            <Branch />
          </TabPanel>
          <TabPanel value={activeStep} index={1}>
            <Services handleNext={handleNext} />
          </TabPanel>
          <TabPanel value={activeStep} index={2}>
            <Calendar />
          </TabPanel>
          <TabPanel value={activeStep} index={3}>
            Item Three
          </TabPanel>
          {/* <p sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</p> */}
        </div>
      </main>
    </>
  );
}
