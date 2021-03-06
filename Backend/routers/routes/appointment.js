const express = require("express");
const {
  createAppointments,
  acceptApp,
  rejectApp,
  getAppByPat,
  getAppBydoc,
  SearchDoctor,
  deletApp,
  updateApp,
  gitAllDoctors,
  getSubmitedApp
} = require("../controllers/appointment");
const { authentication } = require("../middlewares/authentication");

const appointmentsRouter = express.Router();

appointmentsRouter.post("/", authentication, createAppointments);
appointmentsRouter.put("/acc/:appointments_id", acceptApp);
appointmentsRouter.put("/rej/:appointments_id",  rejectApp);
appointmentsRouter.get("/pat", authentication, getAppByPat);
appointmentsRouter.get("/doc", authentication, getAppBydoc);
appointmentsRouter.get("/sub/doc", authentication, getSubmitedApp);
appointmentsRouter.get("/doctors",  gitAllDoctors);
appointmentsRouter.post("/search", SearchDoctor);
appointmentsRouter.delete("/:appointments_id", authentication,deletApp);
appointmentsRouter.put("/:appointments_id", updateApp);

module.exports = appointmentsRouter;
