"use client";


import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      username: userInfo.username,
      password: userInfo.password,
    });

    if (res.ok) {
      router.push("/profil"); // vagy valamilyen védett oldalra
    } else {
      alert("Hibás felhasználónév vagy jelszó");
    }
  };

  return (
    <div className="section">
      <form onSubmit={handleSubmit}>
        <label>Felhasználónév</label>
        <input
          type="text"
          value={userInfo.username}
          onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
        />
        <label>Jelszó</label>
        <input
          type="password"
          value={userInfo.password}
          onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
        />
        <button type="submit">Bejelentkezés</button>
      </form>
    </div>
  );
}
