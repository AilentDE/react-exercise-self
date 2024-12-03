import {
  AuthenticationType,
  AzureMap,
  AzureMapsProvider,
  IAzureMapOptions,
} from "react-azure-maps";
import "azure-maps-control/dist/atlas.min.css";

import useUserLocation from "../hooks/useUserLocation";
import { defaultCenter } from "../utils/config";
import { PLACES } from "../store/places";
import IconFooding from "../components/ui/icons/IconFooding";
import AzureMarker from "../components/AzureMarker";

const option: IAzureMapOptions = {
  authOptions: {
    authType: AuthenticationType.subscriptionKey,
    subscriptionKey: import.meta.env.VITE_AZURE_MAP_KEY,
  },
  center: [defaultCenter.lng, defaultCenter.lat],
  zoom: 15,
};

const AzureMapPage = () => {
  const { userLocation } = useUserLocation();

  if (userLocation) {
    option.center = [userLocation.lng, userLocation.lat];
  }

  return (
    <div className="size-full">
      <AzureMapsProvider>
        <AzureMap
          options={option}
          styleOptions={{
            showFeedbackLink: false,
          }}
        >
          {PLACES.map((place) => (
            <AzureMarker
              key={place.id}
              icon={<IconFooding className="size-6" />}
              position={[place.lng, place.lat]}
              info={{ name: place.name, description: place.description }}
            />
          ))}
        </AzureMap>
      </AzureMapsProvider>
    </div>
  );
};

export default AzureMapPage;
