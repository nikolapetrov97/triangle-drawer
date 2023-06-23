import { useCallback, useEffect, useState } from "react";

type Props = {
  ref: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  initialPosition: { x: number; y: number };
};

export const useDrag = ({ ref, containerRef, initialPosition }: Props) => {
  const [calculatedPosition, setCalculatedPosition] = useState<{
    x: number;
    y: number;
  }>(initialPosition);
  const [dragInfo, setDragInfo] = useState<{
    startX: number;
    startY: number;
    top: number;
    left: number;
    width: number;
    height: number;
  }>();
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // SETTING BOUNDS TO THE FINAL POSITION
  const setPositionBounds = useCallback(
    (width: any, height: any, x: any, y: any) => {
      if (!containerRef.current) return;
      setCalculatedPosition({
        x: Math.min(
          Math.max(0, x),
          containerRef.current.getBoundingClientRect().width - width
        ),
        y: Math.min(
          Math.max(0, y),
          containerRef.current.getBoundingClientRect().height - height
        ),
      });
    },
    []
  );

  const handleMouseUp = (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent> | MouseEvent
  ) => {
    evt.preventDefault();
    setIsDragging(false);
  };

  const handleMouseDown = (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent | MouseEvent>
  ) => {
    evt.preventDefault();
    const { clientX, clientY } = evt;
    if (!ref?.current) {
      return;
    }
    const { top, left, width, height } = ref.current.getBoundingClientRect();
    setIsDragging(true);
    setDragInfo({
      startX: clientX,
      startY: clientY,
      top,
      left,
      width,
      height,
    });
  };

  const handleMouseMove = useCallback(
    (evt: React.MouseEvent<HTMLDivElement, MouseEvent> | MouseEvent) => {
      if (!isDragging || !ref.current) return;
      evt.preventDefault();
      const { clientX, clientY } = evt;
      if (!dragInfo) return;
      const position = {
        x: dragInfo.startX - clientX,
        y: dragInfo.startY - clientY,
      };
      const { top, left, width, height } = dragInfo;
      const container = containerRef.current;
      if (!container) return;
      const { top: containerTop, left: containerLeft } =
        container.getBoundingClientRect();

      setPositionBounds(
        width,
        height,
        left - position.x - containerLeft,
        top - position.y - containerTop
      );
    },
    [isDragging, dragInfo, ref, setPositionBounds]
  );

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove]);

  return {
    position: calculatedPosition,
    handleMouseDown,
  };
};
