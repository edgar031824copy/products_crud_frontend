import { Outlet } from "react-router-dom";
import Header from "./Header";

export const Layout = () => {
  return (
    <>
      <Header />
      <main className="mt-10 py-10 mx-12 px-10 bg-white shadow">
        <Outlet />
      </main>
    </>
  );
};
