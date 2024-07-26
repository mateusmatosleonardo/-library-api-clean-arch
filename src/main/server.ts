import fastify from "fastify"
import { saveBookController } from "@/presentation/controllers/book/save-book.controller"
import { findBookController } from "@/presentation/controllers/book/find-book.controller"
import { deleteBookController } from "@/presentation/controllers/book/delete-book.controller"
import { saveUserController } from "@/presentation/controllers/user/save-user.controller"
import { findAllUsersController } from "@/presentation/controllers/user/find-all-users.controller"
import { FindUserByEmailController } from "@/presentation/controllers/user/find-user-by-email.controller"
import { saveLoanController } from "@/presentation/controllers/loan/save-loan.controller"

const app = fastify()

app.register(saveUserController)
app.register(FindUserByEmailController)
app.register(findAllUsersController)

app.register(saveBookController)
app.register(findBookController)
app.register(deleteBookController)

app.register(saveLoanController)

const PORT = Number(process.env.PORT) || 3000
const HOST = String(process.env.HOST) || "0.0.0.0"

app.listen({ port: PORT, host: HOST }).then(() => {
  console.log("HTTP server is running!")
})
