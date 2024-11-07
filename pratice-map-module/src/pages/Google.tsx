import { useCallback } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

import useUserLocation from "../hooks/useUserLocation";
import { defaultCenter } from "../utils/config";
import { PLACES } from "../store/places";
import IconFooding from "../components/ui/icons/IconFooding";
import MarkerWithInfoWindow from "../components/MarkerWithInfoWindow";

const center = { ...defaultCenter };

const GoogleMapPage = () => {
  const { userLocation } = useUserLocation();

  const handleMapEvent = useCallback((event: object) => {
    console.log("camera change:", event);
  }, []);

  if (userLocation) {
    center.lat = userLocation.lat;
    center.lng = userLocation.lng;
  }

  return (
    <>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_KEY}>
        <Map
          mapId="food-map"
          className="size-full"
          defaultCenter={center}
          defaultZoom={15}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          reuseMaps={true}
          onCameraChanged={handleMapEvent}
        >
          {PLACES.map((place) => (
            <MarkerWithInfoWindow
              key={place.id}
              icon={<IconFooding className="size-6" />}
              position={{ lat: place.lat, lng: place.lng }}
              title={place.name}
              info={{ name: place.name, description: place.description }}
            />
          ))}
        </Map>
      </APIProvider>
    </>
  );
};

export default GoogleMapPage;
