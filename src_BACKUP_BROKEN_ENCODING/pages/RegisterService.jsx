import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  Wrench,
  ShoppingBasket,
  Pill,
  Stethoscope,
  GraduationCap,
  Car,
  Bike,
  User,
  Phone,
  MessageCircle,
  MapPin,
  Clock3,
  FileText,
  Camera,
  ChevronLeft,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

import {
  submitServiceRequest,
} from "../services/servicesApi";

import "../styles/registerService.css";

/* =========================================
   Service Types
========================================= */

const serviceTypes = [
  {
    id: "craftsmen",
    title: "ØµÙ†Ø§ÙŠØ¹ÙŠ",
    subtitle: "Ø³Ø¨Ø§ÙƒØŒ ÙƒÙ‡Ø±Ø¨Ø§Ø¦ÙŠØŒ Ø£Ø¬Ù‡Ø²Ø© Ù…Ù†Ø²Ù„ÙŠØ©...",
    Icon: Wrench,
  },

  {
    id: "supermarkets",
    title: "Ø³ÙˆØ¨Ø± Ù…Ø§Ø±ÙƒØª",
    subtitle: "Ø³ÙˆØ¨Ø± Ù…Ø§Ø±ÙƒØª Ø£Ùˆ Ø¨Ù‚Ø§Ù„Ø©",
    Icon: ShoppingBasket,
  },

  {
    id: "pharmacies",
    title: "ØµÙŠØ¯Ù„ÙŠØ©",
    subtitle: "ØµÙŠØ¯Ù„ÙŠØ© Ø¯Ø§Ø®Ù„ Ù†ÙŠØ¯Ù‡",
    Icon: Pill,
  },

  {
    id: "doctors",
    title: "Ø·Ø¨ÙŠØ¨",
    subtitle: "Ø·Ø¨ÙŠØ¨ Ø£Ùˆ Ø¹ÙŠØ§Ø¯Ø©",
    Icon: Stethoscope,
  },

  {
    id: "transport",
    title: "Ù…ÙˆØ§ØµÙ„Ø§Øª",
    subtitle: "Ø³ÙŠØ§Ø±Ø© Ø®Ø§ØµØ©ØŒ ØªÙˆÙƒ ØªÙˆÙƒ...",
    Icon: Car,
  },

  {
    id: "delivery",
    title: "ØªÙˆØµÙŠÙ„ Ù„Ù„Ù…Ù†Ø§Ø²Ù„",
    subtitle: "ØªÙˆØµÙŠÙ„ Ø§Ù„Ø·Ù„Ø¨Ø§Øª Ø¯Ø§Ø®Ù„ Ù†ÙŠØ¯Ù‡",
    Icon: Bike,
  },

  {
    id: "education",
    title: "ØªØ¹Ù„ÙŠÙ…",
    subtitle: "Ù…Ø¯Ø±Ø³ØŒ Ø³Ù†ØªØ±ØŒ Ø­Ø¶Ø§Ù†Ø©...",
    Icon: GraduationCap,
  },
];

/* =========================================
   Specialties
========================================= */

const specialties = {
  craftsmen: [
    "Ø³Ø¨Ø§Ùƒ",
    "ÙƒÙ‡Ø±Ø¨Ø§Ø¦ÙŠ",
    "Ù†Ø¬Ø§Ø±",
    "Ø¯Ù‡Ø§Ù†",
    "Ù†Ù‚Ø§Ø´",
    "ÙÙ†ÙŠ ØªÙƒÙŠÙŠÙ",
    "ÙÙ†ÙŠ Ø¯Ø´ ÙˆØ±ÙŠØ³ÙŠÙØ±",
    "ÙÙ†ÙŠ Ø«Ù„Ø§Ø¬Ø§Øª",
    "ÙÙ†ÙŠ ØºØ³Ø§Ù„Ø§Øª",
    "ÙÙ†ÙŠ Ø¨ÙˆØªØ§Ø¬Ø§Ø²Ø§Øª",
    "ÙÙ†ÙŠ Ø³Ø®Ø§Ù†Ø§Øª",
    "Ø­Ø¯Ø§Ø¯",
    "Ø¹Ø§Ù…Ù„ Ø¨Ù†Ø§Ø¡",
    "Ø£Ø®Ø±Ù‰",
  ],

  supermarkets: [
    "Ø³ÙˆØ¨Ø± Ù…Ø§Ø±ÙƒØª",
    "Ø¨Ù‚Ø§Ù„Ø©",
  ],

  pharmacies: [
    "ØµÙŠØ¯Ù„ÙŠØ©",
  ],

  doctors: [
    "Ø·Ø¨ÙŠØ¨",
  ],

  transport: [
    "Ø³ÙŠØ§Ø±Ø© Ø®Ø§ØµØ©",
    "ØªÙˆÙƒ ØªÙˆÙƒ",
    "Ù…ÙŠÙƒØ±ÙˆØ¨Ø§Øµ",
    "ØªØ§ÙƒØ³ÙŠ",
    "Ù†Ù‚Ù„ Ø¨Ø¶Ø§Ø¦Ø¹",
    "Ø£Ø®Ø±Ù‰",
  ],

  delivery: [
    "ØªÙˆØµÙŠÙ„ Ø·Ù„Ø¨Ø§Øª",
  ],

  education: [
    "Ù…Ø¯Ø±Ø³",
    "Ø³Ù†ØªØ± ØªØ¹Ù„ÙŠÙ…ÙŠ",
    "Ø­Ø¶Ø§Ù†Ø©",
    "ØªØ­ÙÙŠØ¸ Ù‚Ø±Ø¢Ù†",
    "Ø¯ÙˆØ±Ø§Øª ØªØ¯Ø±ÙŠØ¨ÙŠØ©",
    "Ø£Ø®Ø±Ù‰",
  ],
};

/* =========================================
   Initial Form
========================================= */

const initialForm = {
  name: "",
  specialty: "",
  phone: "",
  whatsapp: "",
  address: "",
  workingHours: "",
  description: "",
  image: null,
  consent: false,
};

/* =========================================
   Register Service
========================================= */

export default function RegisterService() {
  const navigate = useNavigate();

  const [step, setStep] =
    useState(1);

  const [
    selectedType,
    setSelectedType,
  ] = useState("");

  const [form, setForm] =
    useState(initialForm);

  const [
    submitted,
    setSubmitted,
  ] = useState(false);

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

  const [
    submitError,
    setSubmitError,
  ] = useState("");

  /* =========================================
     Selected Type Config
  ========================================= */

  const selectedConfig =
    useMemo(
      () =>
        serviceTypes.find(
          (item) =>
            item.id ===
            selectedType
        ),

      [selectedType]
    );

  /* =========================================
     Update field
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
     Choose Type
  ========================================= */

  const chooseType = (type) => {
    setSelectedType(type);

    let automaticSpecialty = "";

    if (type === "delivery") {
      automaticSpecialty =
        "ØªÙˆØµÙŠÙ„ Ø·Ù„Ø¨Ø§Øª";
    }

    if (type === "pharmacies") {
      automaticSpecialty =
        "ØµÙŠØ¯Ù„ÙŠØ©";
    }

    if (type === "doctors") {
      automaticSpecialty =
        "Ø·Ø¨ÙŠØ¨";
    }

    setForm((previous) => ({
      ...previous,
      specialty:
        automaticSpecialty,
    }));

    setSubmitError("");

    setStep(2);
  };

  /* =========================================
     Name Label
  ========================================= */

  const getNameLabel = () => {
    switch (selectedType) {
      case "craftsmen":
        return "Ø§Ø³Ù… Ø§Ù„ØµÙ†Ø§ÙŠØ¹ÙŠ";

      case "supermarkets":
        return "Ø§Ø³Ù… Ø§Ù„Ø³ÙˆØ¨Ø± Ù…Ø§Ø±ÙƒØª";

      case "pharmacies":
        return "Ø§Ø³Ù… Ø§Ù„ØµÙŠØ¯Ù„ÙŠØ©";

      case "doctors":
        return "Ø§Ø³Ù… Ø§Ù„Ø·Ø¨ÙŠØ¨";

      case "transport":
        return "Ø§Ø³Ù… Ø§Ù„Ø³Ø§Ø¦Ù‚";

      case "delivery":
        return "Ø§Ø³Ù… Ø§Ù„Ø¯Ù„ÙŠÙØ±ÙŠ";

      case "education":
        return "Ø§Ø³Ù… Ø§Ù„Ù…Ø¯Ø±Ø³ Ø£Ùˆ Ø§Ù„Ù…Ø±ÙƒØ²";

      default:
        return "Ø§Ù„Ø§Ø³Ù…";
    }
  };

  /* =========================================
     Image Label
  ========================================= */

  const getImageLabel = () => {
    switch (selectedType) {
      case "craftsmen":
        return "ØµÙˆØ±Ø© Ø§Ù„ØµÙ†Ø§ÙŠØ¹ÙŠ";

      case "supermarkets":
        return "ØµÙˆØ±Ø© Ø§Ù„Ø³ÙˆØ¨Ø± Ù…Ø§Ø±ÙƒØª";

      case "pharmacies":
        return "ØµÙˆØ±Ø© Ø§Ù„ØµÙŠØ¯Ù„ÙŠØ©";

      case "doctors":
        return "ØµÙˆØ±Ø© Ø§Ù„Ø·Ø¨ÙŠØ¨";

      case "transport":
        return "ØµÙˆØ±Ø© Ø§Ù„Ø³Ø§Ø¦Ù‚ Ø£Ùˆ Ø§Ù„Ø³ÙŠØ§Ø±Ø©";

      case "delivery":
        return "ØµÙˆØ±Ø© Ø§Ù„Ø¯Ù„ÙŠÙØ±ÙŠ";

      case "education":
        return "ØµÙˆØ±Ø© Ø§Ù„Ù…Ø¯Ø±Ø³ Ø£Ùˆ Ø§Ù„Ù…Ø±ÙƒØ²";

      default:
        return "Ø£Ø¶Ù ØµÙˆØ±Ø©";
    }
  };

  /* =========================================
     Description Placeholder
  ========================================= */

  const getDescriptionPlaceholder =
    () => {
      switch (selectedType) {
        case "craftsmen":
          return "Ù…Ø«Ø§Ù„: Ø®Ø¨Ø±Ø© ÙÙŠ Ø£Ø¹Ù…Ø§Ù„ Ø§Ù„Ø³Ø¨Ø§ÙƒØ© ÙˆØ§Ù„ØµÙŠØ§Ù†Ø© Ø§Ù„Ù…Ù†Ø²Ù„ÙŠØ©...";

        case "supermarkets":
          return "Ø§ÙƒØªØ¨ Ù†Ø¨Ø°Ø© Ø¨Ø³ÙŠØ·Ø© Ø¹Ù† Ø§Ù„Ø³ÙˆØ¨Ø± Ù…Ø§Ø±ÙƒØª ÙˆØ§Ù„Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ù…ØªØ§Ø­Ø©...";

        case "pharmacies":
          return "Ø§ÙƒØªØ¨ Ø£ÙŠ Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø¥Ø¶Ø§ÙÙŠØ© Ø¹Ù† Ø§Ù„ØµÙŠØ¯Ù„ÙŠØ©...";

        case "doctors":
          return "Ù…Ø«Ø§Ù„: Ø§Ù„ØªØ®ØµØµØŒ Ø£ÙŠØ§Ù… Ø§Ù„Ø¹ÙŠØ§Ø¯Ø© Ø£Ùˆ Ø£ÙŠ Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ù…Ù‡Ù…Ø©...";

        case "transport":
          return "Ù…Ø«Ø§Ù„: Ø§Ù„Ù…Ù†Ø§Ø·Ù‚ Ø§Ù„Ù…ØªØ§Ø­Ø©ØŒ Ù†ÙˆØ¹ Ø§Ù„Ø³ÙŠØ§Ø±Ø© Ø£Ùˆ Ù…ÙˆØ§Ø¹ÙŠØ¯ Ø§Ù„Ø¹Ù…Ù„...";

        case "delivery":
          return "Ù…Ø«Ø§Ù„: Ù…ØªØ§Ø­ Ù„ØªÙˆØµÙŠÙ„ Ø§Ù„Ø·Ù„Ø¨Ø§Øª Ø¯Ø§Ø®Ù„ Ù†ÙŠØ¯Ù‡ Ø·ÙˆØ§Ù„ Ø§Ù„ÙŠÙˆÙ…...";

        case "education":
          return "Ù…Ø«Ø§Ù„: Ø§Ù„Ù…Ø§Ø¯Ø©ØŒ Ø§Ù„Ù…Ø±Ø­Ù„Ø© Ø§Ù„Ø¯Ø±Ø§Ø³ÙŠØ© Ø£Ùˆ Ù…ÙƒØ§Ù† Ø§Ù„Ø¯Ø±ÙˆØ³...";

        default:
          return "Ø§ÙƒØªØ¨ Ù†Ø¨Ø°Ø© Ø¨Ø³ÙŠØ·Ø©...";
      }
    };

  /* =========================================
     Submit
  ========================================= */

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    console.log(
      "SUBMIT CLICKED"
    );

    console.log(
      "selectedType:",
      selectedType
    );

    console.log(
      "form:",
      form
    );

    /* Name */

    if (!form.name.trim()) {
      alert(
        `Ù…Ù† ÙØ¶Ù„Ùƒ Ø§ÙƒØªØ¨ ${getNameLabel()}`
      );

      return;
    }

    /* Specialty */

    if (!form.specialty) {
      alert(
        "Ù…Ù† ÙØ¶Ù„Ùƒ Ø§Ø®ØªØ± Ø§Ù„Ù†ÙˆØ¹ / Ø§Ù„ØªØ®ØµØµ"
      );

      return;
    }

    /* Phone */

    if (!form.phone.trim()) {
      alert(
        "Ù…Ù† ÙØ¶Ù„Ùƒ Ø§ÙƒØªØ¨ Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ"
      );

      return;
    }

    /* Egyptian phone basic validation */

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

    /* Consent */

    if (!form.consent) {
      alert(
        "Ù„Ø§Ø²Ù… ØªÙˆØ§ÙÙ‚ Ø¹Ù„Ù‰ Ù†Ø´Ø± Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„ØªÙˆØ§ØµÙ„"
      );

      return;
    }

    try {
      setSubmitting(true);

      setSubmitError("");

      await submitServiceRequest({
        categoryId:
          selectedType,

        form,
      });

      console.log(
        "REQUEST SAVED SUCCESSFULLY"
      );

      setSubmitted(true);

    } catch (error) {
      console.error(
        "SUBMIT ERROR:",
        error
      );

      setSubmitError(
        "Ø­ØµÙ„Øª Ù…Ø´ÙƒÙ„Ø© Ø£Ø«Ù†Ø§Ø¡ Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ø·Ù„Ø¨ØŒ Ø­Ø§ÙˆÙ„ Ù…Ø±Ø© ØªØ§Ù†ÙŠØ©."
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
      <div className="register-page">

        <div className="register-success">

          <div className="success-icon">
            <CheckCircle2
              size={37}
            />
          </div>

          <span className="success-small">
            ØªÙ… Ø§Ø³ØªÙ„Ø§Ù… Ø·Ù„Ø¨Ùƒ
          </span>

          <h1>
            Ø·Ù„Ø¨Ùƒ ÙˆØµÙ„Ù†Ø§ Ø¨Ù†Ø¬Ø§Ø­
          </h1>

          <p>
            Ù‡Ù†Ø±Ø§Ø¬Ø¹ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø£ÙˆÙ„ØŒ
            ÙˆØ¨Ø¹Ø¯ Ø§Ù„Ù…ÙˆØ§ÙÙ‚Ø© Ù‡ØªØ¸Ù‡Ø± Ø®Ø¯Ù…ØªÙƒ
            Ù„Ø£Ù‡Ù„ Ù†ÙŠØ¯Ù‡ Ø¯Ø§Ø®Ù„ Ø§Ù„Ù‚Ø³Ù…
            Ø§Ù„Ù…Ù†Ø§Ø³Ø¨.
          </p>

          <div className="review-state">

            <span />

            <div>

              <small>
                Ø­Ø§Ù„Ø© Ø§Ù„Ø·Ù„Ø¨
              </small>

              <strong>
                Ù‚ÙŠØ¯ Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø©
              </strong>

            </div>

          </div>

          <button
            className="success-home"
            onClick={() =>
              navigate("/home")
            }
          >
            Ø§Ù„Ø¹ÙˆØ¯Ø© Ù„Ù„Ø±Ø¦ÙŠØ³ÙŠØ©
          </button>

        </div>

      </div>
    );
  }

  /* =========================================
     Page
  ========================================= */

  return (
    <div className="register-page">

      <div className="register-shell">

        {/* =====================================
            Header
        ===================================== */}

        <header className="register-header">

          <button
            type="button"
            onClick={() => {
              if (step === 2) {
                setStep(1);

                return;
              }

              navigate(-1);
            }}
          >
            <ArrowRight
              size={25}
            />
          </button>

          <div>

            <h1>
              Ø³Ø¬Ù‘Ù„ Ø®Ø¯Ù…ØªÙƒ
            </h1>

            <p>
              ÙˆØ®Ù„Ù‘ÙŠ Ø£Ù‡Ù„ Ù†ÙŠØ¯Ù‡
              ÙŠÙˆØµÙ„ÙˆØ§ Ù„Ùƒ Ø¨Ø³Ù‡ÙˆÙ„Ø©
            </p>

          </div>

          <div className="register-step">
            {step}/2
          </div>

        </header>

        {/* =====================================
            Progress
        ===================================== */}

        <div className="register-progress">

          <span className="active" />

          <span
            className={
              step === 2
                ? "active"
                : ""
            }
          />

        </div>

        {/* =====================================
            STEP 1
        ===================================== */}

        {step === 1 && (
          <section className="type-step">

            <div className="register-intro">

              <span>
                Ø®Ø·ÙˆØ© Ø¨Ø³ÙŠØ·Ø©
              </span>

              <h2>
                Ø¥ÙŠÙ‡ Ø§Ù„Ù„ÙŠ Ø­Ø§Ø¨Ø¨ ØªØ³Ø¬Ù„Ù‡ØŸ
              </h2>

              <p>
                Ø§Ø®ØªØ§Ø± Ø§Ù„Ù‚Ø³Ù… Ø§Ù„Ù…Ù†Ø§Ø³Ø¨
                ÙˆÙ‡ØªØ¸Ù‡Ø±Ù„Ùƒ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª
                Ø§Ù„Ù…Ø·Ù„ÙˆØ¨Ø© ÙÙ‚Ø·.
              </p>

            </div>

            <div className="service-type-grid">

              {serviceTypes.map(
                ({
                  id,
                  title,
                  subtitle,
                  Icon,
                }) => (
                  <button
                    type="button"
                    key={id}
                    className="service-type-card"
                    onClick={() =>
                      chooseType(id)
                    }
                  >

                    <div
                      className={
                        `type-icon ${id}`
                      }
                    >
                      <Icon
                        size={25}
                      />
                    </div>

                    <div>

                      <strong>
                        {title}
                      </strong>

                      <small>
                        {subtitle}
                      </small>

                    </div>

                    <ChevronLeft
                      size={18}
                    />

                  </button>
                )
              )}

            </div>

            {/* Registration note */}

            <div className="registration-note">

              <ShieldCheck
                size={22}
              />

              <div>

                <strong>
                  Ø§Ù„ØªØ³Ø¬ÙŠÙ„ Ù…Ø¬Ø§Ù†ÙŠ
                </strong>

                <p>
                  Ù…ÙÙŠØ´ Ø§Ø´ØªØ±Ø§ÙƒØ§Øª Ø£Ùˆ
                  Ø±Ø³ÙˆÙ… Ù„Ø¥Ø¶Ø§ÙØ© Ø®Ø¯Ù…ØªÙƒ.
                </p>

              </div>

            </div>

          </section>
        )}

        {/* =====================================
            STEP 2
        ===================================== */}

        {step === 2 &&
          selectedConfig && (

          <form
            className="register-form"
            onSubmit={
              handleSubmit
            }
          >

            {/* Selected category */}

            <div className="selected-service-type">

              <div>
                <selectedConfig.Icon
                  size={23}
                />
              </div>

              <span>

                <small>
                  Ø§Ù„Ù‚Ø³Ù… Ø§Ù„Ù…Ø®ØªØ§Ø±
                </small>

                <strong>
                  {
                    selectedConfig.title
                  }
                </strong>

              </span>

              <button
                type="button"
                onClick={() =>
                  setStep(1)
                }
              >
                ØªØºÙŠÙŠØ±
              </button>

            </div>

            {/* =====================================
                Photo
            ===================================== */}

            <label className="image-upload-box">

              {form.image ? (
                <img
                  src={
                    URL.createObjectURL(
                      form.image
                    )
                  }
                  alt="Ù…Ø¹Ø§ÙŠÙ†Ø©"
                />
              ) : (
                <>

                  <span>
                    <Camera
                      size={25}
                    />
                  </span>

                  <strong>
                    {getImageLabel()}
                  </strong>

                  <small>
                    Ø§Ø¶ØºØ· Ù„Ø§Ø®ØªÙŠØ§Ø± ØµÙˆØ±Ø©
                    ÙˆØ§Ø¶Ø­Ø©
                  </small>

                </>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  updateField(
                    "image",
                    e.target
                      .files?.[0] ||
                      null
                  )
                }
              />

            </label>

            {/* =====================================
                Basic information
            ===================================== */}

            <div className="form-section-title">
              Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø£Ø³Ø§Ø³ÙŠØ©
            </div>

            {/* Name */}

            <label className="register-field">

              <span>
                {getNameLabel()}
              </span>

              <div>

                <User size={19} />

                <input
                  value={
                    form.name
                  }
                  onChange={(e) =>
                    updateField(
                      "name",
                      e.target.value
                    )
                  }
                  placeholder={
                    getNameLabel()
                  }
                />

              </div>

            </label>

            {/* =====================================
                Specialty

                Hidden for:
                Delivery
                Pharmacy
                Doctor
            ===================================== */}

            {![
              "delivery",
              "pharmacies",
              "doctors",
            ].includes(
              selectedType
            ) && (

              <label className="register-field">

                <span>
                  Ø§Ù„Ù†ÙˆØ¹ / Ø§Ù„ØªØ®ØµØµ
                </span>

                <div>

                  <Wrench
                    size={19}
                  />

                  <select
                    value={
                      form.specialty
                    }
                    onChange={(e) =>
                      updateField(
                        "specialty",
                        e.target.value
                      )
                    }
                  >

                    <option value="">
                      Ø§Ø®ØªØ± Ø§Ù„Ù†ÙˆØ¹
                    </option>

                    {specialties[
                      selectedType
                    ]?.map(
                      (item) => (
                        <option
                          key={
                            item
                          }
                          value={
                            item
                          }
                        >
                          {item}
                        </option>
                      )
                    )}

                  </select>

                </div>

              </label>

            )}

            {/* =====================================
                Automatic Type Badge
            ===================================== */}

            {[
              "delivery",
              "pharmacies",
              "doctors",
            ].includes(
              selectedType
            ) && (

              <div className="auto-specialty-card">

                <Wrench
                  size={18}
                />

                <div>

                  <small>
                    Ù†ÙˆØ¹ Ø§Ù„Ø®Ø¯Ù…Ø©
                  </small>

                  <strong>
                    {
                      form.specialty
                    }
                  </strong>

                </div>

              </div>

            )}

            {/* =====================================
                Phone
            ===================================== */}

            <label className="register-field">

              <span>
                Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ
              </span>

              <div>

                <Phone
                  size={19}
                />

                <input
                  type="tel"
                  dir="ltr"
                  inputMode="tel"
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

            {/* =====================================
                WhatsApp
            ===================================== */}

            <label className="register-field">

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
                  dir="ltr"
                  inputMode="tel"
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

            {/* =====================================
                Address
            ===================================== */}

            <label className="register-field">

              <span>
                Ø§Ù„Ø¹Ù†ÙˆØ§Ù†
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
                  placeholder="Ù…Ø«Ø§Ù„: Ø¨Ø¬ÙˆØ§Ø± Ø§Ù„Ù…Ø³Ø¬Ø¯ Ø§Ù„ÙƒØ¨ÙŠØ±"
                />

              </div>

            </label>

            {/* =====================================
                Working Hours
            ===================================== */}

            <label className="register-field">

              <span>
                Ù…ÙˆØ§Ø¹ÙŠØ¯ Ø§Ù„Ø¹Ù…Ù„

                <small>
                  {" "}Ø§Ø®ØªÙŠØ§Ø±ÙŠ
                </small>
              </span>

              <div>

                <Clock3
                  size={19}
                />

                <input
                  value={
                    form.workingHours
                  }
                  onChange={(e) =>
                    updateField(
                      "workingHours",
                      e.target.value
                    )
                  }
                  placeholder="Ù…Ø«Ø§Ù„: 8 ØµØ¨Ø§Ø­Ù‹Ø§ - 10 Ù…Ø³Ø§Ø¡Ù‹"
                />

              </div>

            </label>

            {/* =====================================
                Description
            ===================================== */}

            <label className="register-field description-field">

              <span>
                ØªÙØ§ØµÙŠÙ„ Ø¥Ø¶Ø§ÙÙŠØ©

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
                  value={
                    form.description
                  }
                  onChange={(e) =>
                    updateField(
                      "description",
                      e.target.value
                    )
                  }
                  placeholder={
                    getDescriptionPlaceholder()
                  }
                />

              </div>

            </label>

            {/* =====================================
                Consent
            ===================================== */}

            <label className="register-consent">

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

              <span className="custom-checkbox">

                {form.consent && (
                  <CheckCircle2
                    size={19}
                  />
                )}

              </span>

              <p>
                Ø£Ù†Ø§ ØµØ§Ø­Ø¨ Ù‡Ø°Ù‡ Ø§Ù„Ø®Ø¯Ù…Ø© /
                Ø§Ù„Ù†Ø´Ø§Ø· ÙˆØ£ÙˆØ§ÙÙ‚ Ø¹Ù„Ù‰ Ù†Ø´Ø±
                Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„ØªÙˆØ§ØµÙ„ Ø¯Ø§Ø®Ù„
                Ù…Ù†ØµØ© Ù†ÙŠØ¯Ù‡.
              </p>

            </label>

            {/* =====================================
                Submit
            ===================================== */}

            <button
              type="submit"
              className="submit-registration"
              disabled={
                submitting
              }
            >

              {submitting ? (
                <>

                  <span className="register-loader" />

                  Ø¬Ø§Ø±ÙŠ Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ø·Ù„Ø¨...

                </>
              ) : (
                <>

                  Ø¥Ø±Ø³Ø§Ù„ Ù„Ù„Ù…Ø±Ø§Ø¬Ø¹Ø©

                  <ChevronLeft
                    size={19}
                  />

                </>
              )}

            </button>

            {submitError && (

              <div className="register-submit-error">
                {submitError}
              </div>

            )}

            <p className="submit-note">
              Ù„Ù† ØªØ¸Ù‡Ø± Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ù„Ù„Ø¹Ø§Ù…Ø©
              Ø¥Ù„Ø§ Ø¨Ø¹Ø¯ Ù…Ø±Ø§Ø¬Ø¹ØªÙ‡Ø§
              ÙˆØ§Ù„Ù…ÙˆØ§ÙÙ‚Ø© Ø¹Ù„ÙŠÙ‡Ø§.
            </p>

          </form>
        )}

      </div>

    </div>
  );
}
