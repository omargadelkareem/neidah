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
    title: "اقتراح",
    Icon: Lightbulb,
  },
  {
    id: "problem",
    title: "مشكلة",
    Icon: AlertCircle,
  },
  {
    id: "advertising",
    title: "إعلان",
    Icon: Megaphone,
  },
  {
    id: "other",
    title: "أخرى",
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
        "من فضلك اكتب اسمك"
      );
      return;
    }

    if (!form.phone.trim()) {
      alert(
        "من فضلك اكتب رقم الهاتف"
      );
      return;
    }

    if (!form.message.trim()) {
      alert(
        "من فضلك اكتب رسالتك"
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
        "حصلت مشكلة أثناء إرسال الرسالة، حاول مرة تانية."
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
              تم إرسال الرسالة
            </span>

            <h1>
              رسالتك وصلتنا
            </h1>

            <p>
              شكرًا لتواصلك مع نيده.
              هنراجع رسالتك ونتواصل معاك
              لو الموضوع محتاج متابعة.
            </p>

            <button
              onClick={() =>
                navigate("/more")
              }
            >
              العودة للمزيد
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
            <span>نحن هنا لمساعدتك</span>
            <h1>تواصل معنا</h1>
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
              عندك حاجة تقولها؟
            </span>

            <h2>
              ابعتلنا رسالتك
            </h2>

            <p>
              سواء عندك اقتراح، مشكلة
              في بيانات خدمة أو فكرة
              تساعد نيده تكون أفضل.
            </p>
          </section>

        </section>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >

          <div className="info-section-heading">
            <span>نوع الرسالة</span>
            <h2>
              حابب تكلمنا بخصوص إيه؟
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
            <span>الاسم</span>

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
                placeholder="اكتب اسمك"
              />
            </div>
          </label>

          <label className="info-field">
            <span>رقم الهاتف</span>

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
            <span>رسالتك</span>

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
                placeholder="اكتب تفاصيل رسالتك هنا..."
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
                جاري الإرسال...
              </>
            ) : (
              <>
                <Send size={18} />
                إرسال الرسالة
                <ChevronLeft size={18} />
              </>
            )}
          </button>

        </form>

      </div>

    </div>
  );
}
