import * as React from "react";
import Head from "next/head";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import NavBar from "@/components/reservations/navbar";

import Panels from "@/components/reservations/panels";
import SideLogo from "@/components/reservations/side_logo";

export default function HorizontalLinearStepper() {
  const steps = [
    "Elige la sucursal",
    "Elige tu servicio",
    "Dia y hora",
    "Tu informacion",
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
      <Head>
        <title>Citas</title>
        <meta property="og:title" content="Citasss" key="title" />
      </Head>
      <NavBar />
      <main className="pt-10 sm:pt-0 grid grid-cols-12 bg-secondary min-h-screen ">
        <SideLogo />
        <div className=" col-span-12 md:col-span-6  bg-white  shadow-lg  rounded-none  sm:rounded-xl sm:min-h-[640px] w-full    sm:m-2  ">
          <header className="flex items-center p-3 mt-3  justify-between">
            <nav className="flex items-center">
              <IconButton
                aria-label="Retroceder"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
                className=" text-primary"
              >
                <ArrowBackIosNewIcon />
              </IconButton>
              <p className="text-lg font-sans">{steps[activeStep]}</p>
            </nav>
            <Button
              onClick={handleNext}
              disabled={activeStep === steps.length}
              className="text-primary"
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </header>
          <Panels
            activeStep={activeStep}
            steps={steps}
            handleNext={handleNext}
          />

          {/* <p sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</p> */}
        </div>
        <SideLogo />
      </main>
    </>
  );
}
