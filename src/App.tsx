import { useMemo, useRef } from "react";
import { useDrag } from "./useDrag";

const containerSize: number = 300;
const dotSize: number = 12;

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const corner1Ref = useRef<HTMLDivElement>(null);
  const corner2Ref = useRef<HTMLDivElement>(null);
  const corner3Ref = useRef<HTMLDivElement>(null);
  const { position: position1, handleMouseDown: handleMouseDown1 } = useDrag({
    ref: corner1Ref,
    containerRef,
    initialPosition: {
      x: containerSize / 2,
      y: containerSize / 3,
    },
  });
  const { position: position2, handleMouseDown: handleMouseDown2 } = useDrag({
    ref: corner2Ref,
    containerRef,
    initialPosition: {
      x: containerSize / 3,
      y: containerSize - containerSize / 3,
    },
  });
  const { position: position3, handleMouseDown: handleMouseDown3 } = useDrag({
    ref: corner3Ref,
    containerRef,
    initialPosition: {
      x: containerSize - containerSize / 3,
      y: containerSize - containerSize / 3,
    },
  });

  const renderLine1 = useMemo(
    () => (
      <line
        data-testid="line"
        x1={position1.x + dotSize / 2}
        y1={position1.y + dotSize / 2}
        x2={position2.x + dotSize / 2}
        y2={position2.y + dotSize / 2}
        style={{ stroke: "#ADB9C3", strokeWidth: 2 }}
      />
    ),
    [position1, position2]
  );

  const renderLine2 = useMemo(
    () => (
      <line
        data-testid="line"
        x1={position2.x + dotSize / 2}
        y1={position2.y + dotSize / 2}
        x2={position3.x + dotSize / 2}
        y2={position3.y + dotSize / 2}
        style={{ stroke: "#ADB9C3", strokeWidth: 2 }}
      />
    ),
    [position2, position3]
  );

  const renderLine3 = useMemo(
    () => (
      <line
        data-testid="line"
        x1={position3.x + dotSize / 2}
        y1={position3.y + dotSize / 2}
        x2={position1.x + dotSize / 2}
        y2={position1.y + dotSize / 2}
        style={{ stroke: "#ADB9C3", strokeWidth: 2 }}
      />
    ),
    [position3, position1]
  );
  const renderDot1 = useMemo(
    () => (
      <div
        data-testid="dot"
        onMouseDown={handleMouseDown1}
        ref={corner1Ref}
        className={`absolute w-3 h-3 rounded-full bg-darkblue cursor-move bg-[#3878A2] z-50`}
        style={{
          top: position1.y,
          left: position1.x,
        }}
      />
    ),
    [position1, handleMouseDown1]
  );

  const renderDot2 = useMemo(
    () => (
      <div
        data-testid="dot"
        onMouseDown={handleMouseDown2}
        ref={corner2Ref}
        className={`absolute w-3 h-3 rounded-full bg-darkblue cursor-move bg-[#3878A2] z-50`}
        style={{
          top: position2.y,
          left: position2.x,
        }}
      />
    ),
    [position2, handleMouseDown2]
  );

  const renderDot3 = useMemo(
    () => (
      <div
        data-testid="dot"
        onMouseDown={handleMouseDown3}
        ref={corner3Ref}
        className={`absolute w-3 h-3 rounded-full bg-darkblue cursor-move bg-[#3878A2] z-50`}
        style={{
          top: position3.y,
          left: position3.x,
        }}
      />
    ),
    [position3, handleMouseDown3]
  );

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        data-testid="box"
        className="relative flex justify-center items-center w-[300px] h-[300px] border-2 border-darkgray rounded-10"
        ref={containerRef}
      >
        <svg data-testid="svg" className="absolute w-[300px] h-[300px]">
          {renderLine1}
          {renderLine2}
          {renderLine3}
        </svg>
        {renderDot1}
        {renderDot2}
        {renderDot3}
      </div>
    </div>
  );
};

export default App;
