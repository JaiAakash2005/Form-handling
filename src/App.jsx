import React, { useRef } from "react";
import axios from "axios";

export default function App() {
  const text = useRef();
  const email = useRef();
  const password = useRef();
  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      Name: text.current.value,
      Email: email.current.value,
      Password: password.current.value,
    };

    try {
      const req = await axios.post("http://localhost:3000/submit", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      text.current.value = "";
      email.current.value = "";
      password.current.value = "";

      console.log("Form submitted successfully", req.data);
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response ? error.response.data : error.message
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} method="post">
      <input
        type="text"
        ref={text}
        name="username"
        placeholder="Enter Username"
      />
      <input type="email" ref={email} name="email" placeholder="Enter email" />
      <input
        type="password"
        ref={password}
        name="password"
        placeholder="Enter a password"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
