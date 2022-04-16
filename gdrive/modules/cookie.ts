const SET_COOKIE = "cookie/SET_COOKIE" as const;
const CLEAR_COOKIE = "cookie/CLEAR_COOKIE" as const;

export const set_cookie = (cookie: string, expiredAt: string) => ({
  type: SET_COOKIE,
  payload: {
    cookie,
    expiredAt,
  },
});

export const clear_cookie = () => ({
  type: CLEAR_COOKIE,
});

type ActionType = ReturnType<typeof set_cookie | typeof clear_cookie>;

interface InitialStateType {
  cookie: string;
  expiredAt: string;
}

const initialState: InitialStateType = {
  cookie: "",
  expiredAt: "",
};

function cookie(state = initialState, action: ActionType): InitialStateType {
  switch (action.type) {
    case SET_COOKIE:
      return { ...action.payload };
    case CLEAR_COOKIE:
      return { cookie: "", expiredAt: "" };
    default:
      return state;
  }
}

export default cookie;
