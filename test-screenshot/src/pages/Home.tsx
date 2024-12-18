import { faker } from "@faker-js/faker";
import ImageUserView from "../assets/image/userView.jpg";
import html2canvas from "html2canvas";
import * as htmlToImage from "html-to-image";

const Home = () => {
  const handleClick = async () => {
    const el = document.getElementById("root");
    if (!el) {
      console.error("Element not found");
      return;
    }

    // html2canvas
    const scroppedCanvas = await html2canvas(el);
    if (!scroppedCanvas) {
      console.error("Failed to capture");
      return;
    }
    const linkCanvas = scroppedCanvas.toDataURL("image/png");
    console.log("html2canvas", linkCanvas);

    // html-to-image
    const scroppedBase64 = await htmlToImage.toPng(el);
    if (!scroppedBase64) {
      console.error("Failed to capture");
      return;
    }
    console.log("html2image", scroppedBase64);

    // Download
    const link = document.createElement("a");
    link.href = linkCanvas;
    link.download = "screenshot-canvas2i.png";
    link.click();

    link.href = scroppedBase64;
    link.download = "screenshot-h2i.png";
    link.click();
  };

  return (
    <div className="flex w-2/3 flex-col space-y-6 justify-center items-center">
      <h1 className="text-3xl font-bold text-center">
        Try to screenshot this page
      </h1>
      <section className="flex flex-col p-2 sm:flex-row w-full justify-between items-center space-y-2 sm:space-y-0 bg-gray-600/20 rounded-sm">
        <p className="mx-8">Show how to use.</p>
        <img src={ImageUserView} className="sm:max-w-80"></img>
      </section>
      <section className="flex p-2 w-full justify-between items-center bg-gray-600/20 rounded-sm">
        <p className="mx-8 my-4">
          {faker.word.words({ count: { min: 80, max: 100 } })}
        </p>
      </section>
      <button
        className="p-2 max-w-48 text-sm border rounded-md bg-gray-400/30"
        onClick={handleClick}
      >
        Screenshot !!
      </button>
    </div>
  );
};

export default Home;
