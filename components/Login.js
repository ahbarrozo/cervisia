/* eslint-disable camelcase */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import fetcher from "@/lib/fetcher";
import { useCurrentUser } from "@/lib/hooks/useUser";

export default function Login() {
  /* calling the API. If an inexistent or void obdb_id is provided,
  nothing will be rendered */

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { data: { user } = {}, mutate, isValidating } = useCurrentUser();

  useEffect(() => {
    if (isValidating) return;
    if (user) router.replace("/");
  }, [user, router, isValidating]);

  async function handleSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    try {
      const response = await fetcher("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      mutate({ user: response.user }, false);
      toast.success("You are now logged in.");
    } catch (e) {
      toast.error("Invalid e-mail or password");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form method="POST" className="card" onSubmit={handleSubmit}>
      <label htmlFor="email">
        E-mail
        <input
          type="email"
          id="email"
          name="email"
          placeholder="E-mail address"
          aria-label="E-mail address"
          required
        />
      </label>
      <label htmlFor="password">
        Password
        <input type="password" id="password" name="password" />
      </label>
      <button type="submit" disabled={isLoading}>
        Log in
      </button>
    </form>
  );
}
