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
  "سوبر ماركت",
  "صيدلية",
  "عيادة / طبيب",
  "مطعم",
  "مخبز",
  "محل ملابس",
  "أجهزة كهربائية",
  "موبايلات",
  "صنايعي",
  "خدمة توصيل",
  "مواصلات",
  "مركز تعليمي",
  "نشاط تجاري آخر",
];

/* =========================================
   Placements
========================================= */

const placements = [
  {
    id: "home_banner",
    title: "بانر الرئيسية",
    description:
      "إعلان كبير يظهر في الصفحة الرئيسية.",
    icon: "🏠",
  },

  {
    id: "category",
    title: "داخل الأقسام",
    description:
      "يظهر إعلانك داخل القسم المناسب لنشاطك.",
    icon: "▦",
  },

  {
    id: "featured",
    title: "ظهور مميز",
    description:
      "إبراز نشاطك بشكل أوضح داخل المنصة.",
    icon: "★",
  },
];

/* =========================================
   Durations
========================================= */

const durations = [
  {
    id: "7_days",
    title: "أسبوع",
    days: 7,
  },

  {
    id: "14_days",
    title: "أسبوعين",
    days: 14,
  },

  {
    id: "30_days",
    title: "شهر",
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
        "من فضلك اختر صورة صحيحة"
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
        "من فضلك اكتب اسم النشاط"
      );

      return;
    }

    if (
      !form.businessType
    ) {
      alert(
        "من فضلك اختر نوع النشاط"
      );

      return;
    }

    if (!form.phone.trim()) {
      alert(
        "من فضلك اكتب رقم الهاتف"
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
        "من فضلك اكتب رقم هاتف صحيح"
      );

      return;
    }

    if (!form.image) {
      alert(
        "من فضلك أضف صورة الإعلان"
      );

      return;
    }

    if (!form.consent) {
      alert(
        "لازم توافق على مراجعة الإعلان قبل نشره"
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
        "حصلت مشكلة أثناء إرسال طلب الإعلان، حاول مرة تانية."
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
              تم استلام طلب الإعلان
            </span>

            <h1>
              إعلانك وصلنا بنجاح
            </h1>

            <p>
              هنراجع بيانات الإعلان
              ونتواصل معاك لتأكيد التفاصيل
              قبل نشره على منصة نيده.
            </p>

            <div className="ad-review-status">

              <span className="ad-review-dot" />

              <div>
                <small>
                  حالة الإعلان
                </small>

                <strong>
                  قيد المراجعة
                </strong>
              </div>

            </div>

            <div className="advertise-success-note">

              <MessageCircle
                size={19}
              />

              <p>
                بعد المراجعة هنتواصل معاك
                على رقم الهاتف أو الواتساب
                المسجل.
              </p>

            </div>

            <button
              className="advertise-home-button"
              onClick={() =>
                navigate("/home")
              }
            >
              العودة للرئيسية
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
              الإعلانات
            </span>

            <h1>
              أعلن في نيده
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
              وصّل نشاطك لأهل نيده
            </span>

            <h2>
              خلي الناس تشوفك أسرع
            </h2>

            <p>
              سجل بيانات نشاطك والإعلان،
              وإحنا هنراجع الطلب ونتواصل
              معاك قبل النشر.
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
                بيانات النشاط
              </strong>

              <small>
                البيانات الأساسية للإعلان
              </small>
            </div>

          </div>

          {/* Business name */}

          <label className="advertise-field">

            <span>
              اسم النشاط
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
                placeholder="مثال: سوبر ماركت النور"
              />

            </div>

          </label>

          {/* Owner */}

          <label className="advertise-field">

            <span>
              اسم صاحب النشاط

              <small>
                {" "}اختياري
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
                placeholder="الاسم"
              />

            </div>

          </label>

          {/* Business type */}

          <label className="advertise-field">

            <span>
              نوع النشاط
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
                  اختر نوع النشاط
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
              رقم الهاتف
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
              العنوان

              <small>
                {" "}اختياري
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
                placeholder="مثال: الشارع الرئيسي"
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
                محتوى الإعلان
              </strong>

              <small>
                الصورة والكلام اللي هيظهر
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
                  alt="معاينة الإعلان"
                />

                <div className="advertise-change-image">

                  <Camera
                    size={17}
                  />

                  تغيير الصورة

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
                  أضف صورة الإعلان
                </strong>

                <p>
                  صورة واضحة للنشاط أو
                  عرض إعلاني جاهز
                </p>

                <span>
                  اختيار صورة
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
              نص الإعلان

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
                placeholder="مثال: كل احتياجات البيت بأسعار مميزة وتوصيل داخل نيده..."
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
                مكان الإعلان
              </strong>

              <small>
                اختار المكان المناسب
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
                مدة الإعلان
              </strong>

              <small>
                المدة المطلوبة للنشر
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
                      يوم
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
                السعر بيتحدد بعد مراجعة الطلب
              </strong>

              <p>
                هنتواصل معاك لتأكيد مكان
                الإعلان والمدة والتكلفة قبل
                النشر.
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
              أوافق على مراجعة الإعلان
              والتواصل معي قبل نشره داخل
              منصة نيده.
            </p>

          </label>

          {/* Security */}

          <div className="advertise-security">

            <ShieldCheck
              size={18}
            />

            الإعلان مش هيظهر للعامة
            إلا بعد المراجعة والموافقة.

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

                جاري إرسال الطلب...

              </>
            ) : (
              <>

                <Megaphone
                  size={19}
                />

                إرسال طلب الإعلان

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
            الرئيسية
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
            الأقسام
          </span>
        </button>

        <button
          onClick={() =>
            navigate("/search")
          }
        >
          <Search size={22} />
          <span>
            بحث
          </span>
        </button>

        <button>
          <MoreHorizontal
            size={23}
          />
          <span>
            المزيد
          </span>
        </button>

      </nav>

    </div>
  );
}
