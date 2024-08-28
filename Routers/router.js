import express from 'express';

//router initialize
const router = express.Router();

//import the contorllers
import { addUser } from '../Controllers/AddUser.controller.js';
import { updateUser } from '../Controllers/UpdateUser.controller.js';
import { deleteUser } from '../Controllers/DeleteUser.controller.js';
import { getUsers, searchUser } from '../Controllers/GetUser.controller.js';
import { createTeam } from '../Controllers/CreateTeam.controller.js';
import { addUsersToTeam } from '../Controllers/AddUser.team.controller.js';
import { getTeam } from '../Controllers/GetTeam.controller.js';
import { deleteTeam } from '../Controllers/DeleteTeam.controller.js';

router.post("/users",addUser);
router.put("/users/:id",updateUser);
router.delete("/users/:id", deleteUser);
router.get("/users",getUsers);
router.get("/users/search",searchUser);

router.post("/team/create",createTeam);
router.post("/team/addUser/:teamId",addUsersToTeam);
router.get("/team/getTeam", getTeam);
router.delete("/team/deleteTeam/:id", deleteTeam);


//export
export default router;