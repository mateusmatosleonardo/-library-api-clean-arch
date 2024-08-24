import fastify from "fastify"
import fastifyCors from "@fastify/cors"

import { saveUserController } from "@/presentation/controllers/user/save-user.controller"
import { findAllUsersController } from "@/presentation/controllers/user/find-all-users.controller"
import { findUserByEmailController } from "@/presentation/controllers/user/find-user-by-email.controller"
import { updateUserController } from "@/presentation/controllers/user/update-user.controller"
import { deleteUserController } from "@/presentation/controllers/user/delete-user.controller"

import { saveBookController } from "@/presentation/controllers/book/save-book.controller"
import { findBookController } from "@/presentation/controllers/book/find-book.controller"
import { deleteBookController } from "@/presentation/controllers/book/delete-book.controller"
import { saveLoanController } from "@/presentation/controllers/loan/save-loan.controller"

const app = fastify()

app.register(fastifyCors, {
  origin: "*"
})

app.register(saveUserController)
app.register(findAllUsersController)
app.register(findUserByEmailController)
app.register(updateUserController)
app.register(deleteUserController)

app.register(saveBookController)
app.register(findBookController)
app.register(deleteBookController)

app.register(saveLoanController)

const PORT = Number(process.env.PORT) || 3000
const HOST = String(process.env.HOST) || "0.0.0.0"

app.listen({ port: PORT, host: HOST }).then(() => {
  console.log("Server is running!📡")
})
