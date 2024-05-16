import { createUser } from "./create-user";
import { updateUser } from "./update-user";
import { deleteUser } from "./delete-user";
import { getAllUser } from "./get-all-users";
import { getUser } from "./get-user";
import { verifyUser } from "./verifie-user";
import {
  createTRPCRouter,
} from "~/server/api/trpc";
import { updateUserPassword } from "./update-password";
import { BlockUser, UnBlockUser } from "./block-unblock-user";

export const userRouter = createTRPCRouter({
  createUser , updateUser , deleteUser , getAllUser , getUser , verifyUser , updateUserPassword,
  BlockUser , UnBlockUser
});
