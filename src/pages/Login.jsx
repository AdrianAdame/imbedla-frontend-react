/** Material Tailwind */
import {
  Button,
  Checkbox,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";

/** Icon */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faUser } from "@fortawesome/free-solid-svg-icons";
import {
  faApple,
  faFacebook,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";

/** Hooks */
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

/** Endpoints */
import { setCredentials } from "../features/userSlice";
import { useLoginMutation } from "../features/slices/auth/authEndpoints";

/** Forms */
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginApi, { isLoading: isLogginIn }] = useLoginMutation();

  const handleLogin = async (values) => {
    try {
      const userData = await loginApi(values).unwrap();

      dispatch(setCredentials({ ...userData }));

      navigate("/app");
    } catch (err) {
      if (!err?.status) {
        console.log("No server response");
      } else if (err.status === 400) {
        console.log(err.data.msg);
      } else if (err.status === 401) {
        console.log("Unauthorized");
      } else {
        console.log("Login failed");
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required("Please type your email"),
      password: Yup.string().required("Please enter your password"),
    }),
    onSubmit: (values) => handleLogin(values),
  });

  return (
    <>
      <article className=" flex w-full h-screen">
        {/* <Dialog open={true} size="sm">
                    <DialogHeader className="bg-red-400 rounded-t-lg">
                        <div className="mx-auto flex justify-evenly items-center gap-4">
                            <FontAwesomeIcon
                                icon={faXmark}
                                className="p-2 bg-red-100 rounded-full"
                                color="red"
                            />
                            <Typography
                                variant="h3"
                                color="white"
                                className="font-lexend-deca"
                            >
                                Ooops!
                            </Typography>
                        </div>
                    </DialogHeader>
                    <DialogBody className="text-center">
                        <Typography variant="paragraph" className="font-lexend">
                            Login Error
                        </Typography>
                        <Typography variant="paragraph" className="font-lexend">
                            Wrong email or password
                        </Typography>
                    </DialogBody>
                    <DialogFooter>
                        <Button className="bg-red-400">Close</Button>
                    </DialogFooter>
                </Dialog> */}
        <section className="my-auto items-center w-1/2 lg-max:hidden">
          <div className=" bg-blue-gray-500 w-full m-10  rounded-[20px] shadow-2xl">
            <figure className="relative w-full h-100">
              <img
                className="object-cover object-center w-full rounded-lg h-full"
                src="https://images.unsplash.com/photo-1615886717852-ca000f69291a?q=80&w=2673&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />

              <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white/75 py-4 px-6 shadow-lg shadow-black/10 saturate-200 backdrop-blur-md">
                <div>
                  <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    Sara Lamalo
                  </h5>
                  <p className="block mt-2 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                    20 July 2022
                  </p>
                </div>
                <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  Growth
                </h5>
              </figcaption>
            </figure>
          </div>
        </section>
        <section className="flex items-center justify-center h-full w-1/2 lg-max:w-full">
          <div className="flex flex-col justify-center items-center h-full lg:h-fit lg:w-4/6 xl:w-1/2 lg:gap-5 md:gap-8 gap-6 shadow-2xl p-10 lg-max:p-4 rounded-3xl ">
            <div className=" lg:hidden w-5/6 md:w-6/12 lg:w-2/3 rounded-[20px] shadow-2xl md:mb-16">
              <img
                className="object-cover object-center w-full rounded-lg h-100"
                src="https://images.unsplash.com/photo-1615886717852-ca000f69291a?q=80&w=2673&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </div>
            <h1 className=" text-lg font-lexend-exa">Imbedla</h1>
            <Input
              className=" bg-white"
              icon={<FontAwesomeIcon icon={faUser} />}
              color="green"
              label="Email"
              type="email"
              name="email"
              id="email"
              required
              disabled={isLogginIn}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.touched.email)}
            />
            <Input
              className=" bg-white"
              icon={<FontAwesomeIcon icon={faEye} />}
              color="green"
              label="Password"
              type="password"
              name="password"
              required
              disabled={isLogginIn}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={
                formik.touched.password && Boolean(formik.touched.password)
              }
            />

            <div className=" flex justify-between w-full lg:mb-6">
              <Checkbox label="Remember me" color="green" />
              <button
                className="px-2 py-1 font-sans text-xs font-bold text-center text-blue-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Forgot Password?
              </button>
            </div>
            <Button
              color="green"
              onClick={formik.handleSubmit}
              className="w-full"
            >
              Log in
            </Button>

            <div className=" flex flex-col items-center lg:mt-6">
              <h1>
                Or <span className=" text-green-600 font-bold">sign</span> in
                with:
              </h1>
              <div className=" flex flex-row justify-around gap-10 m-5">
                <IconButton className="p-6 flex justify-center items-center w-12 h-12 bg-blue-700 rounded-xl shadow-2xl">
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className=" bg-blue-700 text-white w-6 h-6"
                  />
                </IconButton>
                <IconButton className="p-6 flex justify-center items-center w-12 h-12 bg-white rounded-xl shadow-2xl">
                  <FontAwesomeIcon
                    icon={faGoogle}
                    className=" text-black w-6 h-6 shadow-2xl"
                  />
                </IconButton>
                <IconButton className="p-6 flex justify-center items-center w-12 h-12 bg-black rounded-xl shadow-2xl">
                  <FontAwesomeIcon
                    icon={faApple}
                    className=" text-white w-6 h-6 "
                  />
                </IconButton>
              </div>
              <Typography
                variant="small"
                className="mt-4 mb-2 underline underline-offset-2 cursor-pointer"
                onClick={() => navigate("/register")}
              >
                {`Don't you have an account? Register Here`}
              </Typography>
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

export default Login;
