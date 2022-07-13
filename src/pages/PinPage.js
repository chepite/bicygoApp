import {
  Button,
  Stack,
  Input,
  SvgIcon,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  stepIconClasses,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useStore } from "../store";
import { createClient } from "@supabase/supabase-js";
import PinCard from "../components/PinCard";
import Map from "../components/Map";
import { useLocation, useNavigate } from "react-router-dom";
import { CloseIcon, GarbageIcon, HeartIcon, HomeIcon, SchoolIcon } from "../img/svg/Icons";
import { useForm } from "react-hook-form";
//page where pins are made
const PinPage = () => {
    const supabase = createClient(
      "https://ofbromqumcvsmqxbrkrn.supabase.co",
      process.env.REACT_APP_SUPABASE_ANON_KEY
    );
    const navigate = useNavigate()
  const location = useLocation();
  const mode = location.state.mode;
  console.log(mode)
  const pin = useStore((state)=> state.pin);
  const destinations = useStore((state) => state.destinations);
  const setDestinations = useStore((state) => state.setDestinations);
  const [search,setSearch] = useState("")
  const [name, setName] = useState("");
  const [destinationText, setDestinationText]= useState("")
  const [type, setType] = useState(pin.type);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [id, setId] = useState();
   const setPin = useStore((state) => state.setPin);
   const currentPos= useStore((state)=> state.currentPos);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [mounted, setMounted] = useState(false)
  useEffect(()=>{
    if(mode && location){
      if(mounted === false && mode === "edit"){
        console.log(location.state.address.address);
        setPin(location.state.address.address);
        setId(location.state.address.address.id);
        setName(location.state.address.address.name);
        setMounted(true);
      }
    }
  },[]);

  const handleSearchChange = (e)=>{
    setSearch(e.target.value);
  }   

  const handleDestinationChange =(e)=>{
    console.log(e.target.value);
    setName(e.target.value);
  }

  const getDestinations = async(data) => {
    console.log(data)
    setIsLoading(true)
     var requestOptions = {
      method: "GET",
    };

    await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${search}&apiKey=e12f3c544d264429b2fa1ac95b00744d`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
          setIsLoading(false);
          setDestinations(result.features);
      })
      .catch((error) => setError(error));
  };

   const editPin = async () => {
     console.log("pindata", pin);
     //   address.address.geometry.coordinates;
     const { data, error } = await supabase
       .from("savedAddresses")
       .update({
         name: name,
         address_line1: pin.properties.address_line1,
         address_line2: pin.properties.address_line2,
         type: type,
         lat: pin.lat,
         lon: pin.lon,
       })
       .match({ id: id });
     navigate("/profile");
    console.log("edit")
   };

   const savePin = async () => {
    console.log(pin);
     if (type !== "" && name !== "") {
      console.log("pindata", pin)
       const { data, error } = await supabase
         .from("savedAddresses")
         .insert([
           {
             user: localStorage.getItem("user_id"),
             name: name,
             address_line1: pin.properties.address_line1,
             address_line2: pin.properties.address_line2,
             lat: pin.geometry.coordinates[1],
             lon: pin.geometry.coordinates[0],
             type: type,
           },
         ]);
       console.log(name);
       console.log(pin);
       navigate("/profile");
     }
   };

    const deletePin = async () => {
      const { data, error } = await supabase
        .from("savedAddresses")
        .delete()
        .match({ id: id });
      navigate("/profile");
    };

     const handleChangeSelect = (e) => {
       console.log(e.target.value);
       setType(e.target.value);
     };
     console.log("pin", pin.properties)
  return (
    <>
      <Stack
        width="100vw"
        height={"100vh"}
        sx={{ backgroundColor: "#fff" }}
        direction="column"
        justifyContent={"space-between"}
      >
        <Stack
          width="100vw"
          height="10vh"
          direction="row"
          alignItems={"center"}
          backgroundColor="#F0F8F9"
          borderRadius={"0 0 20px 20px"}
          justifyContent="center"
        >
          <form onSubmit={handleSubmit(getDestinations)}>
            {/* <Input
              {...register("destination")}
              id="destination"
              className="dropShadow"
              placeholder="search location"
              disableUnderline={true}
              sx={{
                width: "70%",
                backgroundColor: "#fff",
                padding: ".5rem",
                borderRadius: "40px",
              }}
            ></Input> */}
            <Input
              onChange={handleSearchChange}
              sx={{
                width: "100%",
                padding: ".5rem",
                borderRadius: "50px",
                backgroundColor: "#FFF",
              }}
              disableUnderline={true}
              //{...register("destination")}
              placeholder={"search location"}
            ></Input>
          </form>

          <SvgIcon
            sx={{ marginLeft: "2rem" }}
            onClick={() => {
              navigate("/profile");
            }}
          >
            {CloseIcon}
          </SvgIcon>
        </Stack>
        {destinations.length !== 0 && (
          <Stack
          height="80vh"
            width="100vw"
            className="destinations"
            direction="column"
            justifyContent="top"
          >
            {destinations.map((destination) => (
              <PinCard
                key={destination.properties.place_id}
                address={destination}
              ></PinCard>
            ))}
          </Stack>
        )}
        <Stack justifyContent={"center"} alignItems="center">
          {isLoading === true ? (
            <img
              style={{ width: "60%", height: "auto" }}
              src={require("../img/loading.gif")}
              alt="loading animation"
            ></img>
          ) : (
            ""
          )}
          {/* {pin.lat !== 0 && (
            <Map
              currentPos={{
                lat: location.state.address.address.lat,
                lon: location.state.address.address.lon,
              }}
              center={[
                location.state.address.address.lat,
                location.state.address.address.lon,
              ]}
            ></Map>
          )} */}
        </Stack>
        {destinations.length === 0 ? (
          <Stack
            backgroundColor="#F0F8F9"
            height={"35vh"}
            width="100vw"
            direction="column"
            alignItems={"center"}
          >
            {/*name pin*/}
            <Stack
              direction="row"
              alignItems="center"
              width="90%"
              margin="1rem"
            >
              <Typography color="#585858" width={"50%"}>
                name this pin
              </Typography>
              {/* <form onSubmit={handleSubmit(getDestinations)}> */}
              {mode === "add" ? (
                <Input
                  onChange={handleDestinationChange}
                  // {...register("destination")}
                  placeholder="name"
                  fullWidth
                  className="dropShadow"
                  disableUnderline={true}
                  sx={{
                    paddingLeft: "1rem",
                    backgroundColor: "#fff",
                    borderRadius: "50px",
                  }}
                ></Input>
              ) : (
                <Input
                  onChange={handleDestinationChange}
                  // {...register("destination")}
                  defaultValue={pin.name}
                  placeholder="name"
                  fullWidth
                  className="dropShadow"
                  disableUnderline={true}
                  sx={{
                    paddingLeft: "1rem",
                    backgroundColor: "#fff",
                    borderRadius: "50px",
                  }}
                ></Input>
              )}
              {/* </form> */}
            </Stack>
            {/*Icon selector*/}

            <Stack
              direction="row"
              alignItems="center"
              width="90%"
              margin="1rem"
            >
              <Typography color="#585858" width={"50%"}>
                choose Icon
              </Typography>
              <ToggleButtonGroup
                value={type}
                onChange={handleChangeSelect}
                exclusive
              >
                <ToggleButton value="Home">
                  <SvgIcon sx={{ color: "#FFA97C" }}>{HomeIcon}</SvgIcon>
                </ToggleButton>
                <ToggleButton value="Loved one">
                  <SvgIcon sx={{ color: "#FFA97C" }}>{HeartIcon}</SvgIcon>
                </ToggleButton>
                <ToggleButton value="School">
                  <SvgIcon sx={{ color: "#FFA97C" }}>{SchoolIcon}</SvgIcon>
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
            <Stack
              direction="row"
              width="100vw"
              spacing={3}
              justifyContent="center"
              marginTop="3vh"
            >
              {mode === "edit" ? (
                <button
                  onClick={() => {
                    deletePin();
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "none",
                    border: "none",
                    color: "#fff",
                    backgroundColor: "rgba(18,107,114, 0.5)",
                    fontFamily: "Poppins",
                    textTransform: "none",
                    width: "30vw",
                    height: "45px",
                    borderRadius: "50px",
                  }}
                >
                  <SvgIcon sx={{ paddingRight: ".25rem" }}>
                    {GarbageIcon}
                  </SvgIcon>{" "}
                  delete
                </button>
              ) : (
                ""
              )}
              <button
                onClick={() => {
                  mode === "add" ? savePin() : editPin();
                }}
                style={{
                  backgroundColor: "#126B72",
                  color: "#fff",
                  border: "none",
                  fontFamily: "Poppins",
                  textTransform: "none",
                  width: "30vw",
                  height: "45px",
                  borderRadius: "50px",
                }}
              >
                save
              </button>
            </Stack>
          </Stack>
        ) : (
          ""
        )}
      </Stack>
    </>
  );
};
export default PinPage;
