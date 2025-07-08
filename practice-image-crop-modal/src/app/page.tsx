"use client";
import { redirect } from "next/navigation";
import { Fragment, useEffect } from "react";

export default function Home() {
  useEffect(() => {
    redirect("/imageController");
  }, []);
  return <Fragment />;
}
