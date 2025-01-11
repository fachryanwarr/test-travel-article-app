import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { TiHome } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Elements/Input";
import withAuth from "../components/hoc/WithAuth";
import sendRequest from "../lib/getApi";
import { DANGER_TOAST, showToast, SUCCESS_TOAST } from "../lib/toast";
import useAppStore from "../store/useAppStore";
import { LoginForm } from "../types/request/formAuth";
import { AuthResponse } from "../types/response/authResponse";

const LoginPage = () => {
  const login = useAppStore.useLogin();
  const setLoading = useAppStore.useSetLoading();
  const navigate = useNavigate();

  const methods = useForm<LoginForm>({
    mode: "onTouched",
  });

  const { handleSubmit } = methods;
  const onSubmit: SubmitHandler<LoginForm> = async (formData) => {
    const postData = async () => {
      setLoading(true);
      const { isSuccess, data } = await sendRequest<AuthResponse>(
        "POST",
        "/auth/local",
        formData
      );

      setLoading(false);
      if (isSuccess && data) {
        login(data);
        showToast("Login berhasil", SUCCESS_TOAST);
        navigate("/");
      } else {
        showToast("Username atau password salah", DANGER_TOAST);
      }
    };

    postData();
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
      <h2 className="h2 text-white font-semibold">Welcome Back,</h2>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <Input
            id="identifier"
            label="Username / Email"
            validation={{ required: "Wajib diisi" }}
            placeholder="Masukkan username atau email"
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
            Sign In
          </button>
        </form>
      </FormProvider>

      <p className="text-white">
        Belum mempunyai akun?{" "}
        <a
          href="/auth/register"
          className="text-blue-300 hover:text-blue-400 font-medium"
        >
          Daftar Sekarang
        </a>
      </p>
    </>
  );
};

export default withAuth(LoginPage, false);
