import { Stack, SvgIcon, Typography } from "@mui/material";
import { ResultIcon } from "../img/svg/Icons";
import { useStore } from "../store";
//the addresses you see when searching in the pinPage
const PinCard = (address) => {
    const setPin = useStore((state) => state.setPin);
  const setDestinations= useStore((state)=> state.setDestinations)
  return (
<Stack
        minHeight={"2rem"}
        paddingBottom=".25rem"
        marginBottom="1rem"
        width="100%"
        sx={{ borderBottom: "1px solid #1097A1" }}
        direction="row"
        justifyContent={"space-between"}
         onClick={() => {
        setPin(address.address);
        console.log("setting pin card", address.address);
        setDestinations([]);
      }}
   >
        <Typography sx={{paddingLeft:"1rem"}}>
          {address.address.properties.address_line1},
          {address.address.properties.city}
        </Typography>
        <SvgIcon sx={{ paddingRight:"1rem", width: "15px", fill: "#80C7CD"}}>{ResultIcon}</SvgIcon>
      </Stack>
  );
};
export default PinCard;