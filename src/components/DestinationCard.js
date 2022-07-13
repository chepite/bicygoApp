import { Typography, Stack } from "@mui/material";
import {SvgIcon} from "@mui/material";
import { useState } from "react";
import { useStore } from "../store";
import { useNavigate } from "react-router-dom";
import { ResultIcon } from "../img/svg/Icons";
const DestinationCard = (address) => {
  const navigate= useNavigate()
    const setStoreHome = useStore(state => state.setHome);
    //console.log(address);

    //test

  //const destinations = useStore((state) => state.destinations);

    return (
      <Stack
        minHeight={"2rem"}
        paddingBottom=".25rem"
        marginBottom="1rem"
        width="90%"
        sx={{ borderBottom: "1px solid #1097A1" }}
        direction="row"
        justifyContent={"space-between"}
        onClick={async () => {
          await setStoreHome({
            lat: address.address.geometry.coordinates[1],
            lon: address.address.geometry.coordinates[0],
          });
          // console.log(address.address.geometry.coordinates);
          // await getFullRoute({
          //   lat: address.address.geometry.coordinates[1],
          //   lon: address.address.geometry.coordinates[0],
          // });
           navigate("/search");
        }}
      >
        <Typography>
          {address.address.properties.address_line1},
          {address.address.properties.city}
        </Typography>
        <SvgIcon sx={{ width: "15px", fill: "#80C7CD"}}>{ResultIcon}</SvgIcon>
      </Stack>
      //   </CardContent>
      // </Card>
    );
}
export default DestinationCard;