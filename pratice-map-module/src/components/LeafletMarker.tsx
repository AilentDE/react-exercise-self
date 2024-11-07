import { Icon } from "leaflet";
import { useCallback } from "react";
import { useMap, Marker, Popup } from "react-leaflet";

type Info = {
  name: string;
  description: string;
};
type LeafletMarkerProps = {
  icon: Icon;
  position: [number, number];
  //   title: string;
  info: Info;
};

const LeafletMarker = ({ icon, position, info }: LeafletMarkerProps) => {
  const map = useMap();

  const handleMarkerClick = useCallback(() => {
    map.flyTo(position, map.getZoom());
  }, [map, position]);

  return (
    <Marker
      icon={icon}
      position={position}
      eventHandlers={{
        click: handleMarkerClick,
      }}
    >
      <Popup>
        <h3 className="text-lg font-medium mb-2">{info.name}</h3>
        <p>{info.description}</p>
      </Popup>
    </Marker>
  );
};

export default LeafletMarker;
