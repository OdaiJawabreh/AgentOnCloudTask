const express = require("express");
const {
  createAppointments,
  acceptApp,
  rejectApp,
  getAppByPat,
  getAppBydoc,
  SearchDoctor,
  deletApp,
} = require("../controllers/appointment");
const { authentication } = require("../middlewares/authentication");

const appointmentsRouter = express.Router();

appointmentsRouter.post("/", authentication, createAppointments);
appointmentsRouter.put("/acc/:appointments_id", authentication, acceptApp);
appointmentsRouter.put("/rej/:appointments_id", authentication, rejectApp);
appointmentsRouter.get("/pat", authentication, getAppByPat);
appointmentsRouter.get("/doc", authentication, getAppBydoc);
appointmentsRouter.get("/search", SearchDoctor);
appointmentsRouter.delete("/:appointments_id", authentication,deletApp);

module.exports = appointmentsRouter;