"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from '../../styles/login.module.scss';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", username: "", email: "", password: "" });
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");


    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/login"); // sikeres regisztráció után login oldalra
    } else {
      const data = await res.json();
      setError(data.error || "Ismeretlen hiba");
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Regisztráció</h1>
        <input
          type="text"
          placeholder="Név"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Felhasználónév"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="border p-2"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2"
          required
        />
        <input
          type="password"
          placeholder="Jelszó"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2"
          required
        />
        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className="btn-green">
          Regisztráció
        </button>
      </form>

    </div>
  );
}
