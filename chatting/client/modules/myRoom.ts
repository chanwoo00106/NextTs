const JOINED_ROOM = "myRoom/JOINED_ROOM" as const;
const LEAVE_ROOM = "myRoom/LEAVE_ROOM" as const;

export const joined_room = ({ key, name }: { key: string; name: string }) => ({
  type: JOINED_ROOM,
  payload: { key, name },
});

export const leave_room = () => ({
  type: LEAVE_ROOM,
});

type ActionType =
  | ReturnType<typeof joined_room>
  | ReturnType<typeof leave_room>;

const initialState = {
  key: "",
  name: "",
};

interface initialStateType {
  key: string;
  name: string;
}

export default function myRoom(
  state: initialStateType = initialState,
  action: ActionType
): initialStateType {
  switch (action.type) {
    case JOINED_ROOM:
      return { ...action.payload };
    case LEAVE_ROOM:
      return { key: "", name: "" };
    default:
      return state;
  }
}
