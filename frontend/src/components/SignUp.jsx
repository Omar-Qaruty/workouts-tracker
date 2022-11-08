import { useState } from "react";

useState;
export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    let result = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
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
      <form onSubmit={handleRegister}>
        <div class="form__group field">
          <input
            type="input"
            class="form__field"
            id="name"
            onChange={onChangeUsername}
          />
          <label class="form__label">name</label>
        </div>
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
          <button className="button">Sign up</button>
        </div>
      </form>
    </div>
  );
}
