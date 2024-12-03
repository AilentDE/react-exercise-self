import { useState } from "react";
import {
  AzureMapHtmlMarker,
  AzureMapPopup,
  useAzureMaps,
} from "react-azure-maps";

type Info = {
  name: string;
  description: string;
};

type MarkerProps = {
  icon: React.ReactNode;
  position: [number, number];
  info: Info;
};

const AzureMarker = ({ icon, position, info }: MarkerProps) => {
  const [showInfo, setShowInfo] = useState(false);
  const { mapRef } = useAzureMaps();

  const handleClicked = () => {
    if (!mapRef) return;

    setShowInfo(true);
    const camera = mapRef.getCamera();
    mapRef.setCamera({
      center: position,
      zoom: camera.zoom,
    });
  };

  return (
    <>
      <AzureMapHtmlMarker
        options={{ position }}
        markerContent={<div className=" cursor-pointer">{icon}</div>}
        events={[
          {
            eventName: "click",
            callback: handleClicked,
          },
        ]}
      />
      {showInfo && (
        <AzureMapPopup
          isVisible={true}
          options={{ position }}
          popupContent={
            <div className="flex flex-col p-2 mt-2">
              <h3 className="text-lg font-medium mb-2">{info.name}</h3>
              <p>{info.description}</p>
            </div>
          }
          events={[{ eventName: "close", callback: () => setShowInfo(false) }]}
        />
      )}
    </>
  );
};

export default AzureMarker;
