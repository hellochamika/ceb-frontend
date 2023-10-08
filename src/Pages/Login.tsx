import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ZodType, z } from "zod";
import { useAuth } from "../Providers/AuthProvider";
import axiosClient from "../axiosClient";

type FormData = {
  email: string;
  password: string;
};

function Login() {
  const schema: ZodType<FormData> = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(8, { message: "Minimum 8 characters" }),
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

  async function handleLogin(data: FormData) {
    const { email, password } = data;
    await axiosClient()
      .post("/auth/login", { email, password })
      .then((response) => {
        setToken(response.data.data.token);
        localStorage.setItem("token", response.data.data.token);
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Login Success",
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
      <h1 className="text-3xl">Login</h1>
      <form className="flex flex-col m-5" onSubmit={handleSubmit(handleLogin)}>
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
          className="border border-gray-400 m-1 p-2 rounded bg-slate-300 text-center cursor-pointer"
          value={"Login"}
          type="submit"
        />
      </form>
    </div>
  );
}

export default Login;
