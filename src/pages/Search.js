import SearchBar from "../components/SearchBar";
import { Stack, Typography, SvgIcon } from "@mui/material";
import SavedAddresses from "../components/SavedAddresses";
import DestinationCard from "../components/DestinationCard";
import { useStore } from "../store";
import { Link } from "react-router-dom";
import Map from "../components/Map";
import SwipeableEdgeDrawer from "../components/Drawer";
import { useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CloseIcon } from "../img/svg/Icons";
import GoBackButton from "../components/GoBackButton";
const Search = ()=>{
  const supabase = createClient(
    "https://ofbromqumcvsmqxbrkrn.supabase.co",
    process.env.REACT_APP_SUPABASE_ANON_KEY
  );
  const navigate = useNavigate();
  const session = supabase.auth.session();
  const destinations = useStore((state) => state.destinations);
  const setDestinations = useStore((state) => state.setDestinations);

  const currentPos = useStore((state) => state.currentPos);
  const setCurrentPos = useStore((state) => state.setCurrentPos);
  //opstappunt
  const opstappunt = useStore((state) => state.opstappunt);
  const setOpstappunt = useStore((state) => state.setOpstappunt);
  //route opstap
  const routeToOpstappunt = useStore((state) => state.routeToOpstappunt);
  const setrouteToOpstappunt = useStore((state) => state.setrouteToOpstappunt);
  //afstap
  const afstappunt = useStore((state) => state.afstappunt);
  const setAfstappunt = useStore((state) => state.setAfstappunt);
  //route home
  const routeTohome = useStore((state) => state.routeToHome);
  const setrouteTohome = useStore((state) => state.setrouteHome);
  //home
  const home = useStore((state) => state.home);
  const setHome = useStore((state) => state.setHome);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const avoids = useStore((state) => state.avoids);
  const currentRoute = useStore((state) => state.route);
    const searchbarLoading = useStore((state)=> state.searchbarLoading)

  //cut off last | otherwhise error
  const avoidString = avoids.map((point) => `location:${point.lat},${point.lon}|`).join("").slice(0,-1);

  //test
  const setrouteHome = useStore((state) => state.setrouteHome);
  const setRoutingToHome = useStore((state) => state.setRoutingToHome);
  const setRoutingToOpstap = useStore((state) => state.setRoutingToOpstap);
  //test

  const mounted = useRef(false);
  useEffect(() => {
    const calcRouteOpstap = async (opstappunt) => {
      console.log("closest opstap", opstappunt);
      var requestOptions = {
        method: "GET",
      };
      await fetch(
        `https://api.geoapify.com/v1/routing?waypoints=${currentPos.lat}%2C${currentPos.lon}%7C${opstappunt.lat}%2C${opstappunt.lon}&mode=bicycle&avoid=${avoidString}&apiKey=e12f3c544d264429b2fa1ac95b00744d`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setRoutingToOpstap(result);
          console.log("opstap result", result);

          const reversed = result.features[0].geometry.coordinates[0].map(
            (element) => {
              return (element = [element[1], element[0]]);
            }
          );
          setrouteToOpstappunt(reversed);
        })
        .catch((error) => console.log("error", error));
    };

    const calcRouteafstap = async (afstappunt, home) => {
      var requestOptions = {
        method: "GET",
      };
      //  if (avoidString) {
      //    console.log(avoidString);
      //  }
      await fetch(
        `https://api.geoapify.com/v1/routing?waypoints=${afstappunt.lat}%2C${afstappunt.lon}%7C${home.lat}%2C${home.lon}&mode=bicycle&avoid=${avoidString}&apiKey=e12f3c544d264429b2fa1ac95b00744d`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log("afstap result", result);
          setRoutingToHome(result);

          const reversed = result.features[0].geometry.coordinates[0].map(
            (element) => {
              return (element = [element[1], element[0]]);
            }
          );
          setrouteHome(reversed);
        })
        .catch((error) => console.log("error", error));
    };
    if (home.lat !== 0 && !mounted.current) {
      //switched with currentRoute var
      // const routeKortrijk = [
      //   {
      //     lat: 50.8330398,
      //     lon: 3.2600962,
      //   },
      //   {
      //     lat: 50.8330839,
      //     lon: 3.2598119,
      //   },
      //   {
      //     lat: 50.8320996,
      //     lon: 3.2607668,
      //   },
      //   {
      //     lat: 50.8312865,
      //     lon: 3.2619926,
      //   },
      //   {
      //     lat: 50.8307511,
      //     lon: 3.2631647,
      //   },
      //   {
      //     lat: 50.8299617,
      //     lon: 3.2641812,
      //   },
      // ];
      //      const calcOpstappunt = async (route, afstap) => {

      const calcOpstappunt = async (route) => {
        const closest = route.reduce((a, b) => {
          return Math.hypot(currentPos.lat - b.lat, currentPos.lon - b.lon) <
            //distance between a point and home
            Math.hypot(currentPos.lat - a.lat, currentPos.lon - a.lon)
            ? b
            : a;
            
        });
        if (closest.lat !== 0) {
          setOpstappunt(closest);
        }
        calcRouteOpstap(closest);
      };

      // const calcAfstappunt = async (route, home) => {
      //   const afclosest = route.reduce((a, b) => {
      //     return Math.sqrt(
      //       Math.pow(b.lat - home.lat, 2) - Math.pow(b.lon - home.lon, 2)
      //     ) +
      //       Math.abs(b.lat - home.lat) <
      //       Math.sqrt(
      //         Math.pow(a.lat - home.lat, 2) - Math.pow(a.lon - home.lon, 2)
      //       ) +
      //         Math.abs(a.lat - home.lat)
      //       ? b
      //       : a;
      //   });
      //   console.log("closest afstap", afclosest);
      //   setAfstappunt(afclosest);
      //   calcRouteafstap(afclosest, home);
      // };

      const calcAfstappunt = async (route, home) => {
        const afclosest = route.reduce((a, b) => {
          //distance between b point and home
         
          return Math.hypot(home.lat - b.lat, home.lon - b.lon) <
            //distance between a point and home
            Math.hypot(home.lat - a.lat, home.lon - a.lon)
            ? b
            : a;
            
        });
        console.log("closest afstap", afclosest);
        setAfstappunt(afclosest);
        calcRouteafstap(afclosest, home);
      };


      const getFullRoute = async (home) => {
        if(currentRoute){
          //bereken wat dichste opstappunt is
          await calcOpstappunt(currentRoute[0].waypoints.data);
          //bereken dichtste afstappunt
          await calcAfstappunt(currentRoute[0].waypoints.data, home);
          //route van current pos naar dichtste opstappunt (routing api req);
          //opstappunt naar afstappunt (vaste route)
          //affstappunt naar home (routing api req)
        }
      };
      getFullRoute(home);
      mounted.current = true;
    }
  }, [
    home,
    currentPos,
    setOpstappunt,
    setAfstappunt,
    setRoutingToHome,
    setRoutingToOpstap,
    setrouteHome,
    setrouteToOpstappunt,
  ]);
  //end test

  // const fetch = async () => {
  //   let saved;
  //   await supabase
  //     .from("savedAddresses")
  //     .select()
  //     .eq("user", localStorage.getItem("user_id"))
  //     .then((data) => (saved = data.data));
  //   //setSavedAddresses(saved);
  //   setSavedAddresses(saved);
  // };

  // const hasMounted = useRef(false)

  useEffect(() => {
    // if (hasMounted.current) {
    //   return;
    // }
    // hasMounted.current = true;
    if (currentPos.lat === 0) {
      const showPosition = async (position) => {
        console.log(position.coords);
        await setCurrentPos({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        // console.log(position.coords);
      };
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
      }
    }
    // if(session){
    //   fetch();
    // }
  }, []);

  return (
    <>
      <Stack width={"100vw"} height={"100%"} overflow="hidden">
        <Stack
          sx={{
            zIndex: 5,
            postion: "relative",
            backgroundColor: "#F0F8F9",
          }}
          height={"20%"}
          className="stackSearch"
          spacing={2}
          direction="column"
          alignItems={"center"}
          width={"100%"}
        >
          <Stack
            marginTop={"2rem"}
            direction="row"
            spacing={2}
            alignItems={"center"}
            width={"90%"}
          >
            <SearchBar width={"80%"} />
            <SvgIcon
              sx={{ width: "20%" }}
              onClick={() => {
                setDestinations([]);
                setAfstappunt({ lat: 0, lon: 0 });
                setOpstappunt({ lat: 0, lon: 0 });
                setrouteToOpstappunt([]);
                setrouteTohome([]);
                setHome({ lat: 0, lon: 0 });
                navigate("/");
              }}
            >
              {CloseIcon}
            </SvgIcon>
          </Stack>
        </Stack>
        <Stack>
          {searchbarLoading === false ?
          <Map
            isRouting={false}
            radius={true}
            center={currentPos}
            currentPos={currentPos}
            opstappunt={opstappunt}
            routeToOpstappunt={routeToOpstappunt}
            afstappunt={afstappunt}
            routeTohome={routeTohome}
            home={home}
          ></Map> : <img src={require("../img/loading.gif")}></img>}
        </Stack>
        {home.lat !== 0 && (
          <Stack height={"10%"}>
            <SwipeableEdgeDrawer className="drawer"></SwipeableEdgeDrawer>
          </Stack>
        )}
      </Stack>
    </>
  );
}
export default Search;