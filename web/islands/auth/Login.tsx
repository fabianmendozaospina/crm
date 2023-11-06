import { useState } from "preact/hooks";

export default function Login() {
  const [credentials, setCredentials] = useState({});
  const handleUpdateState = (e: any) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e: any) => {
    e.preventDefault();

    try {
      const resp = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      if (resp.status != 200) {
        alert("Error al autenticar!");
        return;
      }

      const data = await resp.json();
      const { error, token } = data;

      localStorage.setItem("token", token);
    } catch (error) {
      console.log(error);
      alert("Ocurrió un error");
    }
  };

  return (
    <div class="login">
      <h2>Login</h2>

      <div class="contenedor-formulario">
        <form
          onSubmit={login}
        >
          <div class="campo">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email for login"
              required
              onChange={handleUpdateState}
            />
          </div>

          <div class="campo">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password for login"
              required
              onChange={handleUpdateState}
            />
          </div>

          <input
            type="submit"
            value="Login"
            class="btn btn-verde btn-block"
          />
        </form>
      </div>
    </div>
  );
}
