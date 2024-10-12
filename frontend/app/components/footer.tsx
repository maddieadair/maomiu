import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <div className=" border-t-[1px] bg-pearl text-sm main py-4 text-granite footer border-carbon footer">
      <div className="flex flex-row justify-between items-center inner-footer px-8">
          <p>© 2023, MaoMiu</p>
          <div className="flex flex-row gap-x-4">
            <Link
              href="https://www.youtube.com/watch?v=MrA1gKoVKSc"
            >
              点击我 🥚
            </Link>
          </div>
      </div>
    </div>
  );
}
