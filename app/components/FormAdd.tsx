"use client";

import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  email: string;
  fullname: string;
  salary: number;
  avatar: file;
}

export default function FormAdd() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm();

  const router = useRouter();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(JSON.stringify(data));
    try {
      await fetch("http://localhost:3000/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      reset;
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={handleSubmit(onSubmit)}
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
            })}
            ria-invalid={errors.salary ? "true" : "false"}
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
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        />
      </form>
    </div>
  );
}
