import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex flex-col gap-y-12">
      <div>
        <Image
          src="./maomiu-logo.svg"
          alt="cat in a box"
          width="0"
          height="0"
          priority={true}
          className="w-auto h-24 sm:h-32"
        ></Image>
      </div>
      <div className="flex flex-col gap-y-6">
        <h1 className="font-SMGoudy italic text-3xl subpixel-antialiased">
          Chinese Practice Worksheet Generator
        </h1>
        <div className="text-granite lowercase">
            <p>For those looking to practice their Chinese character writing and character recognition. Includes customization of guide lines, the option for repeating traceable characters and if so how many times, as well as color options.</p>
        </div>
      </div>
    </div>
  );
}
