import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { TiHome } from "react-icons/ti";
import { Link } from "react-router-dom";
import Input from "../components/Elements/Input";
import { RegisterForm } from "../types/request/formAuth";

const RegisterPage = () => {
  const methods = useForm<RegisterForm>({
    mode: "onTouched",
  });

  const { handleSubmit } = methods;
  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <Link
        to={"/"}
        className="text-white flex items-center gap-2 font-medium hover:text-primary-300"
      >
        <TiHome className="text-xl" />
        Home
      </Link>
      <h2 className="h2 text-white font-semibold">Create Your Account,</h2>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <Input
            id="username"
            label="Username"
            validation={{ required: "Wajib diisi" }}
            placeholder="Masukkan username"
          />
          <Input
            id="email"
            label="Email"
            type="email"
            validation={{ required: "Wajib diisi" }}
            placeholder="Masukkan email"
          />
          <Input
            id="password"
            label="Password"
            type="password"
            validation={{ required: "Wajib diisi" }}
            placeholder="Masukkan password"
          />

          <button
            type="submit"
            className="btn btn-lg btn-outline-primary rounded-full w-fit min-w-32"
          >
            Register
          </button>
        </form>
      </FormProvider>

      <p className="text-white">
        Sudah mempunyai akun?{" "}
        <a
          href="/auth/login"
          className="text-blue-300 hover:text-blue-400 font-medium"
        >
          Login
        </a>
      </p>
    </>
  );
};

export default RegisterPage;
