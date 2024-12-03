export const markerGenerator = (
  icon: string,
  onClick: () => void = () => {}
) => {
  const customMarker = document.createElement("img");
  customMarker.src = icon;
  customMarker.style.width = "30px";
  customMarker.style.height = "30px";
  customMarker.style.cursor = "pointer";
  customMarker.addEventListener("click", onClick);

  return customMarker;
};
