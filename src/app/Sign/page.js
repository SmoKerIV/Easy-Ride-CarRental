"use client";
import React, { useState } from "react";
import { Button, Input } from "antd";

// Login page component
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = () => {
    // Implement your login logic here
    console.log("Logging in with:", email, password);
  };

  const handleRegister = () => {
    // Implement your registration logic here
    console.log("Registering with:", email, password);
  };

  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-4xl font-bold mb-6">
        {isRegistering ? "Register" : "Login"}
      </h1>

      <form className="flex flex-col items-center">
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
