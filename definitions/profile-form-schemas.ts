import { z } from "zod";

const PASSWORDERRORMESSAGE = "Password is required";
const PASSWORDMINERRORMESSAGE = "Password must be more than 8 characters";
const PASSWORDNOTMATCH = "Passwords don't match";
const PASSPASSWORDPATTERNERRORMESSAGE =
  "Minimum of 8 characters with upper and lower case letters, and at least one number";
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const profleDetailFormValues = z.object({
  name: z.string(),
  email: z.any(),
  gender: z.string(),
  dob: z.any(),
  role: z.any(),
  phone: z.string(),

});

export const profleDetailPasswordFormValues = z.object({
  newPassword: z
    .string({ required_error: PASSWORDERRORMESSAGE })
    .min(8, PASSWORDMINERRORMESSAGE)
    .regex(PASSWORD_REGEX, PASSPASSWORDPATTERNERRORMESSAGE),
  confirmNewPassword: z
    .string({ required_error: PASSWORDNOTMATCH })
    .min(8, PASSWORDNOTMATCH),
});

export interface ProfileDetailFormType {
  name: string;
  email?: string;
  gender: string;
  dob: string;
  role: string;
  phone: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const defaultProfileDetailFormValues: ProfileDetailFormType = {
  name: "",
  email: "",
  gender: "",
  dob: "",
  role: "",
  phone: "",
  newPassword: "",
  confirmNewPassword: "",
};

export interface ProfileDetailType {
  id: string | number;
  firstname: string;
  lastname: string;
  email: string;
  dob: string;
  phone: string;
  role: string | null;
  org_uid?: string;
  gender? : string;
  access_token?: string | null;
}
