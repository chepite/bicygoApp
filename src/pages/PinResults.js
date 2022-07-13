import { Stack, SvgIcon } from "@mui/material";
import GoBackButton from "../components/GoBackButton";
import { CloseIcon } from "../img/svg/Icons";
import PinCard from "../components/PinCard"
import { useStore } from "../store";
const PinResults = ()=>{
  const destinations = useStore((state)=> state.destinations);
    return (
      <>
        <Stack
          direction="row"
          justifyContent={"center"}
          alignItems={"center"}
          paddingTop="1rem"
          marginBottom="1rem"
        >
          <GoBackButton color={"#FFA97C"}></GoBackButton>
          <SvgIcon
            sx={{ marginRight: "1rem", marginLeft: "1.5rem" }}
            onClick={() => {
            //   setDestinations([]);
            //   setAfstappunt({ lat: 0, lon: 0 });
            //   setOpstappunt({ lat: 0, lon: 0 });
            //   setrouteToOpstappunt([]);
            //   setrouteTohome([]);
            //   setHome({ lat: 0, lon: 0 });
            //   navigate("/");
            }}
          >
            {CloseIcon}
          </SvgIcon>
        </Stack>
        <Stack
          className="destinations"
          direction="column"
          alignItems={"center"}
        >
          {destinations.map((destination) => (
            <PinCard
              key={destination.properties.place_id}
              address={destination}
            ></PinCard>
          ))}
        </Stack>
      </>
    );
}
export default PinResults;