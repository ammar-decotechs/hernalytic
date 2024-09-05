"use client";

import React, { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from 'react-toastify';
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import CustomFormLabel from "@/components/forms/form-label";
import FormControlPasswordSettingInput from "@/components/forms/form-control-password-setting";
import FormControlSettingInput from "@/components/forms/form-control-input-setting";
import {
  ProfileDetailType,
  adminDetailFormValues,
} from "@/definitions/admin-form-schema";
import CustomFormSettingLabel from "@/components/forms/form-setting-label";
import { Button } from "@/components/ui/button";
import {
  defaultResetFormValues,
  resetFormSchema,
} from "@/definitions/auth-form-schemas";
import { useRouter } from "next/navigation";
import { changePassword, updateProfile } from "@/redux/services/auth";
import ProfileDetailsFormWrapper from "../../observer/profile-details-form-wrapper";
import ProfilePasswordFormWrapper from "../../observer/profile-password-form-wrapper";

interface Props {
  profileData?: ProfileDetailType | null;
}

export default function PartnerDetailsForm({
  profileData,
}: Props): React.ReactNode {
  const [loading, setLoading] = useState<string>("");

  const router = useRouter();

  const form = useForm<z.infer<typeof adminDetailFormValues>>({
    resolver: zodResolver(adminDetailFormValues),
    defaultValues: {
      name: `${profileData?.firstname ?? ""} ${profileData?.lastname ?? ""}`,
      email: profileData?.email ?? "",
      gender: profileData?.gender ?? "",
      dob: profileData?.dob ?? "",
      role: profileData?.role ?? "",
      phone: profileData?.phone ?? "",
    },
  });
  const passform = useForm<z.infer<typeof resetFormSchema>>({
    resolver: zodResolver(resetFormSchema),
    defaultValues: defaultResetFormValues,
  });

  useEffect(() => {
    if (profileData) {
      form.reset({
        name: `${profileData.firstname} ${profileData.lastname}`,
        email: profileData.email,
        gender: profileData.gender,
        dob: profileData.dob,
        role: profileData.role,
        phone: profileData.phone,
      });
    }
  }, [profileData, form]);

  async function onSubmit(values: z.infer<typeof adminDetailFormValues>) {

    console.log(values)

    // setLoading("save");
    // const obj: any = {
    //   firstname: values?.name?.split(" ")[0] ?? "",
    //   lastname: values?.name?.split(" ")[1] ?? "",
    //   gender: values?.gender ?? "",
    //   phone: values?.phone ?? "",
    // };
    // const res = await updateProfile(obj);
    // if (res) {
    //   console.log("Profile updated successfully!");
    // }
    // setLoading("");
  }

  async function onSubmitPass(values: z.infer<typeof resetFormSchema>) {

    console.log("password value", values)
    // setLoading("password");
    // const res = await changePassword(values);
    // if (res) {
    //   console.log("Password updated successfully!");
    // }
    // setLoading("");
  }

  return (
    <div className="xl:w-[60%] lg:w-[70%] md:w-[80%] mx-auto mt-28 flex flex-col gap-y-5">
      {/* Personal Details */}
      <div className="px-8 py-10 bg-primary-cGreyFA flex flex-col gap-y-10">
        <ProfileDetailsFormWrapper
          form={form}
          title="Personal Details"
          desc={`User ID: #${profileData?.id}`}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <CustomFormLabel
                  size="small"
                  text="Name"
                  className="text-primary-cDark1D"
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
            disabled
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
            disabled
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
            disabled
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
                <FormMessage className="text-[13px] text-primary-cGrey7B font-normal leading-tight">
                  Minimum of 8 characters with upper and lower case letters, and
                  at least one number
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
                  placeholder="Enter password"
                  field={field}
                  fieldState={fieldState}
                />
                <FormMessage />
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
        className="sm:w-max ml-8 sm:mr-0 mr-8 px-[60px] gap-x-3"
        onClick={() => {
          router.push("/auth/login");
          localStorage.clear();
          toast.success("Logout Successfully")
        }}
      >
        <LogOut className="w-[16px] h-auto" />
        Sign Out
      </Button>
    </div>
  );
}
