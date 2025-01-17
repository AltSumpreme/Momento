"use client";

import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import Link from "next/link";

export default function UserPage() {
  const router = useRouter();

  /*

  Contents for UserPage() will be loaded from API

  */

  const handleLogout = () => {
    deleteCookie("token");
    router.push("/login");
  };

  return (
    <div className="center flex-col size-screen">
      <h1>User Dashboard</h1>
      <Link className="bg-blue-500 p-2" href="/user/profile">
        View Profile
      </Link>
      <button className="bg-red-500 p-2" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
