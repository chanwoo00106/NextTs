interface IProps {
  data: {
    id: number;
    title: string;
    description: string;
  };
}

const Todo = (props: IProps) => {
  return (
    <li key={props.data.id}>
      <h2>{props.data.title}</h2>
      <p>{props.data.description}</p>
    </li>
  );
};

export default Todo;
