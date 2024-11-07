import { useEffect, useState } from "react";
import { Icon, icon } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";

import useUserLocation from "../hooks/useUserLocation";
import { defaultCenter, tileLayer } from "../utils/config";
import { PLACES } from "../store/places";
// import IconFooding from "../components/ui/icons/IconFooding";
import IconFooding from "../assets/fooding.svg";
import LeafletMarker from "../components/LeafletMarker";

const center: [number, number] = [defaultCenter.lat, defaultCenter.lng];
const placeIcon: Icon = icon({
  iconUrl: IconFooding,
  iconSize: [30, 30],
});

const LeafletMapPage = () => {
  const { userLocation } = useUserLocation();
  const [isPrepared, setIsPrepared] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
    link.crossOrigin = "*";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
    script.crossOrigin = "*";
    document.head.appendChild(script);

    script.onload = () => {
      setIsPrepared(true);
    };

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(script);
    };
  }, []);

  if (userLocation) {
    center[0] = userLocation.lat;
    center[1] = userLocation.lng;
  }

  if (!isPrepared) {
    return <div>Map Loading...</div>;
  }
  return (
    <div id="map" className="size-full">
      <MapContainer
        center={center}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: "100%" }}
      >
        <TileLayer {...tileLayer} />
        {PLACES.map((place) => (
          <LeafletMarker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={placeIcon}
            // title={place.name}
            info={{ name: place.name, description: place.description }}
          ></LeafletMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LeafletMapPage;
