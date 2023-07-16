"use client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const router = useRouter();
  const [step, setStep] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      if (localStorage?.getItem("__token_") !== null) {
        router.push("/");
        return;
      }
      setLoading(false);
    } catch {}
  }, []);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://qna-cyan.vercel.app/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify({
            email: email,
            password: password,
            name: name,
          }),
        }
      );
      const data = await response.json();
      if (data?.done) {
        toast.success("You have been redirected to the Login page!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        setEmail("");
        setName("");
        setPassword("");
        router.push("/u/login");
      } else {
        toast.error("The provided email or password is invalid.", {
          position: toast.POSITION.TOP_RIGHT,
        });

        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {loading === true && <Loading />}
      <ToastContainer />
      <div className="bg-white flex justify-center items-center h-screen">
        {step === 0 ? (
          <Step1 setStep={setStep} setEmail={setEmail} email={email} />
        ) : step === 1 ? (
          <Step2
            name={name}
            setName={setName}
            password={password}
            setPassword={setPassword}
            handleRegister={handleRegister}
          />
        ) : null}
      </div>
    </>
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
        Register here
      </h3>
      <div className="flex justify-center items-center flex-col">
        <input
          type="email"
          className="px-5 py-3 border-2 outline-[var(--button-bg)] md:w-96 w-72"
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
          className="mt-4 md:w-96 w-72 py-3 bg-[var(--button-bg)] text-white font-semibold tracking-wide"
        >
          Continue
        </button>
      </div>
      <div className="w-full flex-col space-y-1 flex justify-center items-center">
        <p className="text-sm">
          Already have an account?{" "}
          <Link href="/u/login">
            <button className="text-[var(--button-bg)]">Log in</button>
          </Link>
        </p>
        <p className="text-sm">
          Our continue as{" "}
          <Link href="/guest">
            <button className={`text-[var(--button-bg)] text-sm`}>Guest</button>
          </Link>
        </p>
      </div>
    </div>
  );
};

const Step2 = ({
  setName,
  name,
  password,
  setPassword,
  handleRegister,
}: {
  name: string;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  handleRegister: () => Promise<void>;
}) => {
  const [verifyName, setVerifyName] = useState<boolean>();
  const [verifyPass, setVerifyPass] = useState<boolean>();
  const [cPass, setCPass] = useState<string>();

  const handleVerifyName = () => {
    const regex = /^[a-zA-Z ]{4,}$/;
    if (regex.test(name)) {
      setVerifyName(false);
      return true;
    }
    setVerifyName(true);
    return false;
  };

  const handleVerifyPass = () => {
    if (password === cPass) {
      setVerifyPass(false);
      return true;
    }
    setVerifyPass(true);
    return false;
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
            className="px-5 py-3 border-2 outline-[var(--button-bg)] md:w-96 w-72"
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
            className="px-5 py-3 border-2 outline-[var(--button-bg)] md:w-96 w-72"
            style={{ caretColor: "var(--button-bg)" }}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="px-5 py-3 border-2 outline-[var(--button-bg)] md:w-96 w-72"
            style={{ caretColor: "var(--button-bg)" }}
            placeholder="Confirm Password"
            value={cPass}
            onChange={(e) => setCPass(e.target.value)}
          />
          <p
            className={`text-xs w-full text-end text-red-600 mt-2 ${
              verifyPass === true ? "" : "hidden"
            }`}
          >
            Password is different
          </p>
          <button
            className="w-full py-3 bg-[var(--button-bg)] text-white font-semibold tracking-wide"
            onClick={() => {
              if (handleVerifyName() && handleVerifyPass()) {
                handleRegister();
                setPassword("");
              }
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
