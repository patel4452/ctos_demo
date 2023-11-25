"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { AppProps } from "next/app";

interface IFormInput extends FieldValues {
  email: string;
  fullname: string;
  salary: number;
  avatar: string;
  id: number;
}

type Data = {
  id: number;
  email: string;
  fullname: string;
  salary: number;
  avatar: string;
};
export default function EditUser({
  id,
  fullname,
  salary,
  email,
  avatar,
}: Data) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInput>({
    defaultValues: {
      id: id,
      fullname: fullname,
      salary: salary,
      email: email,
      avatar: avatar,
    },
  });

  const router = useRouter();
  const SubmitForm = async (data: IFormInput) => {
    if (data.avatar.length === 1) {
      const raw_avatar = data.avatar[0];
      const formData = new FormData();
      formData.append("file", raw_avatar);
      formData.append("upload_preset", "ctosfileupload");
      const uploadResponse = await fetch(
        "https://api.cloudinary.com/v1_1/ddg9aginh/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const uploadedImageData = await uploadResponse.json();
      const imageUrl = uploadedImageData.secure_url;
      data.avatar = imageUrl;
    } else {
      data.avatar = avatar;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/employees/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (res.ok) {
        reset();
        router.push("/");
      } else {
        throw new Error("Employee not Added");
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(errors.salary);
  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={handleSubmit(SubmitForm)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="fullname"
          >
            Name
          </label>
          <input
            id="fullname"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("fullname", { required: "Name is required" })}
            aria-invalid={errors.fullname ? "true" : "false"}
          />
          {errors.fullname && <p role="alert">{errors.fullname.message}</p>}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("email", {
              required: "Email Address is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && <p role="alert">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="salary"
          >
            Salary
          </label>
          <input
            id="salary"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            {...register("salary", {
              required: "Salary is not correct",
              minLength: {
                value: 0,
                message: "Salary should have valid numbers",
              },
              pattern: {
                value: /^[0-9]+$/i,
                message: "Salary should have valid numbers",
              },
            })}
            aria-invalid={errors.salary ? "true" : "false"}
          />
          {errors.salary && <p role="alert">{errors.salary.message}</p>}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Avatar
          </label>
          <input
            id="avatar"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
            {...register("avatar", {})}
          />
        </div>

        <input
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        />
      </form>
    </div>
  );
}
