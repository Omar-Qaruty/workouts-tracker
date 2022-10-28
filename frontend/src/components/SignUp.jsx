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
      <form onSubmit={handleRegister}>
        <h2>This is SignUp</h2>
        <div>
          <label htmlFor="">
            User name:
            <input type="text" onChange={onChangeUsername} />
          </label>
        </div>
        <div>
          <label htmlFor="">
            Email
            <input type="text" onChange={onChangeEmail} />
          </label>
        </div>
        <div>
          <label htmlFor="">
            Password:
            <input type="text" onChange={onChangePassword} />
          </label>
        </div>
        <div>
          <button>Sign Up</button>
        </div>
      </form>
    </div>
  );
}
