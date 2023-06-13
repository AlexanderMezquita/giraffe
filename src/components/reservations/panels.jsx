import Stepper from "@mui/material/Stepper";
import * as React from "react";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Branch from "@/components/reservations/branch";
import Calendar from "@/components/reservations/calendar";
import Form from "@/components/reservations/form";
import { QontoConnector, QontoStepIcon } from "@/styles/stepper_component";
import Services from "@/components/reservations/service";
import { useForm, FormProvider } from "react-hook-form";
import Status from "./status_info";

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <section
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      hidden={value !== index}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <React.Fragment>{children}</React.Fragment>}
    </section>
  );
}

export default function Panels({ activeStep, steps, handleNext }) {
  const methods = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));

  return (
    <React.Fragment>
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
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <TabPanel value={activeStep} index={0}>
            <Branch handleNext={handleNext} />
          </TabPanel>
          <TabPanel value={activeStep} index={1}>
            <Status />
            <Services handleNext={handleNext} />
          </TabPanel>
          <TabPanel value={activeStep} index={2}>
            <Status />
            <Calendar handleNext={handleNext} />
          </TabPanel>
          <TabPanel value={activeStep} index={3}>
            <Status />
            <Form />
          </TabPanel>
        </form>
      </FormProvider>
    </React.Fragment>
  );
}
