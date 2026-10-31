import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const CONTACT = {
  email: "suryasurya08012005@gmail.com",
  phone: "+91 63854 54860",
  github: "https://github.com/Suryavasanth",
  linkedin: "https://www.linkedin.com/in/surya-p-375b67353/",
};

const INITIAL_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Contact() {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [submitState, setSubmitState] = useState({ type: "idle", message: "" });
  const closeTimeoutRef = useRef(null);

  const closeLetter = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }

    setIsLetterOpen(false);
    setSubmitState({ type: "idle", message: "" });
  };

  useEffect(() => {
    if (!isLetterOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeLetter();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLetterOpen]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const validateForm = (values) => {
    const trimmedValues = {
      name: values.name.trim(),
      email: values.email.trim(),
      subject: values.subject.trim(),
      message: values.message.trim(),
    };

    const errors = {};

    if (!trimmedValues.name) {
      errors.name = "Please enter your name.";
    }

    if (!trimmedValues.email) {
      errors.email = "Please enter your email address.";
    } else if (!EMAIL_PATTERN.test(trimmedValues.email)) {
      errors.email = "Please use a valid email address.";
    }

    if (!trimmedValues.subject) {
      errors.subject = "Please add a subject.";
    }

    if (!trimmedValues.message) {
      errors.message = "Please tell me about your idea.";
    }

    return { trimmedValues, errors };
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFormErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    if (submitState.type === "error") {
      setSubmitState({ type: "idle", message: "" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSending) {
      return;
    }

    const { trimmedValues, errors } = validateForm(form);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSubmitState({ type: "error", message: "Please complete all required fields correctly." });
      return;
    }

    setIsSending(true);
    setFormErrors({});
    setSubmitState({ type: "idle", message: "" });

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: trimmedValues.name,
          email: trimmedValues.email,
          subject: trimmedValues.subject,
          message: trimmedValues.message,
          from_name: trimmedValues.name,
          from_email: trimmedValues.email,
          reply_to: trimmedValues.email,
        },
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        },
      );

      setForm(INITIAL_FORM);
      setSubmitState({
        type: "success",
        message: "Your message has been sent successfully!",
      });

      closeTimeoutRef.current = window.setTimeout(() => {
        closeLetter();
      }, 2600);
    } catch (error) {
      console.error("EmailJS submission failed:", error);
      setSubmitState({
        type: "error",
        message: "Unable to send your message right now. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <section className="contact-section" id="contact">
        <div className="contact-container">
          <div className="contact-content">
            <div className="contact-eyebrow">
              <span className="contact-eyebrow-line" />
              <span>LET'S CONNECT</span>
              <span className="contact-eyebrow-number">05 / 05</span>
            </div>

            <div className="contact-heading">
              <h2>
                LET'S BUILD
                <br />
                SOMETHING
                <br />
                <span>REAL.</span>
              </h2>

              <p className="contact-description">
                Have an idea, a project, or something exciting in mind? I'd love
                to hear about it. Let's make it happen.
              </p>
            </div>

            <div className="contact-details">
              <a href={`mailto:${CONTACT.email}`} className="contact-detail">
                <span className="contact-detail-label">EMAIL</span>

                <span className="contact-detail-value">
                  {CONTACT.email}
                  <span className="contact-detail-arrow">↗</span>
                </span>
              </a>

              <a
                href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                className="contact-detail">
                <span className="contact-detail-label">PHONE</span>

                <span className="contact-detail-value">
                  {CONTACT.phone}
                  <span className="contact-detail-arrow">↗</span>
                </span>
              </a>

              <div className="contact-socials">
                <a
                  href={CONTACT.github}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-link">
                  GITHUB <span>↗</span>
                </a>

                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-link">
                  LINKEDIN <span>↗</span>
                </a>
              </div>
            </div>

            <button
              type="button"
              className="contact-cta"
              onClick={() => setIsLetterOpen(true)}>
              <span>START A CONVERSATION</span>
              <span className="contact-cta-arrow">↗</span>
            </button>

            <p className="contact-cta-note">
              HAVE SOMETHING IN MIND? WRITE ME A LETTER.
            </p>
          </div>

          <div className="contact-visual">
            <video
              className="contact-video"
              src="/videos/contact-sofa.webm"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="Surya seated on a premium sofa"
            />
          </div>
        </div>

        <footer className="contact-footer">
          <span>© {new Date().getFullYear()} SURYA</span>
          <span>DESIGNED & ENGINEERED WITH INTENT</span>
          <a href="#home">BACK TO TOP ↑</a>
        </footer>
      </section>

      {isLetterOpen && (
        <div
          className="letter-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeLetter();
            }
          }}>
          <div
            className="letter-stage"
            role="dialog"
            aria-modal="true"
            aria-labelledby="letter-title">
            <button
              type="button"
              className="letter-close"
              onClick={closeLetter}
              aria-label="Close letter">
              ×
            </button>

            <div className="letter-envelope" aria-hidden="true">
              <div className="envelope-back" />
              <div className="envelope-paper" />
              <div className="envelope-flap" />
              <div className="envelope-front" />
              <div className="envelope-seal">S</div>
            </div>

            <div className="letter-paper">
              <div className="letter-paper-inner">
                <div className="letter-topline">
                  <span>PERSONAL CORRESPONDENCE</span>
                  <span>01 — 01</span>
                </div>

                <div className="letter-greeting">
                  <h2 id="letter-title">Dear Future Collaborator,</h2>

                  <p>
                    Every great idea begins with a conversation. Tell me what
                    you have in mind.
                  </p>
                </div>

                {submitState.type === "success" ? (
                  <div className="letter-success" role="status" aria-live="polite">
                    <h3>{submitState.message}</h3>
                    <p>Thank you for reaching out. I'll review your message and get back to you soon.</p>
                  </div>
                ) : (
                  <form className="letter-form" onSubmit={handleSubmit} noValidate>
                    <div className="letter-field">
                      <label htmlFor="letter-name">YOUR NAME</label>

                      <input
                        id="letter-name"
                        type="text"
                        name="name"
                        placeholder="Write your name..."
                        value={form.name}
                        onChange={handleChange}
                        autoComplete="name"
                        aria-invalid={Boolean(formErrors.name)}
                        required
                      />

                      {formErrors.name && (
                        <span className="letter-field-error">{formErrors.name}</span>
                      )}
                    </div>

                    <div className="letter-field">
                      <label htmlFor="letter-email">YOUR EMAIL</label>

                      <input
                        id="letter-email"
                        type="email"
                        name="email"
                        placeholder="Your email address..."
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                        aria-invalid={Boolean(formErrors.email)}
                        required
                      />

                      {formErrors.email && (
                        <span className="letter-field-error">{formErrors.email}</span>
                      )}
                    </div>

                    <div className="letter-field">
                      <label htmlFor="letter-subject">SUBJECT</label>

                      <input
                        id="letter-subject"
                        type="text"
                        name="subject"
                        placeholder="What would you like to discuss?"
                        value={form.subject}
                        onChange={handleChange}
                        aria-invalid={Boolean(formErrors.subject)}
                        required
                      />

                      {formErrors.subject && (
                        <span className="letter-field-error">{formErrors.subject}</span>
                      )}
                    </div>

                    <div className="letter-field">
                      <label htmlFor="letter-message">YOUR MESSAGE</label>

                      <textarea
                        id="letter-message"
                        name="message"
                        placeholder="Tell me about your idea..."
                        value={form.message}
                        onChange={handleChange}
                        rows={3}
                        aria-invalid={Boolean(formErrors.message)}
                        required
                      />

                      {formErrors.message && (
                        <span className="letter-field-error">{formErrors.message}</span>
                      )}
                    </div>

                    <div className="letter-signoff">
                      <span>Warm regards,</span>
                      <strong>Surya.</strong>
                    </div>

                    <button
                      type="submit"
                      className="letter-send"
                      disabled={isSending}>
                      <span>
                        {isSending ? "SENDING LETTER..." : "SEND THIS LETTER"}
                      </span>
                      <span>{isSending ? "..." : "↗"}</span>
                    </button>

                    {submitState.type === "error" && (
                      <p className="letter-submit-status" role="alert">
                        {submitState.message}
                      </p>
                    )}
                  </form>
                )}

                <div className="letter-bottomline">
                  <span>WRITTEN WITH INTENTION</span>
                  <span>SURYA © 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Contact;
