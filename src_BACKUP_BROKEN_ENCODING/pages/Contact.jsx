import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  MessageCircle,
  User,
  Phone,
  FileText,
  Send,
  CheckCircle2,
  Lightbulb,
  AlertCircle,
  Megaphone,
  ChevronLeft,
} from "lucide-react";

import {
  submitContactMessage,
} from "../services/contactApi";

import "../styles/infoPages.css";

const contactTypes = [
  {
    id: "suggestion",
    title: "Ø§Ù‚ØªØ±Ø§Ø­",
    Icon: Lightbulb,
  },
  {
    id: "problem",
    title: "Ù…Ø´ÙƒÙ„Ø©",
    Icon: AlertCircle,
  },
  {
    id: "advertising",
    title: "Ø¥Ø¹Ù„Ø§Ù†",
    Icon: Megaphone,
  },
  {
    id: "other",
    title: "Ø£Ø®Ø±Ù‰",
    Icon: MessageCircle,
  },
];

export default function Contact() {
  const navigate = useNavigate();

  const [form, setForm] =
    useState({
      name: "",
      phone: "",
      type: "suggestion",
      message: "",
    });

  const [submitting, setSubmitting] =
    useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  const [error, setError] =
    useState("");

  const updateField = (
    field,
    value
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (!form.name.trim()) {
      alert(
        "Ù…Ù† ÙØ¶Ù„Ùƒ Ø§ÙƒØªØ¨ Ø§Ø³Ù…Ùƒ"
      );
      return;
    }

    if (!form.phone.trim()) {
      alert(
        "Ù…Ù† ÙØ¶Ù„Ùƒ Ø§ÙƒØªØ¨ Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ"
      );
      return;
    }

    if (!form.message.trim()) {
      alert(
        "Ù…Ù† ÙØ¶Ù„Ùƒ Ø§ÙƒØªØ¨ Ø±Ø³Ø§Ù„ØªÙƒ"
      );
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      await submitContactMessage(
        form
      );

      setSubmitted(true);

    } catch (err) {
      console.error(
        "CONTACT ERROR:",
        err
      );

      setError(
        "Ø­ØµÙ„Øª Ù…Ø´ÙƒÙ„Ø© Ø£Ø«Ù†Ø§Ø¡ Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ø±Ø³Ø§Ù„Ø©ØŒ Ø­Ø§ÙˆÙ„ Ù…Ø±Ø© ØªØ§Ù†ÙŠØ©."
      );

    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="info-page">
        <div className="info-shell">

          <div className="contact-success">

            <div>
              <CheckCircle2
                size={38}
              />
            </div>

            <span>
              ØªÙ… Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ø±Ø³Ø§Ù„Ø©
            </span>

            <h1>
              Ø±Ø³Ø§Ù„ØªÙƒ ÙˆØµÙ„ØªÙ†Ø§
            </h1>

            <p>
              Ø´ÙƒØ±Ù‹Ø§ Ù„ØªÙˆØ§ØµÙ„Ùƒ Ù…Ø¹ Ù†ÙŠØ¯Ù‡.
              Ù‡Ù†Ø±Ø§Ø¬Ø¹ Ø±Ø³Ø§Ù„ØªÙƒ ÙˆÙ†ØªÙˆØ§ØµÙ„ Ù…Ø¹Ø§Ùƒ
              Ù„Ùˆ Ø§Ù„Ù…ÙˆØ¶ÙˆØ¹ Ù…Ø­ØªØ§Ø¬ Ù…ØªØ§Ø¨Ø¹Ø©.
            </p>

            <button
              onClick={() =>
                navigate("/more")
              }
            >
              Ø§Ù„Ø¹ÙˆØ¯Ø© Ù„Ù„Ù…Ø²ÙŠØ¯
            </button>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="info-page">

      <div className="info-shell">

        <header className="info-header">

          <button
            onClick={() =>
              navigate(-1)
            }
          >
            <ArrowRight size={24} />
          </button>

          <div>
            <span>Ù†Ø­Ù† Ù‡Ù†Ø§ Ù„Ù…Ø³Ø§Ø¹Ø¯ØªÙƒ</span>
            <h1>ØªÙˆØ§ØµÙ„ Ù…Ø¹Ù†Ø§</h1>
          </div>

          <div className="info-header-icon">
            <MessageCircle size={22} />
          </div>

        </header>

        <section className="contact-intro">

          <div>
            <MessageCircle size={26} />
          </div>

          <section>
            <span>
              Ø¹Ù†Ø¯Ùƒ Ø­Ø§Ø¬Ø© ØªÙ‚ÙˆÙ„Ù‡Ø§ØŸ
            </span>

            <h2>
              Ø§Ø¨Ø¹ØªÙ„Ù†Ø§ Ø±Ø³Ø§Ù„ØªÙƒ
            </h2>

            <p>
              Ø³ÙˆØ§Ø¡ Ø¹Ù†Ø¯Ùƒ Ø§Ù‚ØªØ±Ø§Ø­ØŒ Ù…Ø´ÙƒÙ„Ø©
              ÙÙŠ Ø¨ÙŠØ§Ù†Ø§Øª Ø®Ø¯Ù…Ø© Ø£Ùˆ ÙÙƒØ±Ø©
              ØªØ³Ø§Ø¹Ø¯ Ù†ÙŠØ¯Ù‡ ØªÙƒÙˆÙ† Ø£ÙØ¶Ù„.
            </p>
          </section>

        </section>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >

          <div className="info-section-heading">
            <span>Ù†ÙˆØ¹ Ø§Ù„Ø±Ø³Ø§Ù„Ø©</span>
            <h2>
              Ø­Ø§Ø¨Ø¨ ØªÙƒÙ„Ù…Ù†Ø§ Ø¨Ø®ØµÙˆØµ Ø¥ÙŠÙ‡ØŸ
            </h2>
          </div>

          <div className="contact-type-grid">

            {contactTypes.map(
              ({
                id,
                title,
                Icon,
              }) => (
                <button
                  type="button"
                  key={id}
                  className={
                    form.type === id
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    updateField(
                      "type",
                      id
                    )
                  }
                >
                  <Icon size={19} />
                  {title}
                </button>
              )
            )}

          </div>

          <label className="info-field">
            <span>Ø§Ù„Ø§Ø³Ù…</span>

            <div>
              <User size={19} />

              <input
                value={form.name}
                onChange={(e) =>
                  updateField(
                    "name",
                    e.target.value
                  )
                }
                placeholder="Ø§ÙƒØªØ¨ Ø§Ø³Ù…Ùƒ"
              />
            </div>
          </label>

          <label className="info-field">
            <span>Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ</span>

            <div>
              <Phone size={19} />

              <input
                type="tel"
                inputMode="tel"
                dir="ltr"
                value={form.phone}
                onChange={(e) =>
                  updateField(
                    "phone",
                    e.target.value
                  )
                }
                placeholder="01xxxxxxxxx"
              />
            </div>
          </label>

          <label className="info-field info-textarea">
            <span>Ø±Ø³Ø§Ù„ØªÙƒ</span>

            <div>
              <FileText size={19} />

              <textarea
                rows="6"
                maxLength="600"
                value={form.message}
                onChange={(e) =>
                  updateField(
                    "message",
                    e.target.value
                  )
                }
                placeholder="Ø§ÙƒØªØ¨ ØªÙØ§ØµÙŠÙ„ Ø±Ø³Ø§Ù„ØªÙƒ Ù‡Ù†Ø§..."
              />
            </div>

            <small>
              {form.message.length}/600
            </small>
          </label>

          {error && (
            <div className="contact-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="info-primary-button"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span className="info-loader" />
                Ø¬Ø§Ø±ÙŠ Ø§Ù„Ø¥Ø±Ø³Ø§Ù„...
              </>
            ) : (
              <>
                <Send size={18} />
                Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ø±Ø³Ø§Ù„Ø©
                <ChevronLeft size={18} />
              </>
            )}
          </button>

        </form>

      </div>

    </div>
  );
}
