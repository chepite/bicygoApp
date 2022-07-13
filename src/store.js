import create from "zustand"
//  const [opstappunt, setOpstappunt] = useState({ lat: 0, lon: 0 });
//  const [afstappunt, setAfstappunt] = useState({ lat: 0, lon: 0 });
//  const [routeToOpstappunt, setrouteToOpstappunt] = useState([]);
//  const [routeTohome, setrouteTohome] = useState([]);
const useStore = create((set) => ({
  searchbarLoading: false,
  setSearchbarLoading: (searchbarLoading) =>
    set((state) => ({
      searchbarLoading: searchbarLoading,
    })),
  route: [],
  setRoute: (route) =>
    set((state) => ({
      route: route,
    })),
  avoids: [],
  setAvoids: (avoids) =>
    set((state) => ({
      avoids: avoids,
    })),
  destinations: [],
  setDestinations: (destinations) =>
    set((state) => ({
      destinations: destinations,
    })),
  home: { lat: 0, lon: 0 },
  setHome: (home) =>
    set((state) => ({
      home: { lat: home.lat, lon: home.lon },
    })),
  savedAddresses: [],
  setSavedAddresses: (addresses) =>
    set((state) => ({
      savedAddresses: addresses,
    })),
  name: "",
  setName: (name) =>
    set((state) => ({
      name: name,
    })),
  index: 0,
  setIndex: (index) =>
    set((state) => ({
      index: index,
    })),
  currentPos: { lat: 0, lon: 0 },
  setCurrentPos: (currentPos) =>
    set((state) => ({
      currentPos: currentPos,
    })),
  opstappunt: { lat: 0, lon: 0 },
  setOpstappunt: (opstappunt) =>
    set((state) => ({
      opstappunt: opstappunt,
    })),
  afstappunt: { lat: 0, lon: 0 },
  setAfstappunt: (afstappunt) =>
    set((state) => ({
      afstappunt: afstappunt,
    })),
  routeToOpstappunt: [],
  setrouteToOpstappunt: (routeToOpstappunt) =>
    set((state) => ({
      routeToOpstappunt: routeToOpstappunt,
    })),
  routeToAfstappunt: [],
  setrouteAfstappunt: (routeToAfstappunt) =>
    set((state) => ({
      routeToAfstappunt: routeToAfstappunt,
    })),
  routeToHome: [],
  setrouteHome: (routeToHome) =>
    set((state) => ({
      routeToHome: routeToHome,
    })),
  // pin: { lat: 0, lon: 0 },
  pin: {},

  setPin: (pin) =>
    set((state) => ({
      pin: pin,
    })),
  routingToHome: {},
  setRoutingToHome: (routingToHome) =>
    set((state) => ({
      routingToHome: routingToHome,
    })),
  routingToOpstap: {},
  setRoutingToOpstap: (routingToOpstap) =>
    set((state) => ({
      routingToOpstap: routingToOpstap,
    })),
}));

export {useStore};