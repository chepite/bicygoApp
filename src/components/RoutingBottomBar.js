import { Divider, Stack, SvgIcon, Typography } from "@mui/material";
import { AddIcon, CloseIcon } from "../img/svg/Icons";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
const RoutingBottomBar = ()=>{
  const navigate = useNavigate()
  const setHome = useStore((state)=>state.setHome);
  const setDestinations = useStore((state) => state.setDestinations);
  const setOpstappunt = useStore((state) => state.setOpstappunt);
  const setrouteToOpstappunt = useStore((state) => state.setrouteToOpstappunt);
  const setAfstappunt = useStore((state) => state.setAfstappunt);
  const setrouteTohome = useStore((state) => state.setrouteHome);

    return (
      <>
        <Stack
          className="drowShadow"
          position="absolute"
          marginBottom={".5rem"}
          zIndex="2"
          bottom={0}
          width="100%"
          justifyContent={"right"}
          borderRadius={"100rem"}
          height="96px"
          sx={{ backgroundColor: "#F0F8F9" }}
          direction="row"
          alignItems={"center"}
          spacing={1.5}
        >
          <Stack directon="column" width="18%">
            <Typography fontFamily={"Poppins"} fontWeight="600" color="#0C2D30">
              34 min
            </Typography>
            <Typography fontFamily={"Poppins"} color="#777777">
              left
            </Typography>
          </Stack>
          <Divider
            orientation="vertical"
            // variant="middle"
            sx={{ color: "#000", height: "3rem" }}
          ></Divider>
          <Stack directon="column" width="18%">
            <Typography fontFamily={"Poppins"} fontWeight="500">
              02:34
            </Typography>
            <Typography fontFamily={"Poppins"} color="#777777">
              arriving
            </Typography>
          </Stack>
          <Divider
            orientation="vertical"
            variant="middle"
            sx={{ color: "#000", height: "3rem" }}
          ></Divider>
          <Stack directon="column" width="18%">
            <Typography fontFamily={"Poppins"} fontWeight="500">
              7km
            </Typography>
            <Typography fontFamily={"Poppins"} color="#777777">
              distance
            </Typography>
          </Stack>

          <Stack alignItems="center" paddingRight=".5rem">
            <Stack
              className="drowShadow"
              width="79px"
              height={"79px"}
              marginLeft="3px"
              sx={{ backgroundColor: "#FA8794", borderRadius: "50%" }}
              justifyContent="center"
              alignItems="center"
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
              <SvgIcon
                sx={{
                  transform: "rotate(45deg)",
                  width: "50px",
                  height: "50px",
                  color: "#FFF",
                }}
              >
                {AddIcon}
              </SvgIcon>
            </Stack>
          </Stack>
        </Stack>
      </>
    );
}
export default RoutingBottomBar;