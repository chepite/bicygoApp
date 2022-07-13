import { Stack, SvgIcon } from "@mui/material";
import DestinationCard from "../components/DestinationCard";
import { useEffect } from "react";
import GoBackButton from "../components/GoBackButton";
import SearchBar from "../components/SearchBar";
import { CloseIcon } from "../img/svg/Icons";
import { useStore } from "../store";
import { useNavigate } from "react-router-dom";
const SearchResults =( )=>{
  const navigate= useNavigate();
    const destinations= useStore((state)=> state.destinations);
    const currentPos = useStore((state) => state.currentPos);
      const setHome = useStore((state) => state.setHome);
      const setDestinations = useStore((state) => state.setDestinations);
      const setOpstappunt = useStore((state) => state.setOpstappunt);
      const setrouteToOpstappunt = useStore(
        (state) => state.setrouteToOpstappunt
      );
      const setAfstappunt = useStore((state) => state.setAfstappunt);
      const setrouteTohome = useStore((state) => state.setrouteHome);
    const routeKortrijk = [
      {
        lat: 50.8330398,
        lon: 3.2600962,
      },
      {
        lat: 50.8330839,
        lon: 3.2598119,
      },
      {
        lat: 50.8320996,
        lon: 3.2607668,
      },
      {
        lat: 50.8312865,
        lon: 3.2619926,
      },
      {
        lat: 50.8307511,
        lon: 3.2631647,
      },
      {
        lat: 50.8299617,
        lon: 3.2641812,
      },
    ];
    return (
      <>
        <Stack direction="row" justifyContent={"center"} alignItems={"center"} paddingTop="1rem" 
        marginBottom="1rem">
          <GoBackButton color={"#FFA97C"}></GoBackButton>
          <SearchBar></SearchBar>
          <SvgIcon sx={{marginRight:"1rem", marginLeft:"1.5rem"}} onClick={()=>{
            setDestinations([]);
            setAfstappunt({ lat: 0, lon: 0 });
            setOpstappunt({ lat: 0, lon: 0 });
            setrouteToOpstappunt([]);
            setrouteTohome([]);
            setHome({ lat: 0, lon: 0 });
            navigate("/");
          }}>
            {CloseIcon}
          </SvgIcon>
        </Stack>
        <Stack className="destinations" 
        direction="column" alignItems={"center"}>
          {destinations.map((destination) => (
            <DestinationCard
              route={routeKortrijk}
              center={currentPos}
              key={destination.properties.place_id}
              address={destination}
            ></DestinationCard>
          ))}
        </Stack>
      </>
    );
}
export default SearchResults;