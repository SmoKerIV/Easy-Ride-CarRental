"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Select } from "antd";

// Login page component
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [role, setRole] = useState("USER");
  const router = useRouter();
  const { Option } = Select;
 const handleLogin = async () => {
   try {
     const response = await fetch("/api/auth/login", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         userName,
         password,
       }),
     });

     const data = await response.json();

     if (data.success) {
       console.log("Login successful:", data.user);
       localStorage.setItem("user", JSON.stringify(data.user));
       localStorage.setItem("token", data.token); // Store the token
       router.push("/");
     } else {
       console.error("Login failed:", data.message);
       alert(data.message);
     }
   } catch (error) {
     console.error("Error during login:", error);
     alert("An error occurred during login. Please try again.");
   }
 };
  const handleRegister = async () => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          userName,
          password,
          email,
          role,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Registration successful:", data.user);
      } else {
        console.error("Registration failed:", data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-4xl font-bold mb-6">
        {isRegistering ? "Register" : "Login"}
      </h1>

      <form className="flex flex-col items-center">
        <label htmlFor="username" className="mb-2">
          Username:
        </label>
        <Input
          type="username"
          id="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="mb-4 max-w-md w-full"
          required
        />

        <label htmlFor="password" className="mb-2">
          Password:
        </label>
        <Input.Password
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 max-w-md w-full"
          required
        />

        {isRegistering && (
          <>
            <label htmlFor="fullName" className="mb-2">
              Full Name:
            </label>
            <Input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mb-4 max-w-md w-full"
              required
            />

            <label htmlFor="email" className="mb-2">
              Email:
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4 max-w-md w-full"
              required
            />
            <label htmlFor="role" className="mb-2">
              Role:
            </label>
            <Select
              id="role"
              value={role}
              onChange={(value) => setRole(value)}
              className="mb-4 max-w-md w-full"
            >
              <Option value="USER">User</Option>
              <Option value="ADMIN">Admin</Option>
            </Select>
          </>
        )}

        {isRegistering ? (
          <Button type="primary" onClick={handleRegister} className="mb-4">
            Register
          </Button>
        ) : (
          <Button type="primary" onClick={handleLogin} className="mb-4">
            Login
          </Button>
        )}

        <p>
          {isRegistering
            ? "Already have an account? "
            : "Don't have an account? "}
          <span
            className="text-primary cursor-pointer"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? "Login" : "Register"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
