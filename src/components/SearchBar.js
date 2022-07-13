import { Input, InputAdornment, SvgIcon} from "@mui/material";
import { useForm } from "react-hook-form";
import { useStore } from "../store";
import { SearchIcon } from "../img/svg/Icons";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBar = () => {
  const setDestinations = useStore((state) => state.setDestinations);
  const navigate = useNavigate();
  const location= useLocation();
  const setSearchbarLoading= useStore((state)=> state.setSearchbarLoading)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSearchbarLoading(true);
    var requestOptions = {
      method: "GET",
    };

    await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${data.destination}&apiKey=e12f3c544d264429b2fa1ac95b00744d`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result.features);
          setDestinations(result.features);
      })
      .catch((error) => console.log("error", error));
    //getFullRoute()
    //only redirect/load page when the location isn't searchresults (full page search result displayer)
    setSearchbarLoading(false);
    if(location.pathname !== "/searchresults"){
      navigate("/searchresults");
    }

  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          // marginLeft: "1rem",
        }}
      >
        <Input
          sx={{
            width: "100%",
            padding: ".5rem",
            borderRadius: "50px",
            backgroundColor:"#FFF"
          }}
          disableUnderline={true}
          {...register("destination")}
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon
                sx={{
                  fill: "#FFA97C",
                  marginRight: ".5rem",
                  marginLeft: ".5rem",
                }}
              >
                {SearchIcon}
              </SvgIcon>
            </InputAdornment>
          }
          placeholder="search location"
        ></Input>
      </form>
    </>
  );
};
export default SearchBar;
