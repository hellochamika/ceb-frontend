import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ZodType, z } from "zod";
import { useAuth } from "../Providers/AuthProvider";
import axiosClient from "../axiosClient";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function RegisterMeterReader() {
  const schema: ZodType<FormData> = z
    .object({
      firstName: z.string().min(3, { message: "Minimum 3 characters" }),
      lastName: z.string().min(3, { message: "Minimum 3 characters" }),
      email: z.string().email({ message: "Invalid email" }),
      password: z.string().min(8, { message: "Minimum 8 characters" }),
      confirmPassword: z.string().min(8, { message: "Minimum 8 characters" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { setToken } = useAuth();

  const navigate = useNavigate();

  async function handleRegister(data: FormData) {
    const { firstName, lastName, email, password } = data;
    await axiosClient()
      .post("/auth/register", { firstName, lastName, email, password })
      .then((response) => {
        setToken(response.data.data.token);
        localStorage.setItem("token", response.data.data.token);
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Successfully registered",
        });
		navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      });
  }

  return (
    <div className="conntainer flex flex-col items-center">
      <h1 className="text-3xl">Register</h1>
      <form className="flex flex-col m-5" onSubmit={handleSubmit(handleRegister)}>
        <input
          className="border border-gray-400 m-1 p-2 rounded"
          type="text"
          placeholder="First Name"
          {...register("firstName")}
        />
        <div className="text-red-500 text-center">
          {errors.firstName?.message}
        </div>

        <input
          className="border border-gray-400 m-1 p-2 rounded"
          type="text"
          placeholder="Last Name"
          {...register("lastName")}
        />
        <div className="text-red-500 text-center">
          {errors.lastName?.message}
        </div>

        <input
          className="border border-gray-400 m-1 p-2 rounded"
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        <div className="text-red-500 text-center">{errors.email?.message}</div>

        <input
          className="border border-gray-400 m-1 p-2 rounded"
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <div className="text-red-500 text-center">
          {errors.password?.message}
        </div>

        <input
          className="border border-gray-400 m-1 p-2 rounded"
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />
        <div className="text-red-500 text-center">
          {errors.confirmPassword?.message}
        </div>

        <input
          className="border border-gray-400 m-1 p-2 rounded bg-slate-300 text-center cursor-pointer"
          value={"Register"}
          type="submit"
        />
      </form>
    </div>
  );
}

export default RegisterMeterReader;
