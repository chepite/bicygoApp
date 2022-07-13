import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useStore } from "../../store";
import { useNavigate } from "react-router-dom";
export default function DotsMobileStepper() {
    const setIndex= useStore((state)=>state.setIndex);
    const index= useStore((state)=>state.index)
  const theme = useTheme();
    const navigate = useNavigate();


  return (
    <MobileStepper
      variant="dots"
      steps={4}
      position="static"
      activeStep={index}
      sx={{ flexGrow: 1, backgroundColor:"var(--bg)"}}
      // nextButton={
      //   //   disabled={index === 3}
      //   <Button size="small" onClick={handleNext} >
      //     Next
      //     {theme.direction === "rtl" ? (
      //       <KeyboardArrowLeft />
      //     ) : (
      //       <KeyboardArrowRight />
      //     )}
      //   </Button>
      // }
      // backButton={
      //   <Button size="small" onClick={handleBack} disabled={index === 0}>
      //     {theme.direction === "rtl" ? (
      //       <KeyboardArrowRight />
      //     ) : (
      //       <KeyboardArrowLeft />
      //     )}
      //     Back
      //   </Button>
      // }
    />
  );
}
