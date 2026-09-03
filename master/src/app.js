const Koa = require("koa");
const { koaBody } = require("koa-body");
const cors = require("@koa/cors");
const router = require("./routes");
const orm = require("./models");

const app = new Koa();

app.context.orm = orm;

// Middlewares
app.use(cors());
app.use(koaBody());

app.use(router.routes());
app.use(router.allowedMethods()); 

module.exports = app;