import { z } from "zod";

const PASSWORDERRORMESSAGE = "Password is required";
const PASSWORDMINERRORMESSAGE = "Password must be more than 8 characters";
const PASSWORDNOTMATCH = "Passwords don't match";
const PASSPASSWORDPATTERNERRORMESSAGE =
  "Minimum of 8 characters with upper and lower case letters, and at least one number";
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const loginFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: PASSWORDERRORMESSAGE })
    .min(1, PASSWORDERRORMESSAGE)
    .min(8, PASSWORDMINERRORMESSAGE),
});

export interface ILoginFormType {
  email: string;
  password: string;
}

export const defaultLoginFormValues: ILoginFormType = {
  email: "",
  password: "",
};

export const resetFormSchema = z
  .object({
    password: z
      .string({ required_error: PASSWORDERRORMESSAGE })
      .min(8, PASSWORDMINERRORMESSAGE)
      .regex(PASSWORD_REGEX, PASSPASSWORDPATTERNERRORMESSAGE),
      confirm_password: z
      .string({ required_error: PASSWORDNOTMATCH })
      .min(8, PASSWORDNOTMATCH),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: PASSWORDNOTMATCH,
    path: ["confirmNewPassword"],
  });

export interface IResetFormType {
  password: string;
  confirm_password: string;
}

export const defaultResetFormValues: IResetFormType = {
  password: "",
  confirm_password: "",
};
