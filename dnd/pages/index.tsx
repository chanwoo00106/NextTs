import { useState } from "react";
import Board from "../components/Board";
import Card from "../components/Card";

const list = [...Array(5)].map((_, id) => ({
  id,
  title: `Number ${id}`,
  description: `My name is number ${id}`,
}));

export default function Home() {
  const [cards, setCards] = useState(list);

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
      }}
    >
      <Board>
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </Board>
      <Board></Board>
    </div>
  );
}
