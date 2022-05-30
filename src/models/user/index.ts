import { createDomain } from "effector";
import { User } from "types";

// create user domain
export const userDomain = createDomain("user");

// create user store
export const $user = userDomain.createStore<User | null>(null);

// create get user event which will trigger fetchUserFx
export const getUser = userDomain.createEvent<number>();

// create fetch user effect which will be fetch user from server and set it to $user store
export const fetchUserFx = userDomain.createEffect<number, User>();
