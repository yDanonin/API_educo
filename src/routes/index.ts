import { Router } from "express";

import usersRouter from "./users.routes";
import sessionsRouter from "./sessions.routes";
import imagesRouter from "./images.routes";
import groupsRouter from "./groups.routes";
import participantsRouter from "./participants.routes";
import postsRouter from "./posts.routes";


const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/images',imagesRouter);
routes.use('/groups', groupsRouter);
routes.use('/participants', participantsRouter)
routes.use('/posts', postsRouter);


export default routes

