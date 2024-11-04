import { useCallback, useEffect, useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

import { PLACES } from "../store/places";
import IconFooding from "../components/ui/icons/IconFooding";
import MarkerWithInfoWindow from "../components/MarkerWithInfoWindow";

const defaultCenter = { lat: 25.033, lng: 121.5654 };

const GoogleMapPage = () => {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleMapEvent = useCallback((event: object) => {
    console.log("camera change:", event);
  }, []);

  useEffect(() => {
    const getUserLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => {
            console.error("Can't get user location.");
            setUserLocation(null);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setUserLocation(null);
      }
    };

    getUserLocation();
  }, []);

  return (
    <>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_KEY}>
        <Map
          mapId="food-map"
          className="size-full"
          defaultCenter={userLocation || defaultCenter}
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
