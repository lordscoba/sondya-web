import { useEffect, useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineRight,
} from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";
import { AuthImage } from "../../../images";
import { loginAction } from "../../../redux/actions/auth.actions";
import { userJoinGroupchatAction } from "../../../redux/actions/userDashboard/groupchat.actions";
import { ReducersType } from "../../../redux/store";
import { LoginType } from "../../../redux/types/auth.types";
import { ReduxResponseType } from "../../../redux/types/general.types";

const LoginBody = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //handle form
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // when the person is brougth here by the join now button
  const redirect = location?.state?.redirect;
  const group = location?.state?.currentGroup;

  const [formData, setFormData] = useState<LoginType>({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginRedux = useSelector(
    (state: ReducersType) => state?.login
  ) as ReduxResponseType;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
      dispatch(loginAction(formData) as any);
    }
  };

  useEffect(() => {
    // loginRedux?.error &&
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     timer: 5000,
    //     text: loginRedux?.error,
    //   });
    loginRedux?.success &&
      Swal.fire({
        icon: "success",
        title: "Successful",
        timer: 3000,
        text: loginRedux?.serverResponse?.message,
      });
    if (loginRedux?.success) {
      setTimeout(function () {
        if (redirect) {
          if (group) {
            dispatch(userJoinGroupchatAction(group._id || "") as any);
            navigate(redirect, { state: { currentGroup: group } });
          } else {
            navigate(redirect);
          }
        } else if (loginRedux?.serverResponse?.data?.type === "user") {
          navigate("/dashboard");
        } else if (loginRedux?.serverResponse?.data?.type === "admin") {
          navigate("/admin/dashboard");
        }
        setFormData({
          email: "",
          password: "",
        });
        // dispatch({ type: LOGIN_RESET });
      }, 4000);
    }
  }, [navigate, loginRedux, dispatch, redirect, group]);

  console.log(loginRedux);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row items-center gap-1 bg-[#F2F4F5] text-[#5F6C72] p-5">
        <FaHome /> <span>Home</span> <AiOutlineRight />{" "}
        <span>User Account</span> <AiOutlineRight />{" "}
        <span className="text-[#EDB842]">Sign In</span>
      </div>
      <div className="flex flex-row py-16 md:py-6">
        <div className="w-1/2 hidden md:flex">
          <img src={AuthImage} alt="" />
        </div>
        <div className="w-full md:w-1/2 my-auto">
          <div className="w-5/6 mx-auto">
            <form
              className="flex flex-col text-center md:text-left gap-5"
              onSubmit={handleSubmit}
            >
              <div className="font-[700] text-[26px]">Log in to Sondya</div>
              <div className="font-[600] text-[13px]">
                Enter your details below
              </div>
              <div className="">
                <input
                  name="email"
                  className="border-b-2 outline-none w-full md:w-2/3 focus:border-b-[#EDB842]"
                  placeholder="Email"
                  type="text"
                  // autoFocus={true}
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className="">
                <div className="flex flex-row items-center mx-auto md:ms-0  w-full md:w-2/3 justify-between border-b-2 focus:border-b-[#EDB842] hover:border-b-[#EDB842]">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="6+ characters"
                    className="outline-none rounded-md p-2 m-0"
                    value={password}
                    onChange={onChange}
                  />
                  <button
                    className="text-xl p-1 m-0"
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </button>
                </div>
              </div>
              {loginRedux?.error && (
                <div className="text-[#DB4444]">{loginRedux?.error}</div>
              )}
              <div className="flex flex-row items-center justify-between w-full md:w-2/3 self-center md:self-start">
                <button className="px-6 py-2 text-white bg-[#EDB842] rounded-md self-center md:self-start whitespace-nowrap">
                  {loginRedux?.loading ? (
                    <div className="" style={{ height: "25px" }}>
                      <PulseLoader color="#ffffff" />
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>
                <span
                  onClick={() => navigate("/forgot-password")}
                  className="text-[#DB4444]"
                >
                  Forget Password?
                </span>
              </div>
              <div className="">
                <button
                  onClick={() => navigate("/register")}
                  className="text-[#EDB842] px-4 py-2 border border-[#EDB842] rounded-md w-full md:w-2/3 self-center md:self-start"
                >
                  Don't have an account? Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBody;
