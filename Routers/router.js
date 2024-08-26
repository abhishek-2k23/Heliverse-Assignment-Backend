import express from 'express';

//router initialize
const router = express.Router();

//import the contorllers
import { addUser } from '../Controllers/AddUser.controller.js';
import { updateUser } from '../Controllers/UpdateUser.controller.js';
import { deleteUser } from '../Controllers/DeleteUser.controller.js';

router.post("/users",addUser);
router.put("/users/:id",updateUser);
router.delete("/users/:id", deleteUser);


//export
export default router;