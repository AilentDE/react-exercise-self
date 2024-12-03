type Gomp = {
  accessToken: string;
  Map: any;
  Marker: any;
  Popup: any;
};
declare global {
  interface Window {
    gomp: Gomp | undefined;
  }
}

import { useEffect, useRef, useState } from "react";

import useUserLocation from "../hooks/useUserLocation";
import { defaultCenter } from "../utils/config";
import { PLACES } from "../store/places";
import { markerGenerator } from "../components/Map8Marker";
import IconFooding from "../assets/fooding.svg";

const center: [number, number] = [defaultCenter.lng, defaultCenter.lat];

const Map8Page = () => {
  const { userLocation } = useUserLocation();
  const [isPrepared, setIsPrepared] = useState({
    gomp: false,
    turf: false,
  });
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://api.map8.zone/css/gomp.css?key=${
      import.meta.env.VITE_MAP8_KEY
    }`;
    link.crossOrigin = "*";
    document.head.appendChild(link);

    const gompScript = document.createElement("script");
    gompScript.src = `https://api.map8.zone/maps/js/gomp.js?key=${
      import.meta.env.VITE_MAP8_KEY
    }`;
    gompScript.crossOrigin = "*";
    document.head.appendChild(gompScript);

    const turfScript = document.createElement("script");
    turfScript.src =
      "//cdnjs.cloudflare.com/ajax/libs/Turf.js/5.1.5/turf.min.js";
    turfScript.crossOrigin = "*";
    document.head.appendChild(turfScript);

    gompScript.onload = () =>
      setIsPrepared((prev) => ({ ...prev, gomp: true }));
    turfScript.onload = () =>
      setIsPrepared((prev) => ({ ...prev, turf: true }));

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(gompScript);
      document.head.removeChild(turfScript);
    };
  }, []);

  useEffect(() => {
    if (window.gomp === undefined || !mapContainerRef.current) return;
    window.gomp.accessToken = import.meta.env.VITE_MAP8_KEY;
    if (userLocation) {
      center[0] = userLocation.lng;
      center[1] = userLocation.lat;
    }
    const map = new window.gomp.Map({
      container: mapContainerRef.current,
      style:
        "https://api.map8.zone/styles/go-life-maps-tw-style-std/style.json",
      maxBounds: [
        [105, 15],
        [138.45858, 33.4],
      ], // 台灣地圖區域
      center, // 初始中心座標
      zoom: 15, // 初始 ZOOM LEVEL
      minZoom: 14, // 限制地圖可縮放之最小等級
      maxZoom: 17, // 限制地圖可縮放之最大等級
      pitch: 0,
      bearing: 0,
      scrollZoom: true,
      attributionControl: false, // 關閉歸屬控件
    });

    map.on("load", () => {
      PLACES.forEach((place) => {
        if (window.gomp === undefined) return;

        const popup = new window.gomp.Popup().setHTML(`
          <div class="p-2 flex flex-col items-center justify-center">
          <h3 class="text-lg font-medium mb-2">${place.name}</h3>
          <p>${place.description}</p>
          </div>
          `);

        new window.gomp.Marker({
          element: markerGenerator(IconFooding, () =>
            map.panTo([place.lng, place.lat], map.getZoom())
          ),
        })
          .setLngLat([place.lng, place.lat])
          .setPopup(popup)
          .addTo(map);
      });
    });

    map.on("click", (event: MouseEvent | TouchEvent) => {
      console.log("click", event);
    });
    map.on("move", (event: MouseEvent | TouchEvent) => {
      console.log("move", event);
    });
    map.on("moveend", (event: MouseEvent | TouchEvent) => {
      console.log("moved", event);
    });
  }, [isPrepared, userLocation]);

  if (!isPrepared.gomp || !isPrepared.turf) {
    return <div>Map Loading...</div>;
  }
  return <div ref={mapContainerRef} className="size-full" />;
};

export default Map8Page;
