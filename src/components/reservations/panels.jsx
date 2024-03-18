import Stepper from "@mui/material/Stepper";
import * as React from "react";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Branch from "@/components/reservations/branch";
import Calendar from "@/components/reservations/calendar";
import Form from "@/components/reservations/form";
import { QontoConnector, QontoStepIcon } from "@/styles/stepper-component";
import Services from "@/components/reservations/service";
import { useForm, FormProvider } from "react-hook-form";
import Status from "./status_info";
import Employees from "./employee";
import dayjs from "../globals/date.js";
import { useMutation } from "@tanstack/react-query";
import useAxios from "@/axios";
import { toast } from "react-toastify";
import ConfirmationForm from "./confirmationForm";

function TabPanel(props) {
  const { children, value, index } = props;
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [value]);

  return (
    <fieldset
      id={`fieldset-${index}`}
      hidden={value !== index}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <React.Fragment>{children}</React.Fragment>}
    </fieldset>
  );
}

export default function Panels({ activeStep, steps, handleNext }) {
  const methods = useForm();
  const { axiosInstance } = useAxios();

  function addTimeStringToDate(dateTimeString, timeString) {
    // Parse the input date-time string

    const parsedDateTime = dayjs(dateTimeString);

    // Parse the time string using Day.js
    const parsedTime = dayjs(timeString, "h:mm A");

    // Extract hours and minutes from the parsed time
    const hours = parsedTime.hour();
    const minutes = parsedTime.minute();

    // Set the hours, minutes, and seconds of the target date-time
    return parsedDateTime
      .set("hour", hours)
      .set("minute", minutes)
      .set("second", 0);
  }

  const onSubmit = async (data) => {
    try {
      data.startDate = addTimeStringToDate(data.date, data.time);
      createAppointment.mutate(data);
    } catch (error) {}
  };

  const createAppointment = useMutation({
    mutationFn: (newAppointment) => {
      return axiosInstance.post(`/appointment`, newAppointment);
    },
    onSuccess: () => {
      toast.success("La cita se ha creado con éxito.");
    },
    onError: () => {
      toast.error(
        "Hubo un error creando la cita, vuelve a intentarlo más tarde."
      );
    },
  });

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
          {/* <TabPanel value={activeStep} index={1}>
            <Status />
            <Employees handleNext={handleNext} />
          </TabPanel> */}
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
            <Form isLoading={createAppointment.isLoading} />
          </TabPanel>
          <TabPanel value={activeStep} index={4}>
            <Status />
            <ConfirmationForm />
          </TabPanel>
        </form>
      </FormProvider>
    </React.Fragment>
  );
}
