import { Typography, Stack, Avatar, Box, SvgIcon } from "@mui/material";
import SavedAddresses from "../components/SavedAddresses";
import SearchBarNavigate from "../components/SearchBarNavigate";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { useStore } from "../store";
import { ProfileIcon } from "../img/svg/Icons";
import { useQuery } from "react-query";

const Home = () => {
  const navigate = useNavigate();
  const supabase = createClient(
    "https://ofbromqumcvsmqxbrkrn.supabase.co",
    process.env.REACT_APP_SUPABASE_ANON_KEY
  );
  const session = supabase.auth.session();

  // useEffect(()=>{
  //   if(!session){
  //     navigate("/login")
  //   }
  // },[])
  const name = localStorage.getItem("name");

  const currentPos = useStore((state) => state.currentPos);
  const setCurrentPos = useStore((state) => state.setCurrentPos);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const setStoreSavedAddrsses= useStore((state)=> state.setSavedAddresses);
  const setAvoids = useStore((state)=>state.setAvoids);
  const avoids = useStore((state)=> state.avoids)
  const setRoute = useStore((state)=> state.setRoute);
  const currentRoute = useStore((state)=> state.route)
  // const fetch = async () => {
  //   let saved;
  //   await supabase
  //     .from("savedAddresses")
  //     .select()
  //     .eq("user", localStorage.getItem("user_id"))
  //     .then((data) => (saved = data.data));
  //   setSavedAddresses(saved);
  //   setStoreSavedAddrsses(saved);
  // };

  // useEffect(() => {
  //   if (session) {
  //     fetch();
  //   }
  // }, []);
    const { isLoading, error, data } = useQuery("savedAddresses", async () => {
      if (session) {
        const saved = await supabase
          .from("savedAddresses")
          .select()
          .eq("user", localStorage.getItem("user_id"));
        //console.log(saved.data);
        setSavedAddresses(saved.data);
      }
    });
     const { isLoadingavoid, erroravoid, avoidPoints } = useQuery("avoidPoints", async () => {
      //prevent fetching over and over again when going back to home screen
        if(avoids && avoids.length === 0){
          const avoids = await supabase.from("avoids").select();
          setAvoids(avoids.data);
        }
     });
     const { isLoadingRoute, errorRoute, routedata } = useQuery(
       "routes",
       async () => {
         //prevent fetching over and over again when going back to home screen
         if (currentRoute && currentRoute.length === 0) {
          //this would be updated with code that checks which route is closer in future plan
           const route = await supabase.from("Routes").select().eq("name", 'Route Kortrijk');
           setRoute(route.data);
           console.log("route fetched")
         }
       }
     );
const [hasMounted,setHasMounted] = useState(false)
  useEffect(() => {
    if(!hasMounted){
      const showPosition = (position) => {
      //  console.log(position.coords);
        setCurrentPos({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      };
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          showPosition,
          () => {
            window.alert("error in location");
          },
          { enableHighAccuracy: true }
        );
      }
      setHasMounted(true);
    }
  },[]);

  return (
    <>
      <Stack height="100vh" justifyContent={"space-between"} width="100vw">
        <Stack
          width={"100vw"}
          direction="row"
          justifyContent={"flex-end"}
        >
          <Box
            sx={{ backgroundColor: "#FFA97C" }}
            width="5rem"
            height="5rem"
            borderRadius={"50%"}
            marginTop="-.7rem"
            marginRight="-.7rem"
            display="flex"
            flexDirection={"column"}
            alignItems="center"
            justifyContent={"center"}
            component={Link}
            to={"/profile"}
          >
            {/* <Avatar
          sx={{ width: "5rem", height: "5rem", backgroundColor: "#FFA97C" }}
          component={Link}
          to="/profile"
        ></Avatar> */}
            <SvgIcon
              fontSize="large"
              sx={{ color: "#FFF", position: "absolute" }}
            >
              {ProfileIcon}
            </SvgIcon>
          </Box>
        </Stack>

        <Stack
          spacing={2}
          direction="column"
          alignItems={"left"}
          paddingLeft="2rem"
        >
          {session && (
            <Stack direction={"row"} spacing={1} alignItems="baseline">
              <img
                className="smiley"
                src={require("../img/smile.png")}
                alt="smile illustration"
                width={"50px"}
              ></img>

              <Typography
                fontFamily={"Lato"}
                sx={{ color: "#14656B" }}
                fontWeight={800}
                fontSize="24px"
              >
                hi
              </Typography>
              <Typography
                fontFamily={"Lato"}
                sx={{ color: "#FA8794" }}
                fontWeight={800}
                fontSize="40px"
              >
                {name}!
              </Typography>
            </Stack>
          )}
          {!session && (
            <Stack
              direction={"row"}
              spacing={1}
              alignItems="baseline"
              paddingTop="2rem"
            >
              <img
                className="smiley"
                src={require("../img/smile.png")}
                alt="smile illustration"
                width={"50px"}
              ></img>

              <Typography
                fontFamily={"Lato"}
                sx={{ color: "#14656B" }}
                fontWeight={800}
                fontSize="24px"
              >
                hi
              </Typography>
              <Typography
                fontFamily={"Lato"}
                sx={{ color: "#FFA97C" }}
                fontWeight={800}
                fontSize="40px"
              >
                stranger
              </Typography>
            </Stack>
          )}
          <SearchBarNavigate />
        </Stack>
        <Stack
          backgroundColor="white"
          marginTop="2rem"
          borderRadius={"50px 50px 0 0"}
          direction={"column"}
        >
          <Typography
            paddingLeft="2rem"
            color={"#14656B"}
            marginTop="2rem"
            fontSize={"20px"}
            fontWeight={500}
            fontFamily="Poppins"
            marginBottom={"1rem"}
          >
            saved addresses
          </Typography>
          {(session && (
            <SavedAddresses addresses={savedAddresses}></SavedAddresses>
          )) || (
            <Typography
              color="#FFA97C"
              fontFamily={"Poppins"}
              fontSize="16px"
              fontWeight={400}
              paddingLeft="2rem"
              marginTop={"-.8rem"}
              paddingBottom="1.2rem"
            >
              you'll need an account for this!
            </Typography>
          )}

          <img
            className="biking"
            style={{ bottom: "0" }}
            width={`${window.innerWidth}px`}
            src={require("../img/bike_cropped.png")}
            alt="biking illustration"
          ></img>
        </Stack>
      </Stack>
    </>
  );
};
export default Home;
