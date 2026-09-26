import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  Megaphone,
  Store,
  User,
  Phone,
  MessageCircle,
  FileText,
  Camera,
  MapPin,
  CalendarDays,
  ChevronLeft,
  CheckCircle2,
  ShieldCheck,
  Home,
  LayoutGrid,
  Search,
  MoreHorizontal,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";

import {
  submitAdRequest,
} from "../services/adsApi";

import "../styles/advertise.css";

/* =========================================
   Business Types
========================================= */

const businessTypes = [
  "Ø³ÙˆØ¨Ø± Ù…Ø§Ø±ÙƒØª",
  "ØµÙŠØ¯Ù„ÙŠØ©",
  "Ø¹ÙŠØ§Ø¯Ø© / Ø·Ø¨ÙŠØ¨",
  "Ù…Ø·Ø¹Ù…",
  "Ù…Ø®Ø¨Ø²",
  "Ù…Ø­Ù„ Ù…Ù„Ø§Ø¨Ø³",
  "Ø£Ø¬Ù‡Ø²Ø© ÙƒÙ‡Ø±Ø¨Ø§Ø¦ÙŠØ©",
  "Ù…ÙˆØ¨Ø§ÙŠÙ„Ø§Øª",
  "ØµÙ†Ø§ÙŠØ¹ÙŠ",
  "Ø®Ø¯Ù…Ø© ØªÙˆØµÙŠÙ„",
  "Ù…ÙˆØ§ØµÙ„Ø§Øª",
  "Ù…Ø±ÙƒØ² ØªØ¹Ù„ÙŠÙ…ÙŠ",
  "Ù†Ø´Ø§Ø· ØªØ¬Ø§Ø±ÙŠ Ø¢Ø®Ø±",
];

/* =========================================
   Placements
========================================= */

const placements = [
  {
    id: "home_banner",
    title: "Ø¨Ø§Ù†Ø± Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©",
    description:
      "Ø¥Ø¹Ù„Ø§Ù† ÙƒØ¨ÙŠØ± ÙŠØ¸Ù‡Ø± ÙÙŠ Ø§Ù„ØµÙØ­Ø© Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©.",
    icon: "ðŸ ",
  },

  {
    id: "category",
    title: "Ø¯Ø§Ø®Ù„ Ø§Ù„Ø£Ù‚Ø³Ø§Ù…",
    description:
      "ÙŠØ¸Ù‡Ø± Ø¥Ø¹Ù„Ø§Ù†Ùƒ Ø¯Ø§Ø®Ù„ Ø§Ù„Ù‚Ø³Ù… Ø§Ù„Ù…Ù†Ø§Ø³Ø¨ Ù„Ù†Ø´Ø§Ø·Ùƒ.",
    icon: "â–¦",
  },

  {
    id: "featured",
    title: "Ø¸Ù‡ÙˆØ± Ù…Ù…ÙŠØ²",
    description:
      "Ø¥Ø¨Ø±Ø§Ø² Ù†Ø´Ø§Ø·Ùƒ Ø¨Ø´ÙƒÙ„ Ø£ÙˆØ¶Ø­ Ø¯Ø§Ø®Ù„ Ø§Ù„Ù…Ù†ØµØ©.",
    icon: "â˜…",
  },
];

/* =========================================
   Durations
========================================= */

const durations = [
  {
    id: "7_days",
    title: "Ø£Ø³Ø¨ÙˆØ¹",
    days: 7,
  },

  {
    id: "14_days",
    title: "Ø£Ø³Ø¨ÙˆØ¹ÙŠÙ†",
    days: 14,
  },

  {
    id: "30_days",
    title: "Ø´Ù‡Ø±",
    days: 30,
  },
];

/* =========================================
   Initial Form
========================================= */

const initialForm = {
  businessName: "",
  ownerName: "",
  businessType: "",
  phone: "",
  whatsapp: "",
  address: "",
  description: "",
  placement: "home_banner",
  duration: "7_days",
  image: null,
  consent: false,
};

/* =========================================
   Advertise
========================================= */

export default function Advertise() {
  const navigate = useNavigate();

  const [form, setForm] =
    useState(initialForm);

  const [submitting, setSubmitting] =
    useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  const [submitError, setSubmitError] =
    useState("");

  const [imagePreview, setImagePreview] =
    useState("");

  /* =========================================
     Selected data
  ========================================= */

  const selectedPlacement =
    useMemo(
      () =>
        placements.find(
          (item) =>
            item.id ===
            form.placement
        ),
      [form.placement]
    );

  const selectedDuration =
    useMemo(
      () =>
        durations.find(
          (item) =>
            item.id ===
            form.duration
        ),
      [form.duration]
    );

  /* =========================================
     Update Field
  ========================================= */

  const updateField = (
    field,
    value
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /* =========================================
     Image
  ========================================= */

  const handleImageChange = (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      alert(
        "Ù…Ù† ÙØ¶Ù„Ùƒ Ø§Ø®ØªØ± ØµÙˆØ±Ø© ØµØ­ÙŠØ­Ø©"
      );

      return;
    }

    updateField(
      "image",
      file
    );

    if (imagePreview) {
      URL.revokeObjectURL(
        imagePreview
      );
    }

    setImagePreview(
      URL.createObjectURL(
        file
      )
    );
  };

  /* =========================================
     Submit
  ========================================= */

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (
      !form.businessName.trim()
    ) {
      alert(
        "Ù…Ù† ÙØ¶Ù„Ùƒ Ø§ÙƒØªØ¨ Ø§Ø³Ù… Ø§Ù„Ù†Ø´Ø§Ø·"
      );

      return;
    }

    if (
      !form.businessType
    ) {
      alert(
        "Ù…Ù† ÙØ¶Ù„Ùƒ Ø§Ø®ØªØ± Ù†ÙˆØ¹ Ø§Ù„Ù†Ø´Ø§Ø·"
      );

      return;
    }

    if (!form.phone.trim()) {
      alert(
        "Ù…Ù† ÙØ¶Ù„Ùƒ Ø§ÙƒØªØ¨ Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ"
      );

      return;
    }

    const cleanPhone =
      form.phone.replace(
        /\D/g,
        ""
      );

    if (
      cleanPhone.length < 10
    ) {
      alert(
        "Ù…Ù† ÙØ¶Ù„Ùƒ Ø§ÙƒØªØ¨ Ø±Ù‚Ù… Ù‡Ø§ØªÙ ØµØ­ÙŠØ­"
      );

      return;
    }

    if (!form.image) {
      alert(
        "Ù…Ù† ÙØ¶Ù„Ùƒ Ø£Ø¶Ù ØµÙˆØ±Ø© Ø§Ù„Ø¥Ø¹Ù„Ø§Ù†"
      );

      return;
    }

    if (!form.consent) {
      alert(
        "Ù„Ø§Ø²Ù… ØªÙˆØ§ÙÙ‚ Ø¹Ù„Ù‰ Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ø¥Ø¹Ù„Ø§Ù† Ù‚Ø¨Ù„ Ù†Ø´Ø±Ù‡"
      );

      return;
    }

    try {
      setSubmitting(true);

      setSubmitError("");

      await submitAdRequest({
        ...form,

        durationDays:
          selectedDuration?.days ||
          7,

        placementTitle:
          selectedPlacement?.title ||
          "",
      });

      setSubmitted(true);

    } catch (error) {
      console.error(
        "AD REQUEST ERROR:",
        error
      );

      setSubmitError(
        "Ø­ØµÙ„Øª Ù…Ø´ÙƒÙ„Ø© Ø£Ø«Ù†Ø§Ø¡ Ø¥Ø±Ø³Ø§Ù„ Ø·Ù„Ø¨ Ø§Ù„Ø¥Ø¹Ù„Ø§Ù†ØŒ Ø­Ø§ÙˆÙ„ Ù…Ø±Ø© ØªØ§Ù†ÙŠØ©."
      );

    } finally {
      setSubmitting(false);
    }
  };

  /* =========================================
     Success
  ========================================= */

  if (submitted) {
    return (
      <div className="advertise-page">

        <div className="advertise-shell">

          <div className="advertise-success">

            <div className="advertise-success-icon">
              <CheckCircle2
                size={38}
              />
            </div>

            <span className="advertise-success-label">
              ØªÙ… Ø§Ø³ØªÙ„Ø§Ù… Ø·Ù„Ø¨ Ø§Ù„Ø¥Ø¹Ù„Ø§Ù†
            </span>

            <h1>
              Ø¥Ø¹Ù„Ø§Ù†Ùƒ ÙˆØµÙ„Ù†Ø§ Ø¨Ù†Ø¬Ø§Ø­
            </h1>

            <p>
              Ù‡Ù†Ø±Ø§Ø¬Ø¹ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø¥Ø¹Ù„Ø§Ù†
              ÙˆÙ†ØªÙˆØ§ØµÙ„ Ù…Ø¹Ø§Ùƒ Ù„ØªØ£ÙƒÙŠØ¯ Ø§Ù„ØªÙØ§ØµÙŠÙ„
              Ù‚Ø¨Ù„ Ù†Ø´Ø±Ù‡ Ø¹Ù„Ù‰ Ù…Ù†ØµØ© Ù†ÙŠØ¯Ù‡.
            </p>

            <div className="ad-review-status">

              <span className="ad-review-dot" />

              <div>
                <small>
                  Ø­Ø§Ù„Ø© Ø§Ù„Ø¥Ø¹Ù„Ø§Ù†
                </small>

                <strong>
                  Ù‚ÙŠØ¯ Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø©
                </strong>
              </div>

            </div>

            <div className="advertise-success-note">

              <MessageCircle
                size={19}
              />

              <p>
                Ø¨Ø¹Ø¯ Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø© Ù‡Ù†ØªÙˆØ§ØµÙ„ Ù…Ø¹Ø§Ùƒ
                Ø¹Ù„Ù‰ Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ Ø£Ùˆ Ø§Ù„ÙˆØ§ØªØ³Ø§Ø¨
                Ø§Ù„Ù…Ø³Ø¬Ù„.
              </p>

            </div>

            <button
              className="advertise-home-button"
              onClick={() =>
                navigate("/home")
              }
            >
              Ø§Ù„Ø¹ÙˆØ¯Ø© Ù„Ù„Ø±Ø¦ÙŠØ³ÙŠØ©
            </button>

          </div>

        </div>

      </div>
    );
  }

  /* =========================================
     Page
  ========================================= */

  return (
    <div className="advertise-page">

      <div className="advertise-shell">

        {/* Header */}

        <header className="advertise-header">

          <button
            type="button"
            className="advertise-back"
            onClick={() =>
              navigate(-1)
            }
          >
            <ArrowRight
              size={24}
            />
          </button>

          <div>

            <span>
              Ø§Ù„Ø¥Ø¹Ù„Ø§Ù†Ø§Øª
            </span>

            <h1>
              Ø£Ø¹Ù„Ù† ÙÙŠ Ù†ÙŠØ¯Ù‡
            </h1>

          </div>

          <div className="advertise-header-icon">

            <Megaphone
              size={22}
            />

          </div>

        </header>

        {/* Intro */}

        <section className="advertise-intro">

          <div className="advertise-intro-icon">

            <Sparkles
              size={25}
            />

          </div>

          <div>

            <span>
              ÙˆØµÙ‘Ù„ Ù†Ø´Ø§Ø·Ùƒ Ù„Ø£Ù‡Ù„ Ù†ÙŠØ¯Ù‡
            </span>

            <h2>
              Ø®Ù„ÙŠ Ø§Ù„Ù†Ø§Ø³ ØªØ´ÙˆÙÙƒ Ø£Ø³Ø±Ø¹
            </h2>

            <p>
              Ø³Ø¬Ù„ Ø¨ÙŠØ§Ù†Ø§Øª Ù†Ø´Ø§Ø·Ùƒ ÙˆØ§Ù„Ø¥Ø¹Ù„Ø§Ù†ØŒ
              ÙˆØ¥Ø­Ù†Ø§ Ù‡Ù†Ø±Ø§Ø¬Ø¹ Ø§Ù„Ø·Ù„Ø¨ ÙˆÙ†ØªÙˆØ§ØµÙ„
              Ù…Ø¹Ø§Ùƒ Ù‚Ø¨Ù„ Ø§Ù„Ù†Ø´Ø±.
            </p>

          </div>

        </section>

        {/* Form */}

        <form
          className="advertise-form"
          onSubmit={
            handleSubmit
          }
        >

          {/* =================================
              Business
          ================================= */}

          <div className="advertise-section-title">

            <span>
              1
            </span>

            <div>
              <strong>
                Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù†Ø´Ø§Ø·
              </strong>

              <small>
                Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø£Ø³Ø§Ø³ÙŠØ© Ù„Ù„Ø¥Ø¹Ù„Ø§Ù†
              </small>
            </div>

          </div>

          {/* Business name */}

          <label className="advertise-field">

            <span>
              Ø§Ø³Ù… Ø§Ù„Ù†Ø´Ø§Ø·
            </span>

            <div>

              <Store
                size={19}
              />

              <input
                value={
                  form.businessName
                }
                onChange={(e) =>
                  updateField(
                    "businessName",
                    e.target.value
                  )
                }
                placeholder="Ù…Ø«Ø§Ù„: Ø³ÙˆØ¨Ø± Ù…Ø§Ø±ÙƒØª Ø§Ù„Ù†ÙˆØ±"
              />

            </div>

          </label>

          {/* Owner */}

          <label className="advertise-field">

            <span>
              Ø§Ø³Ù… ØµØ§Ø­Ø¨ Ø§Ù„Ù†Ø´Ø§Ø·

              <small>
                {" "}Ø§Ø®ØªÙŠØ§Ø±ÙŠ
              </small>
            </span>

            <div>

              <User
                size={19}
              />

              <input
                value={
                  form.ownerName
                }
                onChange={(e) =>
                  updateField(
                    "ownerName",
                    e.target.value
                  )
                }
                placeholder="Ø§Ù„Ø§Ø³Ù…"
              />

            </div>

          </label>

          {/* Business type */}

          <label className="advertise-field">

            <span>
              Ù†ÙˆØ¹ Ø§Ù„Ù†Ø´Ø§Ø·
            </span>

            <div>

              <Store
                size={19}
              />

              <select
                value={
                  form.businessType
                }
                onChange={(e) =>
                  updateField(
                    "businessType",
                    e.target.value
                  )
                }
              >

                <option value="">
                  Ø§Ø®ØªØ± Ù†ÙˆØ¹ Ø§Ù„Ù†Ø´Ø§Ø·
                </option>

                {businessTypes.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                )}

              </select>

            </div>

          </label>

          {/* Phone */}

          <label className="advertise-field">

            <span>
              Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ
            </span>

            <div>

              <Phone
                size={19}
              />

              <input
                type="tel"
                inputMode="tel"
                dir="ltr"
                value={
                  form.phone
                }
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

          {/* WhatsApp */}

          <label className="advertise-field">

            <span>
              Ø±Ù‚Ù… ÙˆØ§ØªØ³Ø§Ø¨

              <small>
                {" "}Ø§Ø®ØªÙŠØ§Ø±ÙŠ
              </small>
            </span>

            <div>

              <MessageCircle
                size={19}
              />

              <input
                type="tel"
                inputMode="tel"
                dir="ltr"
                value={
                  form.whatsapp
                }
                onChange={(e) =>
                  updateField(
                    "whatsapp",
                    e.target.value
                  )
                }
                placeholder="01xxxxxxxxx"
              />

            </div>

          </label>

          {/* Address */}

          <label className="advertise-field">

            <span>
              Ø§Ù„Ø¹Ù†ÙˆØ§Ù†

              <small>
                {" "}Ø§Ø®ØªÙŠØ§Ø±ÙŠ
              </small>
            </span>

            <div>

              <MapPin
                size={19}
              />

              <input
                value={
                  form.address
                }
                onChange={(e) =>
                  updateField(
                    "address",
                    e.target.value
                  )
                }
                placeholder="Ù…Ø«Ø§Ù„: Ø§Ù„Ø´Ø§Ø±Ø¹ Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠ"
              />

            </div>

          </label>

          {/* =================================
              Advertisement
          ================================= */}

          <div className="advertise-section-title advertise-second-title">

            <span>
              2
            </span>

            <div>

              <strong>
                Ù…Ø­ØªÙˆÙ‰ Ø§Ù„Ø¥Ø¹Ù„Ø§Ù†
              </strong>

              <small>
                Ø§Ù„ØµÙˆØ±Ø© ÙˆØ§Ù„ÙƒÙ„Ø§Ù… Ø§Ù„Ù„ÙŠ Ù‡ÙŠØ¸Ù‡Ø±
              </small>

            </div>

          </div>

          {/* Image */}

          <label className="advertise-image-upload">

            {imagePreview ? (
              <>

                <img
                  src={
                    imagePreview
                  }
                  alt="Ù…Ø¹Ø§ÙŠÙ†Ø© Ø§Ù„Ø¥Ø¹Ù„Ø§Ù†"
                />

                <div className="advertise-change-image">

                  <Camera
                    size={17}
                  />

                  ØªØºÙŠÙŠØ± Ø§Ù„ØµÙˆØ±Ø©

                </div>

              </>
            ) : (
              <>

                <div className="advertise-upload-icon">

                  <ImageIcon
                    size={28}
                  />

                </div>

                <strong>
                  Ø£Ø¶Ù ØµÙˆØ±Ø© Ø§Ù„Ø¥Ø¹Ù„Ø§Ù†
                </strong>

                <p>
                  ØµÙˆØ±Ø© ÙˆØ§Ø¶Ø­Ø© Ù„Ù„Ù†Ø´Ø§Ø· Ø£Ùˆ
                  Ø¹Ø±Ø¶ Ø¥Ø¹Ù„Ø§Ù†ÙŠ Ø¬Ø§Ù‡Ø²
                </p>

                <span>
                  Ø§Ø®ØªÙŠØ§Ø± ØµÙˆØ±Ø©
                </span>

              </>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={
                handleImageChange
              }
            />

          </label>

          {/* Description */}

          <label className="advertise-field advertise-description">

            <span>
              Ù†Øµ Ø§Ù„Ø¥Ø¹Ù„Ø§Ù†

              <small>
                {" "}Ø§Ø®ØªÙŠØ§Ø±ÙŠ
              </small>
            </span>

            <div>

              <FileText
                size={19}
              />

              <textarea
                rows="4"
                maxLength="180"
                value={
                  form.description
                }
                onChange={(e) =>
                  updateField(
                    "description",
                    e.target.value
                  )
                }
                placeholder="Ù…Ø«Ø§Ù„: ÙƒÙ„ Ø§Ø­ØªÙŠØ§Ø¬Ø§Øª Ø§Ù„Ø¨ÙŠØª Ø¨Ø£Ø³Ø¹Ø§Ø± Ù…Ù…ÙŠØ²Ø© ÙˆØªÙˆØµÙŠÙ„ Ø¯Ø§Ø®Ù„ Ù†ÙŠØ¯Ù‡..."
              />

            </div>

            <small className="advertise-character-count">
              {
                form.description.length
              }
              /180
            </small>

          </label>

          {/* =================================
              Placement
          ================================= */}

          <div className="advertise-section-title advertise-second-title">

            <span>
              3
            </span>

            <div>

              <strong>
                Ù…ÙƒØ§Ù† Ø§Ù„Ø¥Ø¹Ù„Ø§Ù†
              </strong>

              <small>
                Ø§Ø®ØªØ§Ø± Ø§Ù„Ù…ÙƒØ§Ù† Ø§Ù„Ù…Ù†Ø§Ø³Ø¨
              </small>

            </div>

          </div>

          <div className="ad-placement-list">

            {placements.map(
              (placement) => {

                const active =
                  form.placement ===
                  placement.id;

                return (
                  <button
                    type="button"
                    key={
                      placement.id
                    }
                    className={
                      `ad-placement-card ${
                        active
                          ? "active"
                          : ""
                      }`
                    }
                    onClick={() =>
                      updateField(
                        "placement",
                        placement.id
                      )
                    }
                  >

                    <span className="ad-placement-icon">
                      {
                        placement.icon
                      }
                    </span>

                    <div>

                      <strong>
                        {
                          placement.title
                        }
                      </strong>

                      <small>
                        {
                          placement.description
                        }
                      </small>

                    </div>

                    <span className="ad-radio">

                      {active && (
                        <span />
                      )}

                    </span>

                  </button>
                );
              }
            )}

          </div>

          {/* =================================
              Duration
          ================================= */}

          <div className="advertise-section-title advertise-second-title">

            <span>
              4
            </span>

            <div>

              <strong>
                Ù…Ø¯Ø© Ø§Ù„Ø¥Ø¹Ù„Ø§Ù†
              </strong>

              <small>
                Ø§Ù„Ù…Ø¯Ø© Ø§Ù„Ù…Ø·Ù„ÙˆØ¨Ø© Ù„Ù„Ù†Ø´Ø±
              </small>

            </div>

          </div>

          <div className="ad-duration-grid">

            {durations.map(
              (duration) => {

                const active =
                  form.duration ===
                  duration.id;

                return (
                  <button
                    type="button"
                    key={
                      duration.id
                    }
                    className={
                      `ad-duration-card ${
                        active
                          ? "active"
                          : ""
                      }`
                    }
                    onClick={() =>
                      updateField(
                        "duration",
                        duration.id
                      )
                    }
                  >

                    <CalendarDays
                      size={19}
                    />

                    <strong>
                      {
                        duration.title
                      }
                    </strong>

                    <small>
                      {
                        duration.days
                      }{" "}
                      ÙŠÙˆÙ…
                    </small>

                  </button>
                );
              }
            )}

          </div>

          {/* =================================
              No Price
          ================================= */}

          <div className="advertise-price-note">

            <MessageCircle
              size={21}
            />

            <div>

              <strong>
                Ø§Ù„Ø³Ø¹Ø± Ø¨ÙŠØªØ­Ø¯Ø¯ Ø¨Ø¹Ø¯ Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ø·Ù„Ø¨
              </strong>

              <p>
                Ù‡Ù†ØªÙˆØ§ØµÙ„ Ù…Ø¹Ø§Ùƒ Ù„ØªØ£ÙƒÙŠØ¯ Ù…ÙƒØ§Ù†
                Ø§Ù„Ø¥Ø¹Ù„Ø§Ù† ÙˆØ§Ù„Ù…Ø¯Ø© ÙˆØ§Ù„ØªÙƒÙ„ÙØ© Ù‚Ø¨Ù„
                Ø§Ù„Ù†Ø´Ø±.
              </p>

            </div>

          </div>

          {/* Consent */}

          <label className="advertise-consent">

            <input
              type="checkbox"
              checked={
                form.consent
              }
              onChange={(e) =>
                updateField(
                  "consent",
                  e.target.checked
                )
              }
            />

            <span className="advertise-checkbox">

              {form.consent && (
                <CheckCircle2
                  size={18}
                />
              )}

            </span>

            <p>
              Ø£ÙˆØ§ÙÙ‚ Ø¹Ù„Ù‰ Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ø¥Ø¹Ù„Ø§Ù†
              ÙˆØ§Ù„ØªÙˆØ§ØµÙ„ Ù…Ø¹ÙŠ Ù‚Ø¨Ù„ Ù†Ø´Ø±Ù‡ Ø¯Ø§Ø®Ù„
              Ù…Ù†ØµØ© Ù†ÙŠØ¯Ù‡.
            </p>

          </label>

          {/* Security */}

          <div className="advertise-security">

            <ShieldCheck
              size={18}
            />

            Ø§Ù„Ø¥Ø¹Ù„Ø§Ù† Ù…Ø´ Ù‡ÙŠØ¸Ù‡Ø± Ù„Ù„Ø¹Ø§Ù…Ø©
            Ø¥Ù„Ø§ Ø¨Ø¹Ø¯ Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø© ÙˆØ§Ù„Ù…ÙˆØ§ÙÙ‚Ø©.

          </div>

          {/* Error */}

          {submitError && (
            <div className="advertise-error">
              {submitError}
            </div>
          )}

          {/* Submit */}

          <button
            type="submit"
            className="advertise-submit"
            disabled={
              submitting
            }
          >

            {submitting ? (
              <>

                <span className="advertise-loader" />

                Ø¬Ø§Ø±ÙŠ Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ø·Ù„Ø¨...

              </>
            ) : (
              <>

                <Megaphone
                  size={19}
                />

                Ø¥Ø±Ø³Ø§Ù„ Ø·Ù„Ø¨ Ø§Ù„Ø¥Ø¹Ù„Ø§Ù†

                <ChevronLeft
                  size={19}
                />

              </>
            )}

          </button>

        </form>

      </div>

      {/* Bottom Nav */}

      <nav className="advertise-bottom-nav">

        <button
          onClick={() =>
            navigate("/home")
          }
        >
          <Home size={22} />
          <span>
            Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©
          </span>
        </button>

        <button
          onClick={() =>
            navigate(
              "/categories"
            )
          }
        >
          <LayoutGrid
            size={22}
          />
          <span>
            Ø§Ù„Ø£Ù‚Ø³Ø§Ù…
          </span>
        </button>

        <button
          onClick={() =>
            navigate("/search")
          }
        >
          <Search size={22} />
          <span>
            Ø¨Ø­Ø«
          </span>
        </button>

        <button>
          <MoreHorizontal
            size={23}
          />
          <span>
            Ø§Ù„Ù…Ø²ÙŠØ¯
          </span>
        </button>

      </nav>

    </div>
  );
}
