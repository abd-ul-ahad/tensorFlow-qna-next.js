import Image from "next/image";

export default function Loading() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.2)] w-screen h-screen flex justify-center items-center">
      <div>
      <Image
          src="/loading.gif"
          width={60}
          height={60}
          alt="Loading"
        />
      </div>
    </div>
  );
}
