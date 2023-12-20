import { useContext, useState } from "react";
import { validateInput } from "../common/helpers";
import { LoginCredentials } from "../models/auth";
import { login } from "../services/auth-service";
import { Link, useNavigate } from "react-router-dom";
import FormError from "../errors/form-error";
import { UserSessionContext } from "../common/auth/auth-provider";
import { setToken } from "../common/auth/storage";

export default function LoginPage() {
  const [hasError, setHasError] = useState(false);
  const [errorMessages, setErrorMessage] = useState({ [""]: [""] });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { userContext, updateUserContext } = useContext(UserSessionContext)!;

  async function handleSubmit(event: any) {
    event.preventDefault();

    setIsLoading(true);
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!validateInput(email)) {
      setErrorMessage({ [""]: ["email can't be blank"] });
      setHasError(true);
      setIsLoading(false);
      return;
    }

    if (!validateInput(password)) {
      setErrorMessage({ [""]: ["password can't be blank"] });
      setHasError(true);
      setIsLoading(false);
      return;
    }

    const credentials: LoginCredentials = {
      email: email,
      password: password,
    };
    const response = await login(credentials);
    if (!response.ok) {
      if (response.status == 403 || response.status == 422) {
        setHasError(true);
        const data = await response.json();
        data.status == "error"
          ? setErrorMessage({ [""]: [data.message] })
          : setErrorMessage(data.errors);
      } else {
        setHasError(true);
        setErrorMessage({ [""]: ["unknown error"] });
      }
    } else {
      const data = await response.json();
      const user = data.user;

      updateUserContext!({
        username: user.usernam,
        image: user.image,
        authToken: user.token,
        isLoggedIn: true,
      });
      console.log(userContext);
      setToken(user.token);
      console.log("Login successful");
      navigate("/");
    }

    setIsLoading(false);
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <Link to="/register">Need an account?</Link>
            </p>
            {hasError && <FormError errors={errorMessages} />}

            <form onSubmit={handleSubmit}>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  name="email"
                  type="email"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button
                className="btn btn-lg btn-primary pull-xs-right"
                type="submit"
                disabled={isLoading}
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
