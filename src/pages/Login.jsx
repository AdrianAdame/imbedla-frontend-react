import { Button, Checkbox, Input } from "@material-tailwind/react";
import {EyeIcon, UserIcon } from "@heroicons/react/24/solid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faApple,
  faFacebook,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";

const Login = () => {
  return (
  <>
      <article className=" flex w-full h-screen">
        <section className=" flex justify-center items-center w-1/2 lg-max:hidden">
          <div className=" bg-blue-gray-500 w-full h-5/6 m-10  rounded-[20px] shadow-2xl"></div>
        </section>

        <section className="lg:flex lg:items-center lg:justify-center h-full w-1/2 lg-max:w-full">
          <div className="flex flex-col justify-center items-center h-full lg:h-5/6  sm:w-5/6 md:w-1/2 lg:w-4/6 xl:w-1/2 gap-5 shadow-2xl p-10 lg-max:p-4 rounded-3xl ">
            <div className=" lg:hidden  bg-blue-gray-500  w-5/6 lg:w-2/3 h-2/6 rounded-[20px] shadow-2xl"></div>
            <h1 className=" text-lg ">Imbedla</h1>
            <Input
              label="Email"
              type="email"
              className=" bg-white"
              icon={<UserIcon />}
              color="green"
            />
            <Input
              label="Password"
              type="password"
              className=" bg-white"
              icon={<EyeIcon />}
              color="green"
            />

            <div className=" flex justify-around w-full">
              <Checkbox label="Remember me" color="green" />
              <Button color="green">Log in</Button>
            </div>

            <div className=" flex flex-col items-center">
              <h1>
                Or <span className=" text-green-600 font-bold">sign</span> in
                with:
              </h1>
              <div className=" flex flex-row justify-around gap-10 m-5">
                <div className=" flex justify-center items-center w-12 h-12 bg-blue-700 rounded-xl shadow-2xl">
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className=" bg-blue-700 text-white w-6 h-6"
                  />
                </div>
                <div className=" flex justify-center items-center w-12 h-12 bg-white rounded-xl shadow-2xl">
                  <FontAwesomeIcon
                    icon={faGoogle}
                    className=" text- w-6 h-6 shadow-2xl"
                  />
                </div>
                <div className=" flex justify-center items-center w-12 h-12 bg-black rounded-xl shadow-2xl">
                  <FontAwesomeIcon
                    icon={faApple}
                    className=" text-white w-6 h-6 "
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

export default Login