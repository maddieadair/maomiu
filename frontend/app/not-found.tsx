import React from "react";

export const metadata = {
  title: "404 Error",
  description: "404 Error Page",
};

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-y-4">
      <h1 className="text-5xl font-newsreader font-semibold">404</h1>
      <h5 className="text-xl">Page not found</h5>
    </div>
  );
}
