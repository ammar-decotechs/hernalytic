"use client";

import React, { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import CustomFormLabel from "@/components/forms/form-label";
import ProfilePasswordFormWrapper from "../../observer/profile-password-form-wrapper";
import FormControlPasswordSettingInput from "@/components/forms/form-control-password-setting";
import ProfileDetailsFormWrapper from "../../observer/profile-details-form-wrapper";
import { useAppSelector } from "@/redux/hooks";
import FormControlSettingInput from "@/components/forms/form-control-input-setting";
import { profleDetailFormValues } from "@/definitions/profile-form-schemas";
import CustomFormSettingLabel from "@/components/forms/form-setting-label";
import { Button } from "@/components/ui/button";
import { defaultResetFormValues } from "@/definitions/auth-form-schemas";
import { useRouter } from "next/navigation";
import { getProfile } from "@/services/auth";
import { changePassword, updateProfile } from "@/redux/services/auth";

const resetFormSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must include upper and lower case letters, and at least one number"
    ),
  confirm_password: z.string().min(8, "Confirm Password must be at least 8 characters long"),
}).refine(data => data.password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"],
});

export default function AdminDetailsForm(): React.ReactNode {
  const [loading, setLoading] = useState<string>("");
  const { id, firstname, lastname, email, dob, phone, role, gender } = useAppSelector(state => state.user);
  const router = useRouter();

  const form = useForm<z.infer<typeof profleDetailFormValues>>({
    resolver: zodResolver(profleDetailFormValues),
    defaultValues: {
      name: `${firstname ?? ""} ${lastname ?? ""}`,
      email: email ?? "",
      gender: gender ?? "",
      dob: dob ?? "",
      role: role ?? "",
      phone: phone ?? "",
    },
  });

  const passform = useForm<z.infer<typeof resetFormSchema>>({
    resolver: zodResolver(resetFormSchema),
    defaultValues: defaultResetFormValues,
  });


  async function onSubmit(values: z.infer<typeof profleDetailFormValues>) {
    setLoading("save");
    const obj: any = {
      firstname: values?.name?.split(" ")[0] ?? "",
      lastname: values?.name?.split(" ")[1] ?? "",
      gender: values?.gender ?? "",
      phone: values?.phone ?? "",
    };
    const res = await updateProfile(obj);
    if (res) {
      console.log("Profile updated successfully!");
    }
    setLoading("");
  }

  async function onSubmitPass(values: z.infer<typeof resetFormSchema>) {
    setLoading("password");
    const res = await changePassword(values);
    if (res) {
      console.log("Password updated successfully!");
      toast.success("Password Updated Successfully");
      router.push(`/${res?.data?.role}`);
    } else {
      toast.error("Failed to Update Password");
    }
    setLoading("");
  }

  useEffect(() => {
    form.reset({
      name: `${firstname} ${lastname}`,
      email: email,
      gender: gender,
      dob: dob,
      role: role,
      phone: phone,
    });
  }, [firstname, lastname, email, gender, dob, role, phone, form]);

  useEffect(()=>{
    getProfile();
  },[])

  return (
    <div className="xl:w-[60%] mx-auto lg:w-[70%] md:w-[80%] flex flex-col gap-y-5">
      {/* Personal Details */}
      <div className="px-8 py-10 bg-primary-cGreyFA flex flex-col gap-y-10">
        <ProfileDetailsFormWrapper
          form={form}
          title="Personal Details"
          desc={`User ID: #${id}`}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <CustomFormLabel
                  size="small"
                  text="Name"
                  className="text-primary-cDark1D "
                />
                <FormControlSettingInput
                  placeholder="Jane Cooper"
                  field={field}
                  fieldState={fieldState}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <CustomFormLabel
                  size="small"
                  text="Email Address"
                  className="text-primary-cDark1D"
                />
                <FormControlSettingInput
                  placeholder="janecooper@gmail.com"
                  field={field}
                  fieldState={fieldState}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field, fieldState }) => (
              <FormItem>
                <CustomFormLabel
                  size="small"
                  text="Gender"
                  className="text-primary-cDark1D"
                />
                <FormControlSettingInput
                  placeholder="Male"
                  field={field}
                  fieldState={fieldState}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dob"
            render={({ field, fieldState }) => (
              <FormItem>
                <CustomFormLabel
                  size="small"
                  text="Date of Birth"
                  className="text-primary-cDark1D"
                />
                <FormControlSettingInput
                  placeholder="07 / 07 / 2001"
                  field={field}
                  fieldState={fieldState}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field, fieldState }) => (
              <FormItem>
                <CustomFormLabel
                  size="small"
                  text="Role"
                  className="text-primary-cDark1D"
                />
                <FormControlSettingInput
                  placeholder="Observer"
                  field={field}
                  fieldState={fieldState}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field, fieldState }) => (
              <FormItem>
                <CustomFormLabel
                  size="small"
                  text="Mobile No"
                  className="text-primary-cDark1D"
                />
                <FormControlSettingInput
                  placeholder="123 4567 8901"
                  field={field}
                  fieldState={fieldState}
                />
              </FormItem>
            )}
          />
          <Button
            variant={"default"}
            className="sm:w-max w-full px-[40px]"
            onClick={form.handleSubmit(onSubmit)}
          >
            {loading === "save" ? <span className="loader" /> : "Save"}
          </Button>
        </ProfileDetailsFormWrapper>
      </div>

      {/* Password Info */}
      <div className="px-8 py-10 bg-primary-cGreyFA flex flex-col gap-y-10">
        <ProfilePasswordFormWrapper
          form={passform}
          title="Password Information"
          desc=""
        >
          <FormField
            control={passform.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <CustomFormSettingLabel
                  field={field}
                  text="New Password *"
                  className="text-primary-cDark1D"
                />
                <FormControlPasswordSettingInput
                  placeholder="Enter password"
                  field={field}
                  fieldState={fieldState}
                />
                <FormMessage className="text-[13px] text-red-700 font-normal leading-tight">
                  {fieldState.error?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={passform.control}
            name="confirm_password"
            render={({ field, fieldState }) => (
              <FormItem>
                <CustomFormSettingLabel
                  field={field}
                  text="Confirm Password *"
                  className="text-primary-cDark1D"
                />
                <FormControlPasswordSettingInput
                  placeholder="Confirm password"
                  field={field}
                  fieldState={fieldState}
                />
                <FormMessage className="text-[13px] text-red-700 font-normal leading-tight">
                  {fieldState.error?.message}
                </FormMessage>
              </FormItem>
            )}
          />
        </ProfilePasswordFormWrapper>

        <Button
          variant={"default"}
          className="sm:w-max w-full px-[40px]"
          onClick={passform.handleSubmit(onSubmitPass)}
        >
          {loading === "password" ? (
            <span className="loader" />
          ) : (
            "Change Password"
          )}
        </Button>
      </div>

      <Button
        variant={"outline"}
        className="sm:w-max ml-8 sm:mr-0 mr-8 w-[90%] mt-6"
      >
        <LogOut className="mr-2 h-4 w-4" /> Log Out
      </Button>
    </div>
  );
}
