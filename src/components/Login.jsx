import { FaGithub, FaReact } from "react-icons/fa";
import { IoLogoFirebase } from "react-icons/io5";
import { VscVscode } from "react-icons/vsc";
import { handleGoogleLogin, handleAnonymousLogin } from "../services/auth";
const Login = () => {
  return (
    <>
      <div className="bg-gray-400/50 fixed top-0 left-0 w-full h-dvh flex items-center justify-center z-50">
        <div className="shadow-xl rounded-xl p-4 bg-gray-50 flex items-center jusitfy-center flex-col max-w-72">
          <h1 className="text-2xl font-bold text-center">
            <p>Welcome to</p>
            <p>New</p>
            <p>English Master!</p>
          </h1>
          <p className="pt-2 text-base text-center font-thin">
            We’ve been developing English Master with Blazor, and now we’re
            excited to start creating it with React. Enjoy the new, evolved
            English Master!
          </p>
          <div className="p-4 w-full">
            <button onClick={handleGoogleLogin} className="btn-primary">
              Sign in with Google
            </button>
            <p className="text-center font-thin">or</p>
            <button className="btn-secondary" onClick={handleAnonymousLogin}>
              Start as Guest
            </button>
          </div>
          <p className="text-base font-thin p-2">Powered by</p>
          <div className="flex justify-center gap-2">
            <FaReact className="size-6" />
            <IoLogoFirebase className="size-6" />
            <VscVscode className="size-6" />
          </div>
          <p className="text-base font-thin p-2">Developed by</p>
          <a
            href="https://github.com/fukicycle"
            className="flex justify-center items-center gap-2"
          >
            Fuki Sato
            <FaGithub />
          </a>
        </div>
      </div>
    </>
  );
};

export default Login;
