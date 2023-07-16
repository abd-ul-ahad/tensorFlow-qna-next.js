"use client";
import { User } from "@/store/slices/UserSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { login } from "@/store/slices/UserSlice";
import Loading from "@/components/Loading";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const [loading, setLoading] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorInEmail, setErrorInEmail] = useState<boolean>();

  const verify = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email)) {
      setErrorInEmail(false);
      return true;
    }
    setErrorInEmail(true);
    return false;
  };

  const handleLogin = async () => {
    if (verify()) {
      setLoading(true);
      const response = await fetch(
        "https://qna-cyan.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON?.stringify({ email: email, password: password }),
        }
      );
      const data = await response.json();

      if (data?.done === true) {
        toast.success("You have been redirected to the homepage!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        setEmail("");
        setPassword("");
        const i: User = {
          name: data?.name,
          email: data?.email,
          token: data?.token,
          passages: data?.passages,
        };
        localStorage?.setItem("__token_", data?.token);

        dispatch(login(i));

        router.push("/");
      } else {
        toast.error("The provided email or password is invalid.", {
          position: toast.POSITION.TOP_RIGHT,
        });

        setLoading(false);
      }
    }
  };

  useEffect(() => {
    try {
      if (localStorage?.getItem("__token_") !== null) {
        router.push("/");
        return;
      }
      setLoading(false);
    } catch {}
  }, []);

  return (
    <>
      {loading === true && <Loading />}
      <ToastContainer />
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
              className="px-5 py-3 border-2 outline-[var(--button-bg)] md:md:w-96 w-72"
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
            <input
              type="password"
              className="mt-2 px-5 py-3 border-2 outline-[var(--button-bg)] md:w-96 w-72"
              style={{ caretColor: "rgb(16,163,127)" }}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={() => handleLogin()}
              className="mt-4 md:w-96 w-72 py-3 bg-[var(--button-bg)] text-white font-semibold tracking-wide"
            >
              Continue
            </button>
          </div>
          <div className="w-full flex-col space-y-1 flex justify-center items-center">
            <p className="text-sm">
              Don&lsquo;t have an account?{" "}
              <Link href="/u/register">
                <button className="text-[var(--button-bg)]">Sign up</button>
              </Link>
            </p>
            <p className="text-sm">
              Our continue as{" "}
              <Link href="/guest">
                <button className={`text-[var(--button-bg)] text-sm`}>
                  Guest
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
