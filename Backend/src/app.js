import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import pharmacistRoutes from "./routes/pharmacist.routes.js";
import managerRoutes from "./routes/manager.routes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ limit: "20kb" }));
app.use(express.static("public"));

app.use(cookieParser());

app.use("/api/users", userRouter);

app.use("/api/users/appointment", appointmentRoutes);

app.use("/api/appointments", appointmentRoutes);

app.use("/api/doctors", doctorRoutes);

app.use("/api/pharmacist", pharmacistRoutes);

app.use("/api/manager", managerRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/chatbot", chatbotRoutes);

export { app };
