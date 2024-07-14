import { UserType } from "../../types/User";

import { AuthAction } from "./types";

export const login = (user: UserType): AuthAction => ({
  type: 'LOGIN',
  payload: user,
});

export const logout = (): AuthAction => ({
  type: 'LOGOUT',
});
