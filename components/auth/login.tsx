"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthFormWrapper from "./auth-form-wrapper";
import {
  defaultLoginFormValues,
  loginFormSchema,
} from "@/definitions/auth-form-schemas";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import CustomFormLabel from "../forms/form-label";
import FormControlInput from "../forms/form-control-input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormControlPasswordInput from "../forms/form-control-password";
import { useRouter } from "next/navigation";
import { login } from "@/redux/services/auth";
import { useAppSelector } from "@/redux/hooks";

export default function LoginForm(): React.ReactNode {
  const router = useRouter();
  const { loading } = useAppSelector((state: any) => state.auth);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: defaultLoginFormValues,
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    const res = await login(values);
    if (res) {
      if (res?.data?.has_cp == false) {
        router.push("/auth/changepassword");
      } else {
        router.push(`/${res?.data?.role}`);
      }
    }
  }

  useEffect(()=>{
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('user_role');
    if(token){
      if(role === 'admin'){
       return router.push('/admin');
      }
      if(role === 'observer'){
        return router.push('/observer');
      }
      if(role === 'partner'){
        return router.push('/partner');
      }
    }
  },[]);

  return (
    <AuthFormWrapper
      form={form}
      title="Welcome back!"
      desc="Login to access your account"
    >
      <div className="space-y-4">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <CustomFormLabel text="Email Address *" />
                <FormControlInput
                  placeholder="Email Address"
                  field={field}
                  fieldState={fieldState}
                  type="email"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <CustomFormLabel text="Password *" />
                <FormControlPasswordInput
                  placeholder="Enter password"
                  field={field}
                  fieldState={fieldState}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full !mt-[60px]">
          <button
            type="button"
            onClick={form.handleSubmit(onSubmit)}
            className="w-full py-[15px] bg-primary-cGreen74 text-center text-white font-medium rounded"
          >
            {loading ? <span className="loader" /> : "LOG IN"}
          </button>
        </div>
      </div>
    </AuthFormWrapper>
  );
}
