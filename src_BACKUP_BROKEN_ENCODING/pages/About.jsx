import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  HeartHandshake,
  Search,
  Phone,
  MapPin,
  Store,
  Wrench,
  Megaphone,
  ShieldCheck,
  ChevronLeft,
  Sparkles,
} from "lucide-react";

import "../styles/infoPages.css";
import Logo from "../components/common/Logo";

export default function About() {
  const navigate = useNavigate();

  const features = [
    {
      Icon: Search,
      title: "ÙˆØµÙ„ Ù„Ù„Ø®Ø¯Ù…Ø© Ø¨Ø³Ø±Ø¹Ø©",
      description:
        "Ø§Ø¨Ø­Ø« Ø¹Ù† Ø§Ù„Ø®Ø¯Ù…Ø© Ø£Ùˆ Ø§Ù„Ù†Ø´Ø§Ø· Ø§Ù„Ù„ÙŠ Ù…Ø­ØªØ§Ø¬Ù‡ ÙˆØ´ÙˆÙ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„ØªÙˆØ§ØµÙ„ Ø¨Ø³Ù‡ÙˆÙ„Ø©.",
    },
    {
      Icon: Wrench,
      title: "Ø¯Ø¹Ù… Ù…Ù‚Ø¯Ù…ÙŠ Ø§Ù„Ø®Ø¯Ù…Ø§Øª",
      description:
        "Ø§Ù„ØµÙ†Ø§ÙŠØ¹ÙŠØ© ÙˆØ£ØµØ­Ø§Ø¨ Ø§Ù„Ø®Ø¯Ù…Ø§Øª ÙŠÙ‚Ø¯Ø±ÙˆØ§ ÙŠØ¶ÙŠÙÙˆØ§ Ø¨ÙŠØ§Ù†Ø§ØªÙ‡Ù… Ù…Ø¬Ø§Ù†Ù‹Ø§ Ù„Ù„Ù…Ù†ØµØ©.",
    },
    {
      Icon: Store,
      title: "Ø¯Ù„ÙŠÙ„ Ù„Ù„Ø£Ù†Ø´Ø·Ø©",
      description:
        "Ø³ÙˆØ¨Ø± Ù…Ø§Ø±ÙƒØª ÙˆØµÙŠØ¯Ù„ÙŠØ§Øª ÙˆØ£Ø·Ø¨Ø§Ø¡ ÙˆØ®Ø¯Ù…Ø§Øª Ù…Ø®ØªÙ„ÙØ© ÙÙŠ Ù…ÙƒØ§Ù† ÙˆØ§Ø­Ø¯.",
    },
    {
      Icon: Megaphone,
      title: "Ø¥Ø¹Ù„Ø§Ù†Ø§Øª Ù…Ø­Ù„ÙŠØ©",
      description:
        "Ø£ØµØ­Ø§Ø¨ Ø§Ù„Ø£Ù†Ø´Ø·Ø© ÙŠÙ‚Ø¯Ø±ÙˆØ§ ÙŠØ¹Ù„Ù†ÙˆØ§ Ø¯Ø§Ø®Ù„ Ù†ÙŠØ¯Ù‡ ÙˆÙŠÙˆØµÙ„ÙˆØ§ Ù„Ø¬Ù…Ù‡ÙˆØ± Ù…Ø­Ù„ÙŠ.",
    },
  ];

  return (
    <div className="info-page">
      <div className="info-shell">

        <header className="info-header">
          <button onClick={() => navigate(-1)}>
            <ArrowRight size={24} />
          </button>

          <div>
            <span>Ù…Ù†ØµØ© Ù†ÙŠØ¯Ù‡</span>
            <h1>Ø¹Ù† Ù†ÙŠØ¯Ù‡</h1>
          </div>

          <div className="info-header-icon">
            <HeartHandshake size={22} />
          </div>
        </header>

        <section className="about-hero">

      <div className="about-logo-image">
  <Logo size={105} />
</div>
          <span className="about-label">
            <Sparkles size={14} />
            ÙƒÙ„ Ø®Ø¯Ù…Ø§Øª Ø¨Ù„Ø¯Ùƒ ÙÙŠ Ù…ÙƒØ§Ù† ÙˆØ§Ø­Ø¯
          </span>

          <h2>Ù†ÙŠØ¯Ù‡</h2>

          <p>
            Ù…Ù†ØµØ© Ù…Ø­Ù„ÙŠØ© Ù‡Ø¯ÙÙ‡Ø§ ØªØ³Ù‡Ù‘Ù„ Ø¹Ù„Ù‰ Ø£Ù‡Ù„ Ù†ÙŠØ¯Ù‡
            Ø§Ù„ÙˆØµÙˆÙ„ Ù„Ù„Ø®Ø¯Ù…Ø§Øª ÙˆØ§Ù„Ø£Ù†Ø´Ø·Ø© ÙˆØ§Ù„Ø£Ù…Ø§ÙƒÙ†
            ÙˆØ§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø§Ù„Ù…Ù‡Ù…Ø© Ø¯Ø§Ø®Ù„ Ø§Ù„Ø¨Ù„Ø¯.
          </p>

        </section>

        <section className="info-content-section">

          <div className="info-section-heading">
            <span>ÙÙƒØ±ØªÙ†Ø§</span>
            <h2>Ù„ÙŠÙ‡ Ø¹Ù…Ù„Ù†Ø§ Ù†ÙŠØ¯Ù‡ØŸ</h2>
          </div>

          <div className="info-text-card">
            <p>
              Ø£ÙˆÙ‚Ø§Øª ÙƒØªÙŠØ± Ø¨Ù†Ø­ØªØ§Ø¬ Ø³Ø¨Ø§ÙƒØŒ ÙƒÙ‡Ø±Ø¨Ø§Ø¦ÙŠØŒ
              Ø¯ÙƒØªÙˆØ±ØŒ ØµÙŠØ¯Ù„ÙŠØ©ØŒ Ø¯Ù„ÙŠÙØ±ÙŠ Ø£Ùˆ ÙˆØ³ÙŠÙ„Ø©
              Ù…ÙˆØ§ØµÙ„Ø§ØªØŒ ÙˆÙ†Ø¨Ø¯Ø£ Ù†Ø³Ø£Ù„ Ø§Ù„Ù†Ø§Ø³ Ø¹Ù† Ø±Ù‚Ù…
              Ø­Ø¯ Ù†Ø¹Ø±ÙÙ‡.
            </p>

            <p>
              Ù†ÙŠØ¯Ù‡ Ø¨ØªØ¬Ù…Ø¹ Ø§Ù„Ø®Ø¯Ù…Ø§Øª Ø¯ÙŠ ÙÙŠ Ø¯Ù„ÙŠÙ„ Ù…Ø­Ù„ÙŠ
              Ø¨Ø³ÙŠØ·ØŒ Ø¨Ø­ÙŠØ« ØªÙ‚Ø¯Ø± ØªØ¯Ø®Ù„ ÙˆØªÙˆØµÙ„ Ù„Ù„Ø´Ø®Øµ
              Ø£Ùˆ Ø§Ù„Ù†Ø´Ø§Ø· Ø§Ù„Ù…Ù†Ø§Ø³Ø¨ ÙˆØªØªÙˆØ§ØµÙ„ Ù…Ø¹Ø§Ù‡
              Ù…Ø¨Ø§Ø´Ø±Ø©.
            </p>
          </div>

        </section>

        <section className="info-content-section">

          <div className="info-section-heading">
            <span>Ø¥ÙŠÙ‡ Ø§Ù„Ù„ÙŠ Ø¨Ù†Ù‚Ø¯Ù…Ù‡ØŸ</span>
            <h2>Ù…Ù†ØµØ© Ù…Ø¹Ù…ÙˆÙ„Ø© Ù„Ù„Ø¨Ù„Ø¯</h2>
          </div>

          <div className="about-features">

            {features.map(
              ({
                Icon,
                title,
                description,
              }) => (
                <div
                  className="about-feature-card"
                  key={title}
                >
                  <div>
                    <Icon size={21} />
                  </div>

                  <section>
                    <strong>
                      {title}
                    </strong>

                    <p>
                      {description}
                    </p>
                  </section>
                </div>
              )
            )}

          </div>

        </section>

        <section className="about-location-card">

          <div>
            <MapPin size={23} />
          </div>

          <section>
            <span>Ø§Ù„Ù†Ø·Ø§Ù‚ Ø§Ù„Ø­Ø§Ù„ÙŠ</span>
            <strong>Ù‚Ø±ÙŠØ© Ù†ÙŠØ¯Ù‡</strong>

            <p>
              Ø§Ù„Ù…Ù†ØµØ© Ù…Ø±ÙƒØ²Ø© Ø­Ø§Ù„ÙŠÙ‹Ø§ Ø¹Ù„Ù‰ Ø§Ù„Ø®Ø¯Ù…Ø§Øª
              ÙˆØ§Ù„Ø£Ù†Ø´Ø·Ø© Ø§Ù„Ù…ØªØ§Ø­Ø© Ø¯Ø§Ø®Ù„ Ù†ÙŠØ¯Ù‡.
            </p>
          </section>

        </section>

        <section className="about-trust-card">

          <ShieldCheck size={24} />

          <div>
            <strong>
              Ø§Ù„Ø®Ø¯Ù…Ø§Øª Ø¨ØªØ®Ø¶Ø¹ Ù„Ù„Ù…Ø±Ø§Ø¬Ø¹Ø©
            </strong>

            <p>
              Ø·Ù„Ø¨Ø§Øª Ø¥Ø¶Ø§ÙØ© Ø§Ù„Ø®Ø¯Ù…Ø§Øª ÙˆØ§Ù„Ø¥Ø¹Ù„Ø§Ù†Ø§Øª
              Ø¨ØªØªÙ… Ù…Ø±Ø§Ø¬Ø¹ØªÙ‡Ø§ Ù‚Ø¨Ù„ Ø¸Ù‡ÙˆØ±Ù‡Ø§ Ø¹Ù„Ù‰
              Ø§Ù„Ù…Ù†ØµØ©.
            </p>
          </div>

        </section>

        <button
          className="info-primary-button"
          onClick={() =>
            navigate("/categories")
          }
        >
          ØªØµÙØ­ Ø®Ø¯Ù…Ø§Øª Ù†ÙŠØ¯Ù‡
          <ChevronLeft size={19} />
        </button>

      </div>
    </div>
  );
}
