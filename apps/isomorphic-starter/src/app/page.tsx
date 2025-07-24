import { redirect } from "next/navigation";
import React from "react";

const HomePage = () => {
  // return <div>Header</div>;
  redirect("/signin");
};

export default HomePage;
