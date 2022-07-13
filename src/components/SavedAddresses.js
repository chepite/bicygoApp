import SavedAddressCard from "./SavedAddressCard";
import AddSavedAddress from "./AddSavedAddress";
import { Stack } from "@mui/material";
const SavedAddresses = ({addresses})=>{
  
    return (
      <>
        <Stack
          direction={"row"}
          overflow={"scroll"}
          display="flex"
          flexShrink={0}
          paddingLeft="2rem"
          paddingRight="2rem"
        >
          <AddSavedAddress></AddSavedAddress>
          {addresses &&
            addresses.map((element) => (
              <SavedAddressCard
                className="card"
                key={element.id}
                address={element}
              ></SavedAddressCard>
            ))}
        </Stack>
      </>
    );
}
export default SavedAddresses;