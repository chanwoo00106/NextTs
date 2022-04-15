const SET_COOKIE = "cookie/SET_COOKIE" as const;
const CLEAR_COOKIE = "cookie/CLEAR_COOKIE" as const;

export const set_cookie = (cookie: string) => ({
  type: SET_COOKIE,
  cookie,
});

export const clear_cookie = () => ({
  type: CLEAR_COOKIE,
});

type ActionType = ReturnType<typeof set_cookie | typeof clear_cookie>;

const initialState: string = "";

function cookie(state = initialState, action: ActionType): string {
  switch (action.type) {
    case SET_COOKIE:
      return action.cookie;
    case CLEAR_COOKIE:
      return "";
    default:
      return state;
  }
}

export default cookie;
