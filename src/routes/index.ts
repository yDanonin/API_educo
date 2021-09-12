import { Router } from "express";

import usersRouter from "./users.routes";
import sessionsRouter from "./sessions.routes";
import imagesRouter from "./images.routes";

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/images',imagesRouter);

export default routes

