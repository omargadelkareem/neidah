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
        `Ø§Ù„Ø³Ù„Ø§Ù… Ø¹Ù„ÙŠÙƒÙ…ØŒ ÙˆØµÙ„Øª Ù„Ø¨ÙŠØ§Ù†Ø§ØªÙƒ Ù…Ù† Ù…Ù†ØµØ© Ù†ÙŠØ¯Ù‡`
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
          "Ù†ÙŠØ¯Ù‡",

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
          "ØªÙ… Ù†Ø³Ø® Ø±Ø§Ø¨Ø· Ø§Ù„Ø®Ø¯Ù…Ø©"
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
            Ø§Ù„Ø®Ø¯Ù…Ø© ØºÙŠØ± Ù…ÙˆØ¬ÙˆØ¯Ø©
          </h1>

          <p>
            Ù…Ù…ÙƒÙ† ØªÙƒÙˆÙ† Ø§Ù„Ø®Ø¯Ù…Ø© Ø§ØªØ­Ø°ÙØª
            Ø£Ùˆ Ø§Ù„Ø±Ø§Ø¨Ø· ØºÙŠØ± ØµØ­ÙŠØ­.
          </p>

          <button
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
              "Ø®Ø¯Ù…Ø©"}
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
                    Ø§ØªØµØ§Ù„ Ù…Ø¨Ø§Ø´Ø±
                  </small>

                  <strong>
                    Ø§ØªØµÙ„ Ø§Ù„Ø¢Ù†
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
                    ÙˆØ§ØªØ³Ø§Ø¨
                  </small>

                  <strong>
                    Ø§Ø¨Ø¹Øª Ø±Ø³Ø§Ù„Ø©
                  </strong>
                </div>
              </button>
            )}

          </div>

          {/* Info */}

          <section className="details-section">

            <h2>
              Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø®Ø¯Ù…Ø©
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
                      Ø§Ù„Ø¹Ù†ÙˆØ§Ù†
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
                      Ù…ÙˆØ§Ø¹ÙŠØ¯ Ø§Ù„Ø¹Ù…Ù„
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
                Ø¹Ù† Ø§Ù„Ø®Ø¯Ù…Ø©
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
                Ø§Ù„Ù…ÙˆÙ‚Ø¹
              </h2>

              <div className="service-location-card">

                <div className="fake-map">

                  <MapPin size={31} />

                  <span>
                    {service.location ||
                      "Ù†ÙŠØ¯Ù‡"}
                  </span>

                </div>

                <div className="location-bottom">

                  <div>
                    <small>
                      Ø§Ù„Ø¹Ù†ÙˆØ§Ù†
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

                    Ø§Ù„Ø§ØªØ¬Ø§Ù‡Ø§Øª
                  </button>

                </div>

              </div>

            </section>
          )}

          <button className="report-service">

            <AlertCircle
              size={17}
            />

            Ø¨ÙŠØ§Ù†Ø§Øª ØºÙŠØ± ØµØ­ÙŠØ­Ø©ØŸ
            Ø¨Ù„Ù‘ØºÙ†Ø§

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
              Ø§ØªØµØ§Ù„
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

              ÙˆØ§ØªØ³Ø§Ø¨
            </button>
          )}

        </div>

      </div>

    </div>
  );
}
