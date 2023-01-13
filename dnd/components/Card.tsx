import { useDrag } from "react-dnd";

interface Prop {
  card: { title: string; id: number; description: string };
}

const Card = ({ card }: Prop) => {
  const [{}, drag] = useDrag(() => ({
    type: "kanban",
    item: {
      id: card.id,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        width: "90%",
        height: "10rem",
        background: "skyblue",
        border: "1px solid black",
      }}
    >
      <h3 style={{ margin: "0" }}>{card.title}</h3>
      <p style={{ margin: "0" }}>{card.description}</p>
    </div>
  );
};

export default Card;
