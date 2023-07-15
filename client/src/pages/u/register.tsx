"use client";
import Image from "next/image";
import { useState } from "react";

export default function Login() {
  const [step, setStep] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  return (
    <div className="bg-white flex justify-center items-center h-screen">
      {step === 0 ? (
        <Step1 setStep={setStep} setEmail={setEmail} email={email} />
      ) : step === 1 ? (
        <Step2 setStep={setStep} />
      ) : step === 2 ? (
        <Step3 name={name} setName={setName} />
      ) : null}
    </div>
  );
}

const Step1 = ({
  setStep,
  setEmail,
  email,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  email: string;
}) => {
  const [errorInEmail, setErrorInEmail] = useState<boolean>();

  const verify = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email)) {
      setStep(1);
      setErrorInEmail(false);
    } else {
      setErrorInEmail(true);
    }
  };

  return (
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
          className="px-5 py-3 border-2 outline-[var(--button-bg)] w-96"
          style={{ caretColor: "var(--button-bg)" }}
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

        <button
          onClick={() => verify()}
          className="mt-4 w-96 py-3 bg-[var(--button-bg)] text-white font-semibold tracking-wide"
        >
          Continue
        </button>
      </div>

      <p className="text-sm">
        Don't have an account?{" "}
        <button className="text-[var(--button-bg)]">Sign up</button>
      </p>
    </div>
  );
};
const Step2 = ({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="flex justify-center items-center space-y-5 flex-col">
      <div className="flex justify-center items-center">
        <Image
          src="/logo.png"
          width={60}
          height={60}
          alt="Picture of the author"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="space-y-4 flex flex-col justify-center items-center">
          <p className="text-sm">We have sent OTP to your email</p>
          <input
            type="text"
            className="px-5 py-3 border-2 outline-[var(--button-bg)] w-96"
            style={{ caretColor: "var(--button-bg)" }}
            placeholder="OTP"
          />
          <button
            className="w-full py-3 bg-[var(--button-bg)] text-white font-semibold tracking-wide"
            onClick={() => setStep(2)}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const Step3 = ({
  setName,
  name,
}: {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [verifyName, setVerifyName] = useState<boolean>();

  const verify = () => {
    const reg = /^[A-Za-z]{4,}$/;
    if (reg.test(name)) {
      setVerifyName(false);
    } else {
      setVerifyName(true);
    }
  };

  return (
    <div className="flex justify-center items-center space-y-5 flex-col">
      <div className="flex justify-center items-center">
        <Image
          src="/logo.png"
          width={60}
          height={60}
          alt="Picture of the author"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="space-y-4 flex flex-col justify-center items-center">
          <p>Fill your information</p>
          <input
            type="text"
            className="px-5 py-3 border-2 outline-[var(--button-bg)] w-96"
            style={{ caretColor: "var(--button-bg)" }}
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p
            className={`text-xs w-full text-end text-red-600 mt-2 ${
              verifyName === true ? "" : "hidden"
            }`}
          >
            Please enter a valid name
          </p>
          <input
            type="password"
            className="px-5 py-3 border-2 outline-[var(--button-bg)] w-96"
            style={{ caretColor: "var(--button-bg)" }}
            placeholder="Password"
          />
          <input
            type="password"
            className="px-5 py-3 border-2 outline-[var(--button-bg)] w-96"
            style={{ caretColor: "var(--button-bg)" }}
            placeholder="Confirm Password"
          />
          <button
            className="w-full py-3 bg-[var(--button-bg)] text-white font-semibold tracking-wide"
            onClick={() => verify()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
