"use client";


import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import style from "../../styles/login.module.scss";


export default function SignIn() {
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const router = useRouter();
  const [error, setError] = useState("");

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
      setError("Hibás felhasználónév vagy jelszó!");
    }
  };

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit} className={style.form}>
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

        <p className={error ? style.error : style.hidden_error}> {error ? error : ""}</p>
        <button type="submit" className="btn-orange">Bejelentkezés</button>
      </form>
    </div>
  );
}
