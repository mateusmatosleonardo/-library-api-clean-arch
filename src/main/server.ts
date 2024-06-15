import fastify from "fastify";

const app = fastify();

app.listen({ port: 1234, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server is running!");
});
