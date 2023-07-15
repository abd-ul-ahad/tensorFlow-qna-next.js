"use client";
import Image from "next/image";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [errorInEmail, setErrorInEmail] = useState<boolean>();

  const verify = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email)) {
      setErrorInEmail(false);
    } else {
      setErrorInEmail(true);
    }
  };
  return (
    <div className="bg-white flex justify-center items-center h-screen">
      <div className="flex justify-center items-center space-y-5 flex-col">
        <div className="flex justify-center items-center">
          <Image
            src="/logo.png"
            width={60}
            height={60}
            alt="Picture of the author"
          />
        </div>
        <h3 className="text-black text-3xl font-bold tracking-wider">
          Welcome Back
        </h3>
        <div className="flex justify-center items-center flex-col">
          <input
            type="email"
            className="px-5 py-3 border-2 outline-[rgb(16,163,127)] w-96"
            style={{ caretColor: "rgb(16,163,127)" }}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p
            className={`text-xs w-full text-end text-red-600 mt-2 ${
              errorInEmail === true ? "" : "hidden"
            }`}
          >
            Please enter a valid email
          </p>
          <p
            className={`text-xs w-full text-end text-green-600 mt-2  ${
              errorInEmail === false ? "" : "hidden"
            }`}
          >
            valid email
          </p>
          <button
            onClick={(e) => verify()}
            className="mt-4 w-96 py-3 bg-[rgb(16,163,127)] text-white font-semibold tracking-wide"
          >
            Continue
          </button>
        </div>

        <p className="text-sm">
          Don't have an account?{" "}
          <button className="text-[rgb(16,163,127)]">Sign up</button>
        </p>
      </div>
    </div>
  );
}
