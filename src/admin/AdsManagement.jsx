import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowRight,
  BadgeCheck,
  Ban,
  CalendarDays,
  Check,
  Clock3,
  ImageOff,
  MapPin,
  MessageCircle,
  Phone,
  RefreshCw,
  Store,
  Trash2,
  X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  approveAdRequest,
  deleteAd,
  deleteAdRequest,
  listenAdRequests,
  listenAds,
  rejectAdRequest,
  toggleAdActive,
} from "../services/adsApi";

import "../styles/adsManagement.css";

/* =========================================
   Helpers
========================================= */

function formatDate(timestamp) {
  if (!timestamp) return "—";

  return new Intl.DateTimeFormat(
    "ar-EG",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  ).format(new Date(timestamp));
}

function remainingDays(endAt) {
  if (!endAt) return null;

  const difference =
    endAt - Date.now();

  if (difference <= 0) {
    return 0;
  }

  return Math.ceil(
    difference /
      (1000 * 60 * 60 * 24)
  );
}

function openWhatsApp(number) {
  if (!number) return;

  let cleanNumber =
    number.replace(/\D/g, "");

  if (
    cleanNumber.startsWith("0")
  ) {
    cleanNumber =
      `20${cleanNumber.slice(1)}`;
  }

  window.open(
    `https://wa.me/${cleanNumber}`,
    "_blank",
    "noopener,noreferrer"
  );
}

/* =========================================
   Page
========================================= */

export default function AdsManagement() {
  const navigate = useNavigate();

  const [requests, setRequests] =
    useState([]);

  const [ads, setAds] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [tab, setTab] =
    useState("requests");

  const [workingId, setWorkingId] =
    useState("");

  /* =========================================
     Realtime data
  ========================================= */

  useEffect(() => {
    let requestLoaded = false;
    let adsLoaded = false;

    const checkLoading = () => {
      if (
        requestLoaded &&
        adsLoaded
      ) {
        setLoading(false);
      }
    };

    const unsubscribeRequests =
      listenAdRequests((data) => {
        setRequests(data);

        requestLoaded = true;

        checkLoading();
      });

    const unsubscribeAds =
      listenAds((data) => {
        setAds(data);

        adsLoaded = true;

        checkLoading();
      });

    return () => {
      unsubscribeRequests?.();
      unsubscribeAds?.();
    };
  }, []);

  /* =========================================
     Pending
  ========================================= */

  const pendingRequests =
    useMemo(() => {
      return requests.filter(
        (request) =>
          request.status ===
          "pending"
      );
    }, [requests]);

  /* =========================================
     Actions
  ========================================= */

  const handleApprove =
    async (request) => {
      const confirmed =
        window.confirm(
          `تأكيد نشر إعلان "${request.businessName}"؟`
        );

      if (!confirmed) return;

      try {
        setWorkingId(
          request.id
        );

        await approveAdRequest(
          request
        );
      } catch (error) {
        console.error(error);

        alert(
          "حصل خطأ أثناء قبول الإعلان"
        );
      } finally {
        setWorkingId("");
      }
    };

  const handleReject =
    async (request) => {
      const confirmed =
        window.confirm(
          `رفض إعلان "${request.businessName}"؟`
        );

      if (!confirmed) return;

      try {
        setWorkingId(
          request.id
        );

        await rejectAdRequest(
          request.id
        );
      } catch (error) {
        console.error(error);

        alert(
          "حصل خطأ أثناء رفض الإعلان"
        );
      } finally {
        setWorkingId("");
      }
    };

  const handleDeleteRequest =
    async (request) => {
      const confirmed =
        window.confirm(
          "حذف طلب الإعلان نهائيًا؟"
        );

      if (!confirmed) return;

      await deleteAdRequest(
        request.id
      );
    };

  const handleDeleteAd =
    async (ad) => {
      const confirmed =
        window.confirm(
          `حذف إعلان "${ad.businessName}" نهائيًا؟`
        );

      if (!confirmed) return;

      await deleteAd(ad.id);
    };

  return (
    <main className="ads-admin-page">

      {/* Header */}

      <header className="ads-admin-header">

        <button
          onClick={() =>
            navigate("/admin")
          }
          className="ads-back-button"
        >
          <ArrowRight size={21} />
        </button>

        <div>
          <span>
            لوحة الإدارة
          </span>

          <h1>
            إدارة الإعلانات
          </h1>
        </div>

      </header>

      {/* Stats */}

      <section className="ads-admin-stats">

        <div>
          <Clock3 size={21} />

          <strong>
            {
              pendingRequests.length
            }
          </strong>

          <span>
            طلبات جديدة
          </span>
        </div>

        <div>
          <BadgeCheck size={21} />

          <strong>
            {
              ads.filter(
                (ad) =>
                  ad.active === true &&
                  (!ad.endAt ||
                    ad.endAt >
                      Date.now())
              ).length
            }
          </strong>

          <span>
            إعلانات نشطة
          </span>
        </div>

        <div>
          <Store size={21} />

          <strong>
            {ads.length}
          </strong>

          <span>
            إجمالي الإعلانات
          </span>
        </div>

      </section>

      {/* Tabs */}

      <div className="ads-admin-tabs">

        <button
          className={
            tab === "requests"
              ? "active"
              : ""
          }
          onClick={() =>
            setTab("requests")
          }
        >
          طلبات الإعلانات

          {pendingRequests.length >
            0 && (
            <span>
              {
                pendingRequests.length
              }
            </span>
          )}
        </button>

        <button
          className={
            tab === "ads"
              ? "active"
              : ""
          }
          onClick={() =>
            setTab("ads")
          }
        >
          الإعلانات المنشورة
        </button>

      </div>

      {/* Loading */}

      {loading && (
        <div className="ads-admin-loading">

          <RefreshCw
            size={28}
            className="spin"
          />

          <p>
            جاري تحميل الإعلانات...
          </p>

        </div>
      )}

      {/* Requests */}

      {!loading &&
        tab === "requests" && (
          <section className="ads-admin-list">

            {pendingRequests.length ===
            0 ? (
              <div className="ads-empty">

                <BadgeCheck
                  size={34}
                />

                <h3>
                  مفيش طلبات جديدة
                </h3>

                <p>
                  أي طلب إعلان جديد
                  هيظهر هنا للمراجعة.
                </p>

              </div>
            ) : (
              pendingRequests.map(
                (request) => (
                  <article
                    key={request.id}
                    className="ad-request-card"
                  >

                    <div className="ad-request-image">

                      {request.imageBase64 ? (
                        <img
                          src={
                            request.imageBase64
                          }
                          alt={
                            request.businessName
                          }
                        />
                      ) : (
                        <ImageOff
                          size={30}
                        />
                      )}

                      <span>
                        قيد المراجعة
                      </span>

                    </div>

                    <div className="ad-request-content">

                      <div className="ad-request-title">

                        <div>
                          <small>
                            {
                              request.businessType
                            }
                          </small>

                          <h2>
                            {
                              request.businessName
                            }
                          </h2>
                        </div>

                        <span className="ad-duration">
                          {
                            request.durationDays
                          }{" "}
                          يوم
                        </span>

                      </div>

                      {request.ownerName && (
                        <p>
                          صاحب النشاط:{" "}
                          <strong>
                            {
                              request.ownerName
                            }
                          </strong>
                        </p>
                      )}

                      <div className="ad-request-meta">

                        <span>
                          <MapPin
                            size={15}
                          />

                          {request.address ||
                            "نيده"}
                        </span>

                        <span>
                          <CalendarDays
                            size={15}
                          />

                          {request.placementTitle ||
                            request.placement}
                        </span>

                      </div>

                      {request.description && (
                        <p className="ad-description">
                          {
                            request.description
                          }
                        </p>
                      )}

                      <div className="ad-contact-buttons">

                        {request.phone && (
                          <a
                            href={`tel:${request.phone}`}
                          >
                            <Phone
                              size={17}
                            />
                            اتصال
                          </a>
                        )}

                        {request.whatsapp && (
                          <button
                            onClick={() =>
                              openWhatsApp(
                                request.whatsapp
                              )
                            }
                          >
                            <MessageCircle
                              size={18}
                            />
                            واتساب
                          </button>
                        )}

                      </div>

                      <div className="ad-review-actions">

                        <button
                          className="approve-ad"
                          disabled={
                            workingId ===
                            request.id
                          }
                          onClick={() =>
                            handleApprove(
                              request
                            )
                          }
                        >
                          <Check
                            size={18}
                          />

                          قبول ونشر
                        </button>

                        <button
                          className="reject-ad"
                          disabled={
                            workingId ===
                            request.id
                          }
                          onClick={() =>
                            handleReject(
                              request
                            )
                          }
                        >
                          <X
                            size={18}
                          />

                          رفض
                        </button>

                        <button
                          className="delete-request"
                          onClick={() =>
                            handleDeleteRequest(
                              request
                            )
                          }
                        >
                          <Trash2
                            size={18}
                          />
                        </button>

                      </div>

                    </div>

                  </article>
                )
              )
            )}

          </section>
        )}

      {/* Published */}

      {!loading &&
        tab === "ads" && (
          <section className="ads-admin-list">

            {ads.length === 0 ? (
              <div className="ads-empty">

                <Store size={34} />

                <h3>
                  مفيش إعلانات منشورة
                </h3>

              </div>
            ) : (
              ads.map((ad) => {
                const days =
                  remainingDays(
                    ad.endAt
                  );

                const expired =
                  days === 0;

                return (
                  <article
                    key={ad.id}
                    className={`published-ad-card ${
                      expired
                        ? "expired"
                        : ""
                    }`}
                  >

                    <div className="published-ad-image">

                      {ad.imageBase64 ? (
                        <img
                          src={
                            ad.imageBase64
                          }
                          alt={
                            ad.businessName
                          }
                        />
                      ) : (
                        <ImageOff
                          size={28}
                        />
                      )}

                    </div>

                    <div className="published-ad-body">

                      <div className="published-ad-head">

                        <div>
                          <small>
                            {
                              ad.businessType
                            }
                          </small>

                          <h3>
                            {
                              ad.businessName
                            }
                          </h3>
                        </div>

                        <span
                          className={
                            expired
                              ? "expired-status"
                              : ad.active
                                ? "active-status"
                                : "paused-status"
                          }
                        >
                          {expired
                            ? "منتهي"
                            : ad.active
                              ? "نشط"
                              : "متوقف"}
                        </span>

                      </div>

                      <div className="published-ad-dates">

                        <span>
                          من{" "}
                          {formatDate(
                            ad.startAt
                          )}
                        </span>

                        <span>
                          إلى{" "}
                          {formatDate(
                            ad.endAt
                          )}
                        </span>

                      </div>

                      {!expired &&
                        days !== null && (
                          <p className="remaining-days">
                            متبقي {days} يوم
                          </p>
                        )}

                      <div className="published-ad-actions">

                        {!expired && (
                          <button
                            onClick={() =>
                              toggleAdActive(
                                ad.id,
                                !ad.active
                              )
                            }
                          >
                            {ad.active ? (
                              <>
                                <Ban
                                  size={17}
                                />
                                إيقاف
                              </>
                            ) : (
                              <>
                                <Check
                                  size={17}
                                />
                                تفعيل
                              </>
                            )}
                          </button>
                        )}

                        <button
                          className="delete-ad"
                          onClick={() =>
                            handleDeleteAd(
                              ad
                            )
                          }
                        >
                          <Trash2
                            size={17}
                          />
                          حذف
                        </button>

                      </div>

                    </div>

                  </article>
                );
              })
            )}

          </section>
        )}

    </main>
  );
}