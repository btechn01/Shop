import { forward } from "effector";
import { UsersServices } from "services";
import { $user, fetchUserFx, getUser } from ".";

// Create users services instance
const usersServices = UsersServices.getInstance();

// Fetch user by id
fetchUserFx.use(async (id) => {
  const { data } = await usersServices.getUserById(id);
  return data;
});

$user
  // On fetchUserFx effect success set user to store
  .on(fetchUserFx.doneData, (_, user) => user)
  // On fetchUserFx effect fail, set user to default value
  .reset(fetchUserFx.fail);

// On getUser event trigger, call fetchUserFx via getUser parameter
forward({
  from: getUser,
  to: fetchUserFx,
});
