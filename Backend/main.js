const express=require('express');
const cors = require('cors');
require("./db/db")
const app=express()
app.use(express.json());
app.use(cors());
// import Routers
const doctorRouter = require("./routers/routes/doctor");
const patientRouter = require("./routers/routes/Patient");
const loginRouter = require("./routers/routes/login");
const appointmentsRouter = require("./routers/routes/appointment");
// Routers
app.use("/signDoc", doctorRouter);
app.use("/signPit", patientRouter);
app.use("/login", loginRouter);
app.use("/app", appointmentsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server On ${PORT}`);
});
