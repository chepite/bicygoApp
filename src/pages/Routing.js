import Map from "../components/Map";
import RoutingTopBar from "../components/RoutingTopBar";
import RoutingBottomBar from "../components/RoutingBottomBar";
import { Stack } from "@mui/material";
import { useStore } from "../store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//icons to give to topbar
import { finish } from "../img/svg/Icons";
import { logo } from "../img/svg/Icons";
import { arrow } from "../img/svg/Icons";

const Routing = () => {
  const [okrouteHome, setOkRoutehome] = useState(false);
  const [arrivedAtOpstap,setArrivedAtOpstap] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [routeHomeset, setRoutehomeSet]= useState(false)
  const routingToOpstap = useStore((state) => state.routingToOpstap);
  const routingToHome = useStore((state) => state.routingToHome);
  const currentPos = useStore((state) => state.currentPos);
  const opstappunt = useStore((state) => state.opstappunt);
  const routeToOpstappunt = useStore((state) => state.routeToOpstappunt);
  const afstappunt = useStore((state) => state.afstappunt);
  const routeTohome = useStore((state) => state.routeToHome);
  const home = useStore((state) => state.home);

  //test
  const [instruction, setInstruction] = useState(
    routingToOpstap.features[0].properties.legs[0].steps[0].instruction.text
  );
  const [distanceBetweenPoints, setDistanceBetweenPoints] = useState(0);
  //index van de step
  const [stepIndex, setStepIndex] = useState(0);
  //data of the current step
  const [currentStep, setCurrentStep] = useState(
    routingToOpstap.features[0].properties.legs[0].steps[0]
  );
  //de index van het coordinaat van de current step die het startpunt van de step voorstelt
  const [currentIndex, setCurrentIndex] = useState(0);
  //de index van het coordinaat die het eindpunt van deze step voorstelt
  const [nextPointIndex, setNextPointIndex] = useState(
    routingToOpstap.features[0].properties.legs[0].steps[0].to_index
  );
  //de coordinaten van het eindpunt van deze step {lat;lon}
  const [nextPoint, setNextPoint] = useState({
    lat: routingToOpstap.features[0].geometry.coordinates[0][
      routingToOpstap.features[0].properties.legs[0].steps[0].to_index
    ][1],
    lon: routingToOpstap.features[0].geometry.coordinates[0][
      routingToOpstap.features[0].properties.legs[0].steps[0].to_index
    ][0],
  });
  const [icon, SetIcon] = useState(arrow);
  //array with the waypoints => this array has the data that the pointindexes refer to
  const [waypointArray, setWayPointArray] = useState(
    routingToOpstap.features[0].geometry.coordinates[0]
  );
  //    const [time, setTime] = useState(0);
  //    const [distance, setDistance] = useState(0);

    const [currentRoute, setCurrentRoute]= useState(routingToOpstap)

    // const navigate = useNavigate()
    // if(currentRoute){
    //   console.log(currentRoute)
    // }
    //     const navigate = useNavigate();

    // useEffect(()=>{
    //   if (routingToOpstap === undefined) {
    //     navigate("/");
    //   }
    // },[routingToOpstap, navigate])
    
 
  useEffect(() => {
    if(isHome === false){
      if (
        arrivedAtOpstap === true &&
        okrouteHome === true &&
        routeHomeset === false
      ) {
        setRoutehomeSet(true);
        console.log("set other route", routingToHome);
        setNextPoint({
          lat: routingToHome.features[0].geometry.coordinates[0][
            routingToHome.features[0].properties.legs[0].steps[0].to_index
          ][1],
          lon: routingToHome.features[0].geometry.coordinates[0][
            routingToHome.features[0].properties.legs[0].steps[0].to_index
          ][0],
        });
        console.log(
          "setting this index as next point index",
          routingToHome.features[0].geometry.coordinates[0][0].to_index
        );
        setCurrentRoute(routingToHome);
        setWayPointArray(routingToHome.features[0].geometry.coordinates[0]);
      }

      let distance;
      if (nextPoint && nextPoint.lat) {
        distance = Math.hypot(
          nextPoint.lat - currentPos.lat,
          nextPoint.lon - currentPos.lon
        );

        console.log(
          distance,
          "nextpoint",
          nextPoint,
          "currentIndex",
          currentIndex,
          "lenght",
          waypointArray.length
        );

        setDistanceBetweenPoints(distance);
      }
      //what is point is last point => if opstap route done => follow leader, if leader done aka reach startpoint routehome => start routing again
      if (nextPointIndex !== waypointArray.length - 1) {
        if (distance <= 0.0001) {
          console.log(
            "error?",
            currentRoute.features[0].properties.legs[0].steps[stepIndex]
              .to_index
          );
          //go to the next step in the route
          const localStepIndex = stepIndex + 1;
          setStepIndex(stepIndex + 1);
          setCurrentStep(
            currentRoute.features[0].properties.legs[0].steps[localStepIndex]
          );
          //get the next point's index to navigate to
          const localnextpointIndex =
            currentRoute.features[0].properties.legs[0].steps[localStepIndex]
              .to_index;
          //console.log("local next point index", localnextpointIndex);
          setNextPointIndex(localnextpointIndex);
                  SetIcon(arrow);

          //get the next point's coords witht he previous index
          setNextPoint({
            lat: waypointArray[localnextpointIndex][1],
            lon: waypointArray[localnextpointIndex][0],
          });
          //console.log("local step index", localStepIndex, "length array", waypointArray.length)
          //get the instruction of the next waypoint
          setInstruction(
            currentRoute.features[0].properties.legs[0].steps[localStepIndex]
              .instruction.text
          );
          //30m aan 20km/h is ongeveer 5 seconden
          // setTimeout(()=>{console.log("wait")}, 5000);
        }
      } else {
        // if(arrivedAtOpstap === false){
        //   setInstruction("Follow the leader");
        // }
        //  setArrivedAtOpstap(true);
      }
      //if you are 5m away from destination set instruction as you are home
      if (
        Math.hypot(home.lat - currentPos.lat, home.lon - currentPos.lon) <
          0.00005 &&
        isHome === false
      ) {
        setInstruction("Destination reached");
        SetIcon(finish);
        setIsHome(true);
      }
      if (
        Math.hypot(
          opstappunt.lat - currentPos.lat,
          opstappunt.lon - currentPos.lon
        ) < 0.00005 &&
        arrivedAtOpstap === false
      ) {
        console.log("arrived at opstap");
        setArrivedAtOpstap(true);
        SetIcon(logo);
        setInstruction("Follow the leader!");
      }
      if (
        Math.hypot(
          afstappunt.lat - currentPos.lat,
          afstappunt.lon - currentPos.lon
        ) < 0.00005 &&
        okrouteHome === false
      ) {
        setOkRoutehome(true);
        setInstruction(
          routingToHome.features[0].properties.legs[0].steps[0].instruction.text
        );
        SetIcon(arrow);
      }
    }else{
      return;
    }
  }, [
    currentPos,
    setDistanceBetweenPoints,
    arrivedAtOpstap,
    home, 
    okrouteHome,
    currentRoute,
    routeTohome,
    routingToHome,
    nextPoint,
    stepIndex,
    nextPointIndex,
    waypointArray,
    routeToOpstappunt,
    setCurrentStep,
    currentStep,
  ]);
  //end test

  return (
    <>
      <Stack height="100vh" width={"100vw"} position="absolute">
        <RoutingTopBar
        icon={icon}
          currentPos={currentPos}
          // routeToOpstappunt={routingToOpstap}
          // routeToHome={routingToHome}
          distanceBetweenPoints={distanceBetweenPoints}
          instruction={instruction}
          nextPoint={nextPoint}
        ></RoutingTopBar>
        <Map
          isRouting={true}
          radius={false}
          center={currentPos}
          currentPos={currentPos}
          opstappunt={opstappunt}
          routeToOpstappunt={routeToOpstappunt}
          afstappunt={afstappunt}
          routeTohome={routeTohome}
          home={home}
        ></Map>
        <RoutingBottomBar></RoutingBottomBar>
      </Stack>
    </>
  );
};;
export default Routing;
