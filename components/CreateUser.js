import fetcher from "@/lib/fetcher";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useCurrentUser } from "@/lib/hooks/useUser";
import CForm from "./styles/CForm";
import { Button, FloatingLabel } from "react-bootstrap";

export default function CreateUser() {
  const { mutate } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (
        e.currentTarget.password.value !== e.currentTarget.confirmpassword.value
      ) {
        toast.error("Password and confirm password must match.");
      } else {
        try {
          setIsLoading(true);
          const body = {
            email: e.currentTarget.email.value,
            name: e.currentTarget.name.value,
            password: e.currentTarget.password.value,
            username: e.currentTarget.username.value,
          };
          const response = await fetcher("/api/user/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          mutate({ user: response.user }, false);
          toast.success("Your account has been created.");
          router.replace("/");
        } catch (e) {
          toast.error(e.message);
        } finally {
          setIsLoading(false);
        }
      }
    },
    [mutate, router]
  );

  return (
    <CForm onSubmit={handleSubmit}>
      <FloatingLabel className="mb-3" label="Name" controlId="name">
        <CForm.Control placeholder="Your name" aria-label="Your name" />
      </FloatingLabel>

      <FloatingLabel className="mb-3" label="Username" controlId="username">
        <CForm.Control placeholder="Your username" aria-label="Your username" />
      </FloatingLabel>

      <FloatingLabel className="mb-3" label="E-mail" controlId="email">
        <CForm.Control
          type="email"
          placeholder="Your e-mail address"
          aria-label="Your e-mail address"
        />
      </FloatingLabel>

      <FloatingLabel className="mb-3" label="Password" controlId="password">
        <CForm.Control type="password" aria-label="Your password" />
      </FloatingLabel>

      <FloatingLabel
        className="mb-3"
        label="Confirm Password"
        controlId="confirmpassword"
      >
        <CForm.Control type="password" aria-label="Confirm password" />
      </FloatingLabel>

      <Button variant="warning" type="submit" disabled={isLoading}>
        Register
      </Button>
    </CForm>
  );
}
