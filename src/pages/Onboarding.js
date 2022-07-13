import { Stack, Typography } from "@mui/material";
import Skipbutton from "../components/onboarding/SkipButton";
import Stepper from "../components/onboarding/Stepper";
import { useStore } from "../store";
import defaultStyle from "../css/style.css"
import style from "../css/onboarding.css";
import NextButton from "../components/onboarding/NextButton";
import BackButton from "../components/onboarding/Backbutton";
const Onboarding = () => {
    const index= useStore((state)=>state.index)  
    const titles = [
    "Don't want to bike alone at night?",
    "Want to be more social?",
    "Let's find the bikeroutes",
    "Your safety is our priority",
  ];
  const text = [
    "At byciGO we want to provide a safe and social commute for everyone.",
    "This while bringing people together and making their journey home more pleasant.",
    " We have bikeroutes with professionals at night where you can join at the designed meeting points. ",
    " Our app also provides a safe route function that calculates the safest route to your house!",
  ];

  return (
    <>
      <Stack height="100vh" width="100vw">
        <Stack
          width="100%"
          direction={"row"}
          justifyContent={"space-between"}
          height={"5%"}
          alignItems={"center"}
          marginTop="1rem"
        >
          <Stack width="50%" direction={"row"} justifyContent={"left"}>
            {index >= 1 && <BackButton></BackButton>}
          </Stack>
          <Stack width="50%" direction={"row"} justifyContent={"right"}>
            <Skipbutton></Skipbutton>
          </Stack>
        </Stack>
        <Stack
          direction={"column"}
          alignItems={"center"}
          width={"100%"}
          height={"90%"}
          spacing={2}
        >
          {index < 4 && (
            <>
              <img
              className="image__onboarding"
                src={require("../img/onboarding/" + index + ".png")}
                width={"auto"}
                height={"55%"}
                alt={"onboarding"}
              ></img>
              <Stack
              direction={"column"}
              alignItems={"center"}
              >
                <Typography
                  className={"onboarding__title"}
                  width={"90%"}
                  textAlign={"center"}
                  fontSize="20px"
                  fontFamily={"Lato"}
                  fontWeight={900}
                  marginBottom={"1rem"}
                  color={"#45524A"}
                  zIndex={"2"}
                  marginTop={"-1rem"}
                >
                  {titles[index]}
                </Typography>
                <Typography
                  className={"onboarding__text"}
                  width={"90%"}
                  textAlign={"center"}
                  fontFamily={"Poppins"}
                  color={"#535353"}
                >
                  {text[index]}
                </Typography>
              </Stack>
            </>
          )}
          <Stepper></Stepper>
          <NextButton></NextButton>
        </Stack>
      </Stack>
    </>
  );
};
export default Onboarding;
