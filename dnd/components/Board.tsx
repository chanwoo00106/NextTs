import { ReactNode, useEffect } from "react";
import { useDrop } from "react-dnd";

interface Prop {
  children?: ReactNode;
}

const Board = ({ children }: Prop) => {
  const [_, drop] = useDrop<{ id: number }>(() => ({
    accept: "kanban",
    drop: (item, monitor) => {
      console.log(item);
    },
  }));

  return (
    <div
      ref={drop}
      style={{
        height: "90vh",
        width: "20rem",
        background: "#fff",
        border: "5px solid #aaa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  );
};

export default Board;
