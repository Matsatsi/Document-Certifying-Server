const express = require("express");
const router = express.Router();
const userRouter = require("./users");
const rootRouter = require("./root");
const appRouter = require("./app");
const docRouter = require("./docs");
const reportRouter = require("./reports");

router.use("/", userRouter);
router.use("/", rootRouter);
router.use("/", docRouter);
router.use("/", reportRouter);
rootRouter.use("/", appRouter);

module.exports = router;
