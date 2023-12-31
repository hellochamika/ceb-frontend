import { useAuth } from "../Providers/AuthProvider";
import { Link } from "react-router-dom";

function Hero() {
  const { token } = useAuth();
  return (
    <div className="bg-blue-900">
      <section>
        <div className="container flex flex-col-reverse items-center px-6 mx-auto py-12 space-y-0 md:flex-row md:space-y-0">
          <div className="flex flex-col space-y-6 py-20 md:w-1/2 md:ps-10">
            <h1 className="max-w-md text-5xl font-bold text-center text-white md:text-5xl md:text-left">
              Get Your Bill Anytime..!
            </h1>
            <p className="text-white">
              Join the Digital Revolution with Ceylon Electricity Board
            </p>

            {!token ? (
              <div className="max-w-md flex flex-col gap-2 pt-5">
                <Link
                  to="/register"
                  className="text-blue-900 bg-white text-bold text-center border p-1 rounded-full hover:bg-blue-700 hover:text-white"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="text-white text-bold text-center border p-1 rounded-full hover:bg-blue-700"
                >
                  Login
                </Link>
              </div>
            ) : (
              <div className="max-w-md flex flex-col gap-2 pt-5">
                <Link
                  to="/dashboard"
                  className="text-white text-bold text-center border p-1 rounded-full hover:bg-blue-700"
                >
                  Dashboard
                </Link>
              </div>
            )}
          </div>
          <div className="hidden md:flex md:flex-col items-center md:w-1/2">
            <img src="../../hero-image.png" alt="hero-img" width={300} />{" "}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
