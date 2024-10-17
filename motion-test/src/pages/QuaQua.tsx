import { useRef } from "react";
import { motion } from "framer-motion";

import Scratch from "../components/Scratch";
import IMG from "../assets/img_002.jpg";

const QuaQuaPage = () => {
  const scratchRef = useRef<typeof Scratch.Area>(null);

  const onClickReset = () => {
    if (scratchRef.current) {
      scratchRef.current.reset();
    }
  };

  return (
    <div className="flex flex-col size-full justify-center items-center space-y-8">
      <motion.button
        className=" border rounded-md px-4 py-2 font-bold"
        whileHover={{ scale: 1.1, backgroundColor: "#aeb6bf", color: "#000" }}
        whileTap={{ scale: 0.9 }}
        // transition={{ type: "spring", stiffness: 500 }}
        onClick={onClickReset}
      >
        New One
      </motion.button>
      <Scratch>
        <Scratch.Area
          ref={scratchRef}
          width={320}
          height={226}
          image={IMG}
          finishPercent={40}
          onComplete={() => console.log("complete")}
          brushSize={20}
          // customBrush={CUSTOM_BRUSH_PRESET}
        >
          <div className="flex size-full items-center justify-center bg-gray-400 bg-opacity-10">
            <h1 className="text-center font-bold">
              沒有，不可能中獎的
              <br />
              笑死
            </h1>
          </div>
        </Scratch.Area>
      </Scratch>
    </div>
  );
};

export default QuaQuaPage;
