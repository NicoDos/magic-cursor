import { motion } from "framer-motion";
import { useFollowPointer } from "../hooks/useFollowPointer";
import React, { useContext } from "react";
import { CursorContext } from "../contexts/CursorContext";

const Cursor: React.FC<any> = () => {
  const { x, y, height, width, borderColor, borderWidth, borderRadius } =
    useContext(CursorContext);
  const { x: pointerX, y: pointerY } = useFollowPointer();

  return (
    <motion.div
      className="cursor"
      animate={{
        x: x !== 0 ? x : pointerX,
        y: y || pointerY,
        width: width,
        height: height,
        borderColor: borderColor,
        borderWidth: borderWidth,
        borderRadius: borderRadius,
        transition: {
          type: "spring",
          damping: 50,
          stiffness: 500,
          restDelta: 1,
        },
      }}
    />
  );
};

export default Cursor;
