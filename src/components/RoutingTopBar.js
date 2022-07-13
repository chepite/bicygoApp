import { useEffect, useState } from "react";
import { requirePropFactory, Stack, SvgIcon, Typography } from "@mui/material";

const RoutingTopBar = ({ icon,instruction, currentPos, nextPoint, distanceBetweenPoints }) => {

  return (
    <>
      <Stack
        zIndex={2}
        width="100%"
        height={"96px"}
        position="absolute"
        sx={{ backgroundColor: "#FA8794" }}
        borderRadius="0px 0px 20px 20px"
        color={"white"}
        direction="row"
        alignItems="center"
        justifyContent="space-around"
      >
        <Stack
          sx={{
            backgroundColor: "#FFF",
            borderRadius: "50px",
            width: "80px",
            height: "80px",
            direction: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SvgIcon sx={{ fill: "#FA8794", width: "80px", overflow: "visible" }}>
            {icon}
          </SvgIcon>
        </Stack>
        {instruction !== "" && (
          <Typography
            width="60%"
            fontFamily={"Poppins"}
            fontWeight={500}
            fontSize="18px"
          >
            {instruction}
          </Typography>
        )}
      </Stack>
      {/* {currentPos && (
        <p>
          currentpos:: {currentPos.lat}, {currentPos.lon}
        </p>
      )}

      {nextPoint && (
        <p>
          next point:..
          {nextPoint.lat},{nextPoint.lon}
        </p>
      )}
      {distanceBetweenPoints > 0 ? (
        <p>verschil punten:{distanceBetweenPoints}</p>
      ) : null}
      {/* 
       {time && (
         <p>
           {time}s or {Math.ceil(time / 60)}min
         </p>
       )}
       {distance && (
         <p>
           {distance}m or {distance / 1000}km
         </p>
       )} */}
    </>
  );
};
export default RoutingTopBar;
