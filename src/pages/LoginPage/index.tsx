import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "../../components/forms/LoginForm";
import ToastComponent from "../../components/toast";
import { LoginRequest } from "../../interfaces";
import { toastFailed } from "../../utils/util";
import "./style.scss";

export default function LoginPage() {
  const navigate = useNavigate();

  const [data, setData] = useState<LoginRequest>({
    identifier: "",
    password: "",
  });
  const [errors, setError] = useState<LoginRequest>({
    identifier: "",
    password: "",
  });
  const [cookies, setCookie] = useCookies(["admin_token"]);
  const API_URL = process.env.REACT_APP_API_URL;

  const validateError = (name: string, value: string) => {
    let error = "";
    if (name === "identifier") {
      if (value === "") {
        error = "Email, username or phone number is required";
      }
      setError({
        ...errors,
        [name]: error,
      });
    }

    if (name === "password") {
      if (value === "") {
        error = "Password is required";
      }

      if (value.length <= 8 || value.length >= 20) {
        error = "Password must be between 8 to 20 characters";
      }
      setError({
        ...errors,
        [name]: error,
      });
    }
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    validateError(e.target.name, e.target.value);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(API_URL + "/admin-login", requestOptions)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Error 404: Not Found");
          }
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then((res) => {
        if (res.access_token) {
          setCookie("admin_token", res.access_token, { path: "/" });
        }

        navigate("/");
      })
      .catch((error) => {
        toastFailed("Invalid email, username or password");
      });
  };

  return (
    <div className="row vh-100">
      <ToastComponent />
      <div className="col-xl-6 d-flex flex-column justify-content-center login-hero">
        <div className="login-hero-box">
          <div className="login-hero-text">
            <h2 className="login-hero-heading">
              Admin Login <strong className="primary-text">DigiEdu</strong>
            </h2>
            <h3 className="login-hero-subheading">Admin Login</h3>
          </div>
        </div>
      </div>
      <div className="col-xl-6 d-flex justify-content-center align-items-center">
        <LoginForm
          data={data}
          errors={errors}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}
