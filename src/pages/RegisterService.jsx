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
    title: "صنايعي",
    subtitle: "سباك، كهربائي، أجهزة منزلية...",
    Icon: Wrench,
  },

  {
    id: "supermarkets",
    title: "سوبر ماركت",
    subtitle: "سوبر ماركت أو بقالة",
    Icon: ShoppingBasket,
  },

  {
    id: "pharmacies",
    title: "صيدلية",
    subtitle: "صيدلية داخل نيده",
    Icon: Pill,
  },

  {
    id: "doctors",
    title: "طبيب",
    subtitle: "طبيب أو عيادة",
    Icon: Stethoscope,
  },

  {
    id: "transport",
    title: "مواصلات",
    subtitle: "سيارة خاصة، توك توك...",
    Icon: Car,
  },

  {
    id: "delivery",
    title: "توصيل للمنازل",
    subtitle: "توصيل الطلبات داخل نيده",
    Icon: Bike,
  },

  {
    id: "education",
    title: "تعليم",
    subtitle: "مدرس، سنتر، حضانة...",
    Icon: GraduationCap,
  },
];

/* =========================================
   Specialties
========================================= */

const specialties = {
  craftsmen: [
    "سباك",
    "كهربائي",
    "نجار",
    "دهان",
    "نقاش",
    "فني تكييف",
    "فني دش وريسيفر",
    "فني ثلاجات",
    "فني غسالات",
    "فني بوتاجازات",
    "فني سخانات",
    "حداد",
    "عامل بناء",
    "أخرى",
  ],

  supermarkets: [
    "سوبر ماركت",
    "بقالة",
  ],

  pharmacies: [
    "صيدلية",
  ],

  doctors: [
    "طبيب",
  ],

  transport: [
    "سيارة خاصة",
    "توك توك",
    "ميكروباص",
    "تاكسي",
    "نقل بضائع",
    "أخرى",
  ],

  delivery: [
    "توصيل طلبات",
  ],

  education: [
    "مدرس",
    "سنتر تعليمي",
    "حضانة",
    "تحفيظ قرآن",
    "دورات تدريبية",
    "أخرى",
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
        "توصيل طلبات";
    }

    if (type === "pharmacies") {
      automaticSpecialty =
        "صيدلية";
    }

    if (type === "doctors") {
      automaticSpecialty =
        "طبيب";
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
        return "اسم الصنايعي";

      case "supermarkets":
        return "اسم السوبر ماركت";

      case "pharmacies":
        return "اسم الصيدلية";

      case "doctors":
        return "اسم الطبيب";

      case "transport":
        return "اسم السائق";

      case "delivery":
        return "اسم الدليفري";

      case "education":
        return "اسم المدرس أو المركز";

      default:
        return "الاسم";
    }
  };

  /* =========================================
     Image Label
  ========================================= */

  const getImageLabel = () => {
    switch (selectedType) {
      case "craftsmen":
        return "صورة الصنايعي";

      case "supermarkets":
        return "صورة السوبر ماركت";

      case "pharmacies":
        return "صورة الصيدلية";

      case "doctors":
        return "صورة الطبيب";

      case "transport":
        return "صورة السائق أو السيارة";

      case "delivery":
        return "صورة الدليفري";

      case "education":
        return "صورة المدرس أو المركز";

      default:
        return "أضف صورة";
    }
  };

  /* =========================================
     Description Placeholder
  ========================================= */

  const getDescriptionPlaceholder =
    () => {
      switch (selectedType) {
        case "craftsmen":
          return "مثال: خبرة في أعمال السباكة والصيانة المنزلية...";

        case "supermarkets":
          return "اكتب نبذة بسيطة عن السوبر ماركت والخدمات المتاحة...";

        case "pharmacies":
          return "اكتب أي معلومات إضافية عن الصيدلية...";

        case "doctors":
          return "مثال: التخصص، أيام العيادة أو أي معلومات مهمة...";

        case "transport":
          return "مثال: المناطق المتاحة، نوع السيارة أو مواعيد العمل...";

        case "delivery":
          return "مثال: متاح لتوصيل الطلبات داخل نيده طوال اليوم...";

        case "education":
          return "مثال: المادة، المرحلة الدراسية أو مكان الدروس...";

        default:
          return "اكتب نبذة بسيطة...";
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
        `من فضلك اكتب ${getNameLabel()}`
      );

      return;
    }

    /* Specialty */

    if (!form.specialty) {
      alert(
        "من فضلك اختر النوع / التخصص"
      );

      return;
    }

    /* Phone */

    if (!form.phone.trim()) {
      alert(
        "من فضلك اكتب رقم الهاتف"
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
        "من فضلك اكتب رقم هاتف صحيح"
      );

      return;
    }

    /* Consent */

    if (!form.consent) {
      alert(
        "لازم توافق على نشر بيانات التواصل"
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
        "حصلت مشكلة أثناء إرسال الطلب، حاول مرة تانية."
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
            تم استلام طلبك
          </span>

          <h1>
            طلبك وصلنا بنجاح
          </h1>

          <p>
            هنراجع البيانات الأول،
            وبعد الموافقة هتظهر خدمتك
            لأهل نيده داخل القسم
            المناسب.
          </p>

          <div className="review-state">

            <span />

            <div>

              <small>
                حالة الطلب
              </small>

              <strong>
                قيد المراجعة
              </strong>

            </div>

          </div>

          <button
            className="success-home"
            onClick={() =>
              navigate("/home")
            }
          >
            العودة للرئيسية
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
              سجّل خدمتك
            </h1>

            <p>
              وخلّي أهل نيده
              يوصلوا لك بسهولة
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
                خطوة بسيطة
              </span>

              <h2>
                إيه اللي حابب تسجله؟
              </h2>

              <p>
                اختار القسم المناسب
                وهتظهرلك البيانات
                المطلوبة فقط.
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
                  التسجيل مجاني
                </strong>

                <p>
                  مفيش اشتراكات أو
                  رسوم لإضافة خدمتك.
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
                  القسم المختار
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
                تغيير
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
                  alt="معاينة"
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
                    اضغط لاختيار صورة
                    واضحة
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
              البيانات الأساسية
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
                  النوع / التخصص
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
                      اختر النوع
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
                    نوع الخدمة
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
                رقم الهاتف
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
                رقم واتساب

                <small>
                  {" "}اختياري
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
                العنوان
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
                  placeholder="مثال: بجوار المسجد الكبير"
                />

              </div>

            </label>

            {/* =====================================
                Working Hours
            ===================================== */}

            <label className="register-field">

              <span>
                مواعيد العمل

                <small>
                  {" "}اختياري
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
                  placeholder="مثال: 8 صباحًا - 10 مساءً"
                />

              </div>

            </label>

            {/* =====================================
                Description
            ===================================== */}

            <label className="register-field description-field">

              <span>
                تفاصيل إضافية

                <small>
                  {" "}اختياري
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
                أنا صاحب هذه الخدمة /
                النشاط وأوافق على نشر
                بيانات التواصل داخل
                منصة نيده.
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

                  جاري إرسال الطلب...

                </>
              ) : (
                <>

                  إرسال للمراجعة

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
              لن تظهر البيانات للعامة
              إلا بعد مراجعتها
              والموافقة عليها.
            </p>

          </form>
        )}

      </div>

    </div>
  );
}
