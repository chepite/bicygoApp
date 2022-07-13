import * as React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useState } from "react";
import { SvgIcon } from "@mui/material";
import { Puller } from "../img/svg/Icons";
import {Stack} from "@mui/material";
import RouteCard from "./RouteCard";
const drawerBleeding = 125;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor: "#F0F8F9",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#F0F8F9",
}));

function SwipeableEdgeDrawer(props) {
  const { window } = props;
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(80% - ${drawerBleeding}px)`,
            overflow: "visible",
            backgroundColor: "#F0F8F9",
          },
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        color="#000"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          display={"flex"}
          flexDirection="column"
          alignItems={"center"}
          sx={{
            position: "relative",
            top: -drawerBleeding,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            visibility: "visible",
            height: "125px",
            backgroundColor: "#F0F8F9",
            right: 0,
            left: 0,
          }}
        >
          <SvgIcon
            sx={{
              left: "calc(50% - 15px)",
              marginTop: "1rem",
            }}
          >
            {Puller}
          </SvgIcon>
          <Stack
            width="100%"
            marginLeft="2rem"
            sx={{ backgroundColor: "#F0F8F9" }}
          >
            <Typography
              fontFamily={"Poppins"}
              fontSize="22px"
              color="#14656B"
              fontWeight="600"
            >
              upcoming bikes
            </Typography>
            <Stack 
            position={"relative"}
            overflow={"scroll"}
              direction="column"
              justifyContent={"center"}
              padding={1}
              marginTop="1rem"
              sx={{
                backgroundColor: "#FFF",
                width: "90%",
                borderRadius: "16px",
              }}
            >
              <RouteCard></RouteCard>
            </Stack>
          </Stack>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}
export default SwipeableEdgeDrawer;
