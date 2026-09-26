import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  ShieldCheck,
  Database,
  Phone,
  Image,
  LockKeyhole,
  Megaphone,
  MessageCircle,
} from "lucide-react";

import "../styles/infoPages.css";

export default function Privacy() {
  const navigate = useNavigate();

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
            <span>Ø¨ÙŠØ§Ù†Ø§ØªÙƒ Ù…Ù‡Ù…Ø©</span>
            <h1>Ø³ÙŠØ§Ø³Ø© Ø§Ù„Ø®ØµÙˆØµÙŠØ©</h1>
          </div>

          <div className="info-header-icon">
            <ShieldCheck size={22} />
          </div>

        </header>

        <section className="legal-hero">

          <div>
            <ShieldCheck size={30} />
          </div>

          <h2>
            Ø®ØµÙˆØµÙŠØªÙƒ Ø¬Ø²Ø¡ Ù…Ù‡Ù… Ù…Ù† Ù†ÙŠØ¯Ù‡
          </h2>

          <p>
            Ø§Ù„Ø³ÙŠØ§Ø³Ø© Ø¯ÙŠ Ø¨ØªÙˆØ¶Ø­ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª
            Ø§Ù„Ù„ÙŠ Ù…Ù…ÙƒÙ† Ù†Ø¬Ù…Ø¹Ù‡Ø§ ÙˆØ·Ø±ÙŠÙ‚Ø©
            Ø§Ø³ØªØ®Ø¯Ø§Ù…Ù‡Ø§ Ø¯Ø§Ø®Ù„ Ø§Ù„Ù…Ù†ØµØ©.
          </p>

        </section>

        <div className="legal-sections">

          <LegalSection
            number="01"
            Icon={Database}
            title="Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„ØªÙŠ Ù†Ø¬Ù…Ø¹Ù‡Ø§"
          >
            Ø¹Ù†Ø¯ ØªØ³Ø¬ÙŠÙ„ Ø®Ø¯Ù…Ø© Ø£Ùˆ Ø¥Ø±Ø³Ø§Ù„ Ø·Ù„Ø¨
            Ø¥Ø¹Ù„Ø§Ù† Ø£Ùˆ Ø§Ù„ØªÙˆØ§ØµÙ„ Ù…Ø¹Ù†Ø§ØŒ Ù‚Ø¯ ÙŠØªÙ…
            Ø¬Ù…Ø¹ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„ØªÙŠ ØªØ¯Ø®Ù„Ù‡Ø§ Ø¨Ù†ÙØ³Ùƒ
            Ù…Ø«Ù„ Ø§Ù„Ø§Ø³Ù… ÙˆØ±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ ÙˆØ§Ù„ÙˆØ§ØªØ³Ø§Ø¨
            ÙˆØ§Ù„Ø¹Ù†ÙˆØ§Ù† ÙˆØ§Ù„ØµÙˆØ±Ø© ÙˆÙˆØµÙ Ø§Ù„Ø®Ø¯Ù…Ø©.
          </LegalSection>

          <LegalSection
            number="02"
            Icon={Phone}
            title="Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„ØªÙˆØ§ØµÙ„"
          >
            Ø¹Ù†Ø¯ ØªØ³Ø¬ÙŠÙ„ Ø®Ø¯Ù…Ø©ØŒ Ø£Ù†Øª ØªÙˆØ§ÙÙ‚ Ø¹Ù„Ù‰
            Ø¸Ù‡ÙˆØ± Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„ØªÙˆØ§ØµÙ„ Ø§Ù„ØªÙŠ Ù‚Ø¯Ù…ØªÙ‡Ø§
            Ø¶Ù…Ù† ØµÙØ­Ø© Ø§Ù„Ø®Ø¯Ù…Ø© Ø¨Ø¹Ø¯ Ø§Ù„Ù…ÙˆØ§ÙÙ‚Ø©
            Ø¹Ù„ÙŠÙ‡Ø§ØŒ Ø­ØªÙ‰ ÙŠØ³ØªØ·ÙŠØ¹ Ù…Ø³ØªØ®Ø¯Ù…Ùˆ Ù†ÙŠØ¯Ù‡
            Ø§Ù„ØªÙˆØ§ØµÙ„ Ù…Ø¹Ùƒ.
          </LegalSection>

          <LegalSection
            number="03"
            Icon={Image}
            title="Ø§Ù„ØµÙˆØ± ÙˆØ§Ù„Ù…Ø­ØªÙˆÙ‰"
          >
            Ø§Ù„ØµÙˆØ± ÙˆØ§Ù„Ù†ØµÙˆØµ Ø§Ù„ØªÙŠ ÙŠØªÙ… Ø¥Ø±Ø³Ø§Ù„Ù‡Ø§
            Ù„ØªØ³Ø¬ÙŠÙ„ Ø®Ø¯Ù…Ø© Ø£Ùˆ Ø¥Ø¹Ù„Ø§Ù† ØªØ³ØªØ®Ø¯Ù…
            Ù„Ø¹Ø±Ø¶ Ø§Ù„Ù†Ø´Ø§Ø· Ø£Ùˆ Ø§Ù„Ø®Ø¯Ù…Ø© Ø¯Ø§Ø®Ù„
            Ø§Ù„Ù…Ù†ØµØ© Ø¨Ø¹Ø¯ Ù…Ø±Ø§Ø¬Ø¹ØªÙ‡Ø§.
          </LegalSection>

          <LegalSection
            number="04"
            Icon={Megaphone}
            title="Ø·Ù„Ø¨Ø§Øª Ø§Ù„Ø¥Ø¹Ù„Ø§Ù†Ø§Øª"
          >
            Ø¨ÙŠØ§Ù†Ø§Øª Ø·Ù„Ø¨ Ø§Ù„Ø¥Ø¹Ù„Ø§Ù† ØªØ³ØªØ®Ø¯Ù…
            Ù„Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ø·Ù„Ø¨ ÙˆØ§Ù„ØªÙˆØ§ØµÙ„ Ù…Ø¹ ØµØ§Ø­Ø¨
            Ø§Ù„Ù†Ø´Ø§Ø· ÙˆØ§Ù„Ø§ØªÙØ§Ù‚ Ø¹Ù„Ù‰ ØªÙØ§ØµÙŠÙ„
            Ø§Ù„Ø¥Ø¹Ù„Ø§Ù† Ù‚Ø¨Ù„ Ù†Ø´Ø±Ù‡.
          </LegalSection>

          <LegalSection
            number="05"
            Icon={MessageCircle}
            title="Ø±Ø³Ø§Ø¦Ù„ Ø§Ù„ØªÙˆØ§ØµÙ„"
          >
            Ø§Ù„Ø±Ø³Ø§Ø¦Ù„ Ø§Ù„Ù…Ø±Ø³Ù„Ø© Ù…Ù† ØµÙØ­Ø© ØªÙˆØ§ØµÙ„
            Ù…Ø¹Ù†Ø§ ØªØ³ØªØ®Ø¯Ù… Ù„Ù„Ø±Ø¯ Ø¹Ù„Ù‰ Ø§Ù„Ø§Ø³ØªÙØ³Ø§Ø±Ø§Øª
            ÙˆÙ…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ù…Ø´ÙƒÙ„Ø§Øª ÙˆØ§Ù„Ø§Ù‚ØªØ±Ø§Ø­Ø§Øª
            Ø§Ù„Ù…ØªØ¹Ù„Ù‚Ø© Ø¨Ø§Ù„Ù…Ù†ØµØ©.
          </LegalSection>

          <LegalSection
            number="06"
            Icon={LockKeyhole}
            title="Ø­Ù…Ø§ÙŠØ© Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª"
          >
            Ù†Ø¹Ù…Ù„ Ø¹Ù„Ù‰ Ø§ØªØ®Ø§Ø° Ø¥Ø¬Ø±Ø§Ø¡Ø§Øª Ù…Ù†Ø§Ø³Ø¨Ø©
            Ù„Ø­Ù…Ø§ÙŠØ© Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…Ø© Ø¯Ø§Ø®Ù„
            Ø§Ù„Ù…Ù†ØµØ©ØŒ ÙˆÙ„Ø§ Ù†Ø·Ù„Ø¨ Ù…Ù† Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…ÙŠÙ†
            ÙƒÙ„Ù…Ø§Øª Ù…Ø±ÙˆØ± Ø£Ùˆ Ø¨ÙŠØ§Ù†Ø§Øª Ø¨Ù†ÙƒÙŠØ©
            Ù„ØªØµÙØ­ Ø§Ù„Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ø¹Ø§Ù…Ø©.
          </LegalSection>

        </div>

        <div className="legal-note">
          <strong>
            Ù…Ù„Ø§Ø­Ø¸Ø©
          </strong>

          <p>
            Ù‚Ø¯ ÙŠØªÙ… ØªØ­Ø¯ÙŠØ« Ø³ÙŠØ§Ø³Ø© Ø§Ù„Ø®ØµÙˆØµÙŠØ©
            Ù…Ø³ØªÙ‚Ø¨Ù„Ù‹Ø§ Ø¹Ù†Ø¯ Ø¥Ø¶Ø§ÙØ© Ø®ØµØ§Ø¦Øµ Ø¬Ø¯ÙŠØ¯Ø©
            Ø¥Ù„Ù‰ Ù†ÙŠØ¯Ù‡ØŒ ÙˆØ³ÙŠØªÙ… ØªØ­Ø¯ÙŠØ« Ù‡Ø°Ù‡ Ø§Ù„ØµÙØ­Ø©
            Ø¹Ù†Ø¯ Ø­Ø¯ÙˆØ« Ø°Ù„Ùƒ.
          </p>
        </div>

      </div>

    </div>
  );
}

function LegalSection({
  number,
  Icon,
  title,
  children,
}) {
  return (
    <section className="legal-section">

      <div className="legal-number">
        {number}
      </div>

      <div className="legal-content">

        <div className="legal-title">
          <Icon size={19} />
          <h2>{title}</h2>
        </div>

        <p>
          {children}
        </p>

      </div>

    </section>
  );
}
