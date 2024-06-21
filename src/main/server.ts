import fastify from "fastify";
import { createUserController } from "presentation/controllers/user/create-user.controller";
import { findAllUsersController } from "presentation/controllers/user/find-all-users.controller";
import { FindUserByEmailController } from "presentation/controllers/user/find-user-by-email.controller";
import { createBookController } from "presentation/controllers/book/create-book.controller";
import { findBookController } from "presentation/controllers/book/find-book.controller";

const app = fastify();

app.register(createUserController);
app.register(FindUserByEmailController);
app.register(findAllUsersController);

app.register(createBookController);
app.register(findBookController);

const PORT = Number(process.env.PORT) || 3000;
const HOST = String(process.env.HOST) || "0.0.0.0";

app.listen({ port: PORT, host: HOST }).then(() => {
  console.log("HTTP server is running!");
});
