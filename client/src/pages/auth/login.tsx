import Image from "next/image";
import Link from "next/link";

export default function login() {

  return (
    <>
      <div
        className={`flex justify-center items-center h-screen bg-[var(--bg-primary)] text-[var(--text-color)]`}
      >
        <div className="flex-col flex justify-center items-center space-y-2">
          <div className="flex justify-center items-center">
            <Image
              src="/logo.png"
              width={50}
              height={50}
              alt="Picture of the author"
            />
          </div>
          <p>Welcome</p>
          <p>Log in with your account to continue</p>
          <div className="flex space-x-3">
            <Link href="/u/login">
              <button className={`bg-[var(--button-bg)] px-2 py-1 rounded text-sm`}>
                Log in
              </button>
            </Link>
            <Link href="/u/register">
              <button className={`bg-[var(--button-bg)] px-2 py-1 rounded text-sm`}>
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
