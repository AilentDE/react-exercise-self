import { useEffect, useState } from "react";

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    const getUserLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("user location:");
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

  return { userLocation };
};

export default useUserLocation;
