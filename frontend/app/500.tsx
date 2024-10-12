import React from "react";
import Image from "next/image";

export const metadata = {
  title: "500 Error",
  description: "500 Error Page",
};

export default function Custom500() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-y-12">
      <Image
        src="/error.jpeg"
        alt="NGE error"
        quality={100}
        width={0}
        height={0}
        unoptimized={true}
        priority={true}
        className="w-3/4 sm:w-1/3"
      ></Image>
      <h5 className="text-xl">Something went wrong...</h5>
    </div>
  );
}
