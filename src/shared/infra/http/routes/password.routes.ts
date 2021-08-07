import { ResetUserPasswordController } from "@modules/accounts/useCases/resetUserPassword/ResetUserPasswordController";
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetUserPasswordMailController = new ResetUserPasswordController();

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", resetUserPasswordMailController.handle);

export { passwordRoutes };
