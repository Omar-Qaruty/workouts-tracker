import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <h5>Sign in</h5>
      <form onSubmit={handleLogin}>
        <div class="form__group field">
          <input
            type="input"
            class="form__field"
            id="name"
            onChange={onChangeEmail}
          />
          <label class="form__label">email</label>
        </div>
        <div class="form__group field">
          <input
            type="input"
            class="form__field"
            id="name"
            onChange={onChangePassword}
          />
          <label class="form__label">password</label>

          <button className="button">Sign In </button>
        </div>
      </form>
    </div>
  );
}
