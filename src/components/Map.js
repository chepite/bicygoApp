import { requirePropFactory, SvgIcon } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  Polyline,
  Polygon,
  Marker,
  Popup,
} from "react-leaflet";
import { HomeCircle, HomeMarker } from "../img/svg/Icons";
import { useStore} from "../store";
import L from "leaflet"
const Map = ({
  isRouting,
  radius,
  center,
  currentPos,
  opstappunt,
  routeToOpstappunt,
  afstappunt,
  home,
  routeTohome
}) => {

  const homeIcon = new L.Icon({
    iconUrl: require("../img/house.png"),
    iconSize: [33, 33],
    // iconAnchor: [16.5, 33], //[left/right, top/bottom]
  });
  const markerIcon = new L.Icon({
    iconUrl: require("../img/pin.png"),
    iconSize: [25, 34],
    // iconAnchor: [12.5, 34], //[left/right, top/bottom]
  });
  const currentPosIcon = new L.Icon({
    iconUrl: require("../img/current.png"),
    iconSize: [62, 62],
    // iconAnchor: [31, 62], //[left/right, top/bottom]
  });

    //  const icon = new L.Icon({
    //      iconUrl: require('../img/svg/home_circle.svg'),
    //      iconSize: [25,25]
    //  });





  const orange = { color: "#FFA97C" };

  return (
    <MapContainer
      className={radius ? "borderRadius" : "" || isRouting ? " routingMap" : ""}
      center={center}
      zoom={15}
      scrollWheelZoom={false}
      zoomControl={true}
    >
      {/* <ZoomControl position="bottomleft" zoomInText="+" zoomOutText="-" /> */}

      <TileLayer url="https://maps.geoapify.com/v1/tile/carto/{z}/{x}/{y}.png?apiKey=e12f3c544d264429b2fa1ac95b00744d" />
      {currentPos && (
        <Marker
          position={[currentPos.lat, currentPos.lon]}
          icon={currentPosIcon}
        >
          <Popup>You are here</Popup>
        </Marker>
      )}
      {/* {home.lat !== 0 && (
        <Marker position={[home.lat, home.lon]}>
          <Popup>Destination</Popup>
        </Marker>
      )}
      {opstappunt.lat !== 0 && (
        <Marker position={[opstappunt.lat, opstappunt.lon]}>
          <Popup>opstappunt</Popup>
        </Marker>
      )}
      {afstappunt.lat !== 0 && (
        <Marker position={[afstappunt.lat, afstappunt.lon]}>
          <Popup>afstappunt</Popup>
        </Marker>
      )} */}
      {home.lat !== 0 && (
        <Marker position={[home.lat, home.lon]} icon={homeIcon}>
          <Popup>Destination</Popup>
        </Marker>
      )}
      {opstappunt.lat !== 0 && (
        <Marker position={[opstappunt.lat, opstappunt.lon]} icon={markerIcon}>
          <Popup>opstappunt</Popup>
        </Marker>
      )}
      {afstappunt.lat !== 0 && (
        <Marker position={[afstappunt.lat, afstappunt.lon]} icon={markerIcon}>
          <Popup>afstappunt</Popup>
        </Marker>
      )}
      {routeToOpstappunt && (
        <Polyline pathOptions={orange} positions={routeToOpstappunt} />
      )}
      {routeTohome && (
        <Polyline pathOptions={orange} positions={routeTohome} />
      )}
    </MapContainer>
  );
};
export default Map;
