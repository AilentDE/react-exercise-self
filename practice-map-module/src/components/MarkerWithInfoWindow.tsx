import { useState } from "react";
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
  useMap,
} from "@vis.gl/react-google-maps";

type Position = {
  lat: number;
  lng: number;
};
type Info = {
  name: string;
  description: string;
};
type MarkerWithInfoWindowProps = {
  icon: React.ReactNode;
  position: Position;
  title: string;
  info: Info;
};

const MarkerWithInfoWindow = ({
  icon,
  position,
  title,
  info,
}: MarkerWithInfoWindowProps) => {
  const map = useMap();
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const handleOpen = () => {
    console.log("Marker clicked");
    if (map) {
      map.panTo(position);
    }
    setShowInfoWindow(true);
  };
  const handleClose = () => {
    console.log("InfoWindow closed");
    setShowInfoWindow(false);
  };

  return (
    <>
      <AdvancedMarker
        position={position}
        ref={markerRef}
        title={title}
        onClick={handleOpen}
      >
        {icon}
      </AdvancedMarker>
      {showInfoWindow && (
        <InfoWindow
          anchor={marker}
          headerContent={
            <h3 className="text-lg font-medium mb-2">{info.name}</h3>
          }
          onClose={handleClose}
        >
          {info.description}
        </InfoWindow>
      )}
    </>
  );
};

export default MarkerWithInfoWindow;
