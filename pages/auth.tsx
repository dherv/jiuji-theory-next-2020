import React from "react";
import Authentication from "@bit/dherv.main.authentication";
import { useRouter } from "next/router";

const AuthPage = () => {
  const router = useRouter();

  return (
    <Authentication
      backgroundColor="#000"
      title="jiuji theory"
      callback={() => router.push("/")}
    ></Authentication>
  );
};

export default AuthPage;
