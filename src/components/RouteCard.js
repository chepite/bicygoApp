import { Stack, Typography, Box, SvgIcon, Button, InputAdornment } from "@mui/material";
import { useEffect } from "react";
import { RouteArrow, RouteTraject } from "../img/svg/Icons";
import DriverCard from "./DriverCard";
import { Link } from "react-router-dom";

//routes aren't structured yet, so this card is dummy data that shows how we would show the real data once the routes would be fully developed with TOS
const RouteCard = ({addMinutes, addHours})=>{
    // const date= new Date();
    // const hour= date.getHours();
    // const minutes= date.getMinutes();
    return (
      <Stack
        width="100%"
        height={"auto"}
        direction="column"
        alignItems={"center"}
        overflow="scroll"
      >
        {/* timeline stack */}
        <Stack direction={"row"} width="100%" justifyContent={"space-between"}>
          <Box
            backgroundColor="#FA8794"
            width={"88px"}
            height="40px"
            display={"flex"}
            justifyContent={"center"}
            alignItems="center"
            borderRadius={"8px"}
            marginTop="1rem"
            color="#FFF"
          >
            <Typography fontFamily="Poppins" fontSize={"20px"}>
              00:20
            </Typography>
          </Box>
          <Stack direction="column" alignItems="center">
            <Typography>30min</Typography>
            <img alt="alt" src={require("../img/svg/routeTraject.png")} />
          </Stack>
          <Box
            backgroundColor="#FA8794"
            width={"88px"}
            height="40px"
            display={"flex"}
            justifyContent={"center"}
            alignItems="center"
            marginTop="1rem"
            borderRadius={"8px"}
            color="#FFF"
          >
            <Typography fontFamily="Poppins" fontSize={"20px"}>
              00:50
            </Typography>
          </Box>
        </Stack>
        <Stack
          width={"100%"}
          direction="row"
          justifyContent="space-between"
          marginTop=".25rem"
        >
          <Typography fontFamily={"Poppins"} color="#0F494E">
            Meetpoint 1
          </Typography>
          <Typography fontFamily={"Poppins"} color="#0F494E">
            Meetpoint 2
          </Typography>
        </Stack>
        <Stack direction="column" width="100%" marginTop="1rem">
          <Typography fontFamily="Poppins" color="#B3B3B3">
            drivers
          </Typography>
          <Stack width="100%" direction="row">
            <DriverCard name="Karla"></DriverCard>
            <DriverCard name="Karla"></DriverCard>
          </Stack>
        </Stack>
        <Button
          component={Link}
          to={"/routing"}
          sx={{
            display: "flex",
            marginTop: "2rem",
            backgroundColor: "#126B72",
            color: "#FFF",
            fontFamily: "Poppins",
            fontWeight: "600",
            textTransform: "none",
            borderRadius: "50px",
            width: "212px",
            height: "54px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SvgIcon sx={{ alignItems: "center", display: "flex" }}>
            {RouteArrow}
          </SvgIcon>
          route
        </Button>
      </Stack>
    );
}
export default RouteCard;