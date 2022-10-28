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
      <form onSubmit={handleLogin}>
        <h2>This is Sign in</h2>
        <div>
          <label htmlFor="">
            Email
            <input type="text" onChange={onChangeEmail} />
          </label>
        </div>
        <div>
          <label htmlFor="">
            Password
            <input type="text" onChange={onChangePassword} />
          </label>
        </div>

        <div>
          <button>Sign In </button>
        </div>
        <div></div>
      </form>
    </div>
  );
}
