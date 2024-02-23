"use client";

import { motion } from "framer-motion";
import { useFollowPointer } from "../hooks/useFollowPointer";
import { useContext } from "react";
import { CursorContext } from "contexts/CursorContext";

export default function Cursor() {
  const {
    cursorX,
    cursorY,
    cursorHeight,
    cursorWidth,
    cursorBorderColor,
    cursorBorderWidth,
    cursorBorderRadius,
  } = useContext(CursorContext);
  const { x, y } = useFollowPointer();

  return (
    <motion.div
      className="cursor"
      animate={{
        x: cursorX !== 0 ? cursorX : x,
        y: cursorY || y,
        width: cursorWidth,
        height: cursorHeight,
        borderColor: cursorBorderColor,
        borderWidth: cursorBorderWidth,
        borderRadius: cursorBorderRadius,
        transition: {
          type: "spring",
          damping: 50,
          stiffness: 500,
          restDelta: 1,
        },
      }}
      whileTap={{
        scale: 12.5,
        transition: {
          type: "spring",
        },
      }}
    />
  );
}
