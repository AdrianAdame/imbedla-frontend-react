/** Hooks */
import { useNavigate } from "react-router"

/** Forms */
import { useFormik } from "formik"
import * as Yup from "yup"

/** Endpoints */
import { useRegisterMutation } from "../features/slices/auth/authEndpoints"
/** Icons */
import { faArrowLeft, faEye, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

/** Material Tailwind */
import { Button, Input } from "@material-tailwind/react"

const Register = () => {
    const navigate = useNavigate()

    const [registerApi, {isLoading: isRegistering }] = useRegisterMutation()

    const handleRegister = async (values) => {
        try{
            const userData = await registerApi(values).unwrap()
            navigate("/login")
        } catch(err){
            console.log(err)

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
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            firstname: '',
            lastname: '',
            password: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email().required('Please type your email'),
            firstname: Yup.string().required('Please enter your first name'),
            lastname: Yup.string().required('Please enter your last name'),
            password: Yup.string().required('Please enter your password'),
        }),
        onSubmit: (values) => handleRegister(values)
    })

    return (
        <section className="flex items-center justify-center h-full w-full">
            <div className="flex flex-col justify-center items-center h-full lg:w-1/4 sm:w-full lg:h-fit lg:gap-5 md:gap-8 gap-6 shadow-2xl p-10 lg:p-4 rounded-3xl">
                <h1 className=" text-lg font-lexend-exa">Sign Up</h1>
                    <Input
                        className=" bg-white"
                        color="green"
                        label="First Name"
                        type="text"
                        name="firstname"
                        id="firstname"
                        required
                        disabled={isRegistering}
                        value={formik.values.firstname}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.firstname &&
                            Boolean(formik.touched.firstname)
                        }
                    />
                    <Input
                        className=" bg-white"
                        color="green"
                        label="Last Name"
                        type="text"
                        name="lastname"
                        id="lastname"
                        required
                        disabled={isRegistering}
                        value={formik.values.lastname}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.lastname &&
                            Boolean(formik.touched.lastname)
                        }
                    />
                    <Input
                        className=" bg-white"
                        icon={<FontAwesomeIcon icon={faUser} />}
                        color="green"
                        label="Email"
                        type="email"
                        name="email"
                        id="email"
                        required
                        disabled={isRegistering}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.email &&
                            Boolean(formik.touched.email)
                        }
                    />
                    <Input
                        className=" bg-white"
                        icon={<FontAwesomeIcon icon={faEye} />}
                        color="green"
                        label="Password"
                        type="password"
                        name="password"
                        required
                        disabled={isRegistering}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.password &&
                            Boolean(formik.touched.password)
                        }
                    />

                    <Button color="green" onClick={formik.handleSubmit} className="w-full">
                        Sign Up
                    </Button>
                    <Button color="white" onClick={() => navigate('/login')} className="w-full mt-4 flex justify-center items-center gap-4">
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Go back to Login
                    </Button>
            </div>
        </section>
    )
}

export default Register