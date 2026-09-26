import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowRight,
  Share2,
  Phone,
  MessageCircle,
  MapPin,
  Clock3,
  Navigation,
  AlertCircle,
  ImageOff,
} from "lucide-react";

import {
  getServiceById,
} from "../services/servicesApi";

import "../styles/serviceDetails.css";

export default function ServiceDetails() {
  const navigate = useNavigate();

  const { serviceId } =
    useParams();

  const [service, setService] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [imageLoaded, setImageLoaded] =
    useState(false);

  const [imageError, setImageError] =
    useState(false);

  /* ==============================
     Load service from RTDB
  ============================== */

  useEffect(() => {
    let mounted = true;

    const loadService =
      async () => {
        try {
          setLoading(true);

          const data =
            await getServiceById(
              serviceId
            );

          console.log(
            "SERVICE DETAILS:",
            data
          );

          if (mounted) {
            setService(data);
          }

        } catch (error) {
          console.error(
            "LOAD SERVICE ERROR:",
            error
          );

          if (mounted) {
            setService(null);
          }

        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
      };

    loadService();

    return () => {
      mounted = false;
    };

  }, [serviceId]);

  /* ==============================
     Call
  ============================== */

  const callService = () => {
    if (!service?.phone) {
      return;
    }

    window.location.href =
      `tel:${service.phone}`;
  };

  /* ==============================
     WhatsApp
  ============================== */

  const openWhatsApp = () => {
    if (!service?.whatsapp) {
      return;
    }

    let number =
      service.whatsapp.replace(
        /\D/g,
        ""
      );

    if (number.startsWith("0")) {
      number =
        `20${number.slice(1)}`;
    }

    const message =
      encodeURIComponent(
        `السلام عليكم، وصلت لبياناتك من منصة نيده`
      );

    window.open(
      `https://wa.me/${number}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* ==============================
     Share
  ============================== */

  const shareService =
    async () => {
      const shareData = {
        title:
          service?.name ||
          "نيده",

        text:
          `${service?.name || ""} - ${
            service?.specialty || ""
          }`,

        url:
          window.location.href,
      };

      try {
        if (navigator.share) {
          await navigator.share(
            shareData
          );

          return;
        }

        await navigator.clipboard.writeText(
          window.location.href
        );

        alert(
          "تم نسخ رابط الخدمة"
        );

      } catch (error) {
        console.log(
          "Share cancelled:",
          error
        );
      }
    };

  /* ==============================
     Loading
  ============================== */

  if (loading) {
    return (
      <div className="service-details-page">
        <div className="service-details-shell">

          <div className="details-skeleton-hero shimmer" />

          <div className="details-skeleton-body">

            <div className="details-skeleton-title shimmer" />

            <div className="details-skeleton-small shimmer" />

            <div className="details-skeleton-actions">

              <div className="shimmer" />

              <div className="shimmer" />

            </div>

            <div className="details-skeleton-card shimmer" />

            <div className="details-skeleton-card small shimmer" />

          </div>

        </div>
      </div>
    );
  }

  /* ==============================
     Not Found
  ============================== */

  if (!service) {
    return (
      <div className="service-details-page">

        <div className="service-not-found">

          <div>
            <AlertCircle size={34} />
          </div>

          <h1>
            الخدمة غير موجودة
          </h1>

          <p>
            ممكن تكون الخدمة اتحذفت
            أو الرابط غير صحيح.
          </p>

          <button
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

  const image =
    service.imageBase64 ||
    service.image ||
    "";

  return (
    <div className="service-details-page">

      <div className="service-details-shell service-details-enter">

        {/* Hero */}

        <div className="service-hero">

          {image && !imageError ? (
            <>
              {!imageLoaded && (
                <div className="hero-image-shimmer shimmer" />
              )}

              <img
                src={image}
                alt={service.name}
                className={
                  imageLoaded
                    ? "loaded"
                    : ""
                }
                onLoad={() =>
                  setImageLoaded(true)
                }
                onError={() =>
                  setImageError(true)
                }
              />
            </>
          ) : (
            <div className="details-image-placeholder">

              <ImageOff size={35} />

              <span>
                {service.name?.charAt(
                  0
                )}
              </span>

            </div>
          )}

          <div className="service-hero-overlay" />

          <button
            className="details-back"
            onClick={() =>
              navigate(-1)
            }
          >
            <ArrowRight size={23} />
          </button>

          <button
            className="details-share"
            onClick={
              shareService
            }
          >
            <Share2 size={20} />
          </button>

        </div>

        {/* Main */}

        <main className="service-details-content">

          <span className="service-specialty-chip">
            {service.specialty ||
              service.profession ||
              "خدمة"}
          </span>

          <h1>
            {service.name}
          </h1>

          {(service.address ||
            service.location) && (
            <p className="service-main-location">

              <MapPin size={16} />

              {service.address ||
                service.location}

            </p>
          )}

          {/* Primary actions */}

          <div className="service-primary-actions">

            {service.phone && (
              <button
                className="details-call-action"
                onClick={
                  callService
                }
              >
                <span>
                  <Phone size={21} />
                </span>

                <div>
                  <small>
                    اتصال مباشر
                  </small>

                  <strong>
                    اتصل الآن
                  </strong>
                </div>
              </button>
            )}

            {service.whatsapp && (
              <button
                className="details-whatsapp-action"
                onClick={
                  openWhatsApp
                }
              >
                <span>
                  <MessageCircle
                    size={22}
                  />
                </span>

                <div>
                  <small>
                    واتساب
                  </small>

                  <strong>
                    ابعت رسالة
                  </strong>
                </div>
              </button>
            )}

          </div>

          {/* Info */}

          <section className="details-section">

            <h2>
              بيانات الخدمة
            </h2>

            <div className="service-information-card">

              {(service.address ||
                service.location) && (
                <div className="information-row">

                  <span>
                    <MapPin
                      size={19}
                    />
                  </span>

                  <div>
                    <small>
                      العنوان
                    </small>

                    <strong>
                      {service.address ||
                        service.location}
                    </strong>
                  </div>

                </div>
              )}

              {service.workingHours && (
                <div className="information-row">

                  <span>
                    <Clock3
                      size={19}
                    />
                  </span>

                  <div>
                    <small>
                      مواعيد العمل
                    </small>

                    <strong>
                      {
                        service.workingHours
                      }
                    </strong>
                  </div>

                </div>
              )}

            </div>

          </section>

          {/* Description */}

          {service.description && (
            <section className="details-section">

              <h2>
                عن الخدمة
              </h2>

              <div className="service-description-card">
                {
                  service.description
                }
              </div>

            </section>
          )}

          {/* Location */}

          {(service.address ||
            service.location) && (
            <section className="details-section">

              <h2>
                الموقع
              </h2>

              <div className="service-location-card">

                <div className="fake-map">

                  <MapPin size={31} />

                  <span>
                    {service.location ||
                      "نيده"}
                  </span>

                </div>

                <div className="location-bottom">

                  <div>
                    <small>
                      العنوان
                    </small>

                    <strong>
                      {service.address ||
                        service.location}
                    </strong>
                  </div>

                  <button>
                    <Navigation
                      size={17}
                    />

                    الاتجاهات
                  </button>

                </div>

              </div>

            </section>
          )}

          <button className="report-service">

            <AlertCircle
              size={17}
            />

            بيانات غير صحيحة؟
            بلّغنا

          </button>

        </main>

        {/* Bottom */}

        <div className="service-sticky-actions">

          {service.phone && (
            <button
              className="sticky-call"
              onClick={
                callService
              }
            >
              <Phone size={19} />
              اتصال
            </button>
          )}

          {service.whatsapp && (
            <button
              className="sticky-whatsapp"
              onClick={
                openWhatsApp
              }
            >
              <MessageCircle
                size={20}
              />

              واتساب
            </button>
          )}

        </div>

      </div>

    </div>
  );
}
