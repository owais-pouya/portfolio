import { useState } from "react";
import Section from "./Section.jsx";

const empty = { name: "", email: "", message: "", website: "" }; // website = honeypot

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Enter a valid email address.";
  if (v.message.trim().length < 10) e.message = "Message must be at least 10 characters.";
  return e;
}

export default function Contact({ profile }) {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [serverError, setServerError] = useState("");

  const change = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status})`);
      }
      setStatus("success");
      setValues(empty);
    } catch (err) {
      setServerError(err.message);
      setStatus("error");
    }
  }

  const field = "mt-1 w-full rounded-lg border border-line bg-white px-4 py-3";
  const err = "mt-1 text-sm text-red-700";

  return (
    <Section id="contact" eyebrow="Say hello" title="Contact">
      <div className="grid gap-12 md:grid-cols-5">
        <div className="space-y-3 md:col-span-2">
          <p className="text-muted">Have a project or opportunity? Send a message or reach me directly.</p>
          <p><a className="font-semibold underline underline-offset-4" href={`mailto:${profile.email}`}>{profile.email}</a></p>
          <p><a className="underline underline-offset-4" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a></p>
          <p><a className="underline underline-offset-4" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
          <p className="text-muted">{profile.location}</p>
        </div>

        <form onSubmit={submit} noValidate className="space-y-5 md:col-span-3">
          <div>
            <label htmlFor="name" className="font-medium">Name</label>
            <input id="name" name="name" autoComplete="name" value={values.name} onChange={change} className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
            {errors.name && <p id="name-err" className={err}>{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="font-medium">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={change} className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} />
            {errors.email && <p id="email-err" className={err}>{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="message" className="font-medium">Message</label>
            <textarea id="message" name="message" rows="5" value={values.message} onChange={change} className={field} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} />
            {errors.message && <p id="message-err" className={err}>{errors.message}</p>}
          </div>
          {/* Honeypot: hidden from people, filled by bots */}
          <div className="hidden" aria-hidden="true">
            <label>Website<input name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={change} /></label>
          </div>

          <button disabled={status === "sending"} className="rounded-full bg-ink px-8 py-3 font-medium text-paper transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50">
            {status === "sending" ? "Sending..." : "Send message"}
          </button>

          {status === "success" && <p role="status" className="font-medium text-green-800">Message sent. Thank you, I'll reply soon.</p>}
          {status === "error" && <p role="alert" className="font-medium text-red-700">Could not send your message: {serverError}</p>}
        </form>
      </div>
    </Section>
  );
}
