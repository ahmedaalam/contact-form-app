import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/contact`,
        form,
      );

      if (res.data.success) {
        setStatus("Message sent successfully");

        // clear form
        setForm({
          name: "",
          email: "",
          message: "",
        });
      }
      // clear status after 3 seconds
      setTimeout(() => {
        setStatus("");
      }, 3000);
    } catch (err) {
      setStatus("Failed to send message ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Contact Us</h1>

      <form onSubmit={handleSubmit}>
        <div className="container">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="container">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            required
          ></textarea>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
      {status && <p className="status">{status}</p>}
    </div>
  );
}

export default App;
