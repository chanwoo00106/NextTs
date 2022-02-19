const JOINED_ROOM = "myRoom/JOINED_ROOM" as const;
const LEAVE_ROOM = "myRoom/LEAVE_ROOM" as const;
const CHANGE_NICKNAME = "myRoom/CHANGE_NICKNAME" as const;

export const joined_room = ({ key, name }: { key: string; name: string }) => ({
  type: JOINED_ROOM,
  payload: { key, name },
});

export const leave_room = () => ({
  type: LEAVE_ROOM,
});

export const change_nickname = (nickname: string) => ({
  type: CHANGE_NICKNAME,
  nickname,
});

type ActionType =
  | ReturnType<typeof joined_room>
  | ReturnType<typeof leave_room>
  | ReturnType<typeof change_nickname>;

const initialState = {
  key: "",
  name: "",
  nickname: "",
};

interface initialStateType {
  key: string;
  name: string;
  nickname: string;
}

export default function myRoom(
  state: initialStateType = initialState,
  action: ActionType
): initialStateType {
  switch (action.type) {
    case JOINED_ROOM:
      return { ...state, ...action.payload };
    case LEAVE_ROOM:
      return { ...state, key: "", name: "" };
    case CHANGE_NICKNAME:
      return { ...state, nickname: action.nickname };
    default:
      return state;
  }
}
