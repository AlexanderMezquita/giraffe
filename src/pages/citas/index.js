import * as React from "react";
import Head from "next/head";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import NavBar from "@/components/reservations/navbar";
import Panels from "@/components/reservations/panels";
import SideLogo from "@/components/reservations/side_logo";
import ContactInfo from "@/components/reservations/contact_info";
import { Card } from "@mui/material";

export default function HorizontalLinearStepper() {
  const steps = [
    "Elige la sucursal",
    "Elige tu servicio",
    "Día y hora",
    "Tu información",
    "Confirmación",
  ];

  const [activeStep, setActiveStep] = React.useState(4);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Head>
        <title>Rizos Afros y Más - Citas </title>
        <meta
          property="og:title"
          content="Rizos Afros y Más || Programa tu cita"
          key="title"
        />
        <meta
          property="og:description"
          content="El mejor espacio para cuidar tu pelo rizo o afro"
          key="description"
        />
        <meta property="og:image" content="/brand.png" key="image" />
      </Head>
      <NavBar />
      <main className=" pt-12 sm:pt-16 pb-0 sm:pb-10  flex bg-secondary  justify-center gap-3 lg:px-3 px-0 mx-auto min-h-screen ">
        <SideLogo />
        <Card
          variant="outlined"
          className=" bg-white   rounded-none  sm:rounded-xl sm:min-h-[600px]  w-full sm:w-[600px]   sm:m-2  "
        >
          <header className="flex items-center px-3 pt-6   justify-between">
            <nav className="flex items-center">
              <IconButton
                aria-label="Retroceder"
                disabled={activeStep === 0 || activeStep === 4}
                onClick={handleBack}
                sx={{ mr: 1 }}
                color="primary"
              >
                <ArrowBackIosNewIcon />
              </IconButton>
              <h2>{steps[activeStep]}</h2>
            </nav>
            {/* <Button
              onClick={handleNext}
              disabled={activeStep === steps.length}
              className="text-primary"
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button> */}
          </header>
          <Panels
            activeStep={activeStep}
            steps={steps}
            handleNext={handleNext}
          />

          {/* <p sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</p> */}
        </Card>
        <ContactInfo />
      </main>
    </>
  );
}
