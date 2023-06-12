import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Branch from "@/components/reservations/branch";
import Calendar from "@/components/reservations/calendar";
import Form from "@/components/reservations/form";
import { QontoConnector, QontoStepIcon } from "@/styles/stepper_component";
import Services from "@/components/reservations/service";

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

export default function Panels({ activeStep, steps, handleNext }) {
  return (
    <>
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
        <Form />
      </TabPanel>
    </>
  );
}
