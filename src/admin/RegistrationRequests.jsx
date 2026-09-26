import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  ArrowRight,
  Phone,
  MessageCircle,
  MapPin,
  Clock3,
  Check,
  X,
  Inbox,
} from "lucide-react";

import {
  listenToPendingRequests,
  approveRequest,
  rejectRequest,
} from "../services/adminApi";

import "../styles/registrationRequests.css";

export default function RegistrationRequests() {
  const navigate =
    useNavigate();

  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [processingId, setProcessingId] =
    useState(null);

  useEffect(() => {
    const unsubscribe =
      listenToPendingRequests(
        (data) => {
          setRequests(data);
          setLoading(false);
        }
      );

    return () =>
      unsubscribe();
  }, []);

  const approve =
    async (request) => {
      const confirmed =
        window.confirm(
          `هل تريد قبول "${request.name}" ونشره في نيده؟`
        );

      if (!confirmed) {
        return;
      }

      try {
        setProcessingId(
          request.id
        );

        await approveRequest(
          request.id
        );

      } catch (error) {
        console.error(error);

        alert(
          "حدث خطأ أثناء قبول الطلب"
        );

      } finally {
        setProcessingId(null);
      }
    };

  const reject =
    async (request) => {
      const confirmed =
        window.confirm(
          `هل تريد رفض طلب "${request.name}"؟`
        );

      if (!confirmed) {
        return;
      }

      try {
        setProcessingId(
          request.id
        );

        await rejectRequest(
          request.id
        );

      } catch (error) {
        console.error(error);

        alert(
          "حدث خطأ أثناء رفض الطلب"
        );

      } finally {
        setProcessingId(null);
      }
    };

  return (
    <div className="requests-page">

      <header className="requests-header">

        <button
          onClick={() =>
            navigate("/admin")
          }
        >
          <ArrowRight size={23} />
        </button>

        <div>
          <h1>
            طلبات التسجيل
          </h1>

          <p>
            راجع البيانات قبل نشرها
          </p>
        </div>

        <span>
          {requests.length}
        </span>

      </header>

      <main className="requests-content">

        {loading ? (
          <div className="requests-loading">
            جاري تحميل الطلبات...
          </div>
        ) : requests.length === 0 ? (
          <div className="empty-requests">

            <div>
              <Inbox size={31} />
            </div>

            <h2>
              مفيش طلبات جديدة
            </h2>

            <p>
              أي تسجيل جديد هيظهر هنا
              تلقائيًا.
            </p>

          </div>
        ) : (
          <div className="requests-list">

            {requests.map(
              (request) => (
                <article
                  key={request.id}
                  className="request-card"
                >

                  <div className="request-card-top">

                    {request.imageBase64 ? (
                      <img
                        src={
                          request.imageBase64
                        }
                        alt={
                          request.name
                        }
                      />
                    ) : (
                      <div className="request-placeholder">
                        {request.name
                          ?.charAt(0)}
                      </div>
                    )}

                    <div className="request-main-info">

                      <span>
                        {request.specialty}
                      </span>

                      <h2>
                        {request.name}
                      </h2>

                      <small>
                        {
                          request.categoryId
                        }
                      </small>

                    </div>

                    <span className="pending-chip">
                      انتظار
                    </span>

                  </div>

                  <div className="request-details">

                    <p>
                      <Phone size={16} />

                      <span>
                        {request.phone}
                      </span>
                    </p>

                    {request.whatsapp && (
                      <p>
                        <MessageCircle
                          size={16}
                        />

                        <span>
                          {
                            request.whatsapp
                          }
                        </span>
                      </p>
                    )}

                    {request.address && (
                      <p>
                        <MapPin size={16} />

                        <span>
                          {
                            request.address
                          }
                        </span>
                      </p>
                    )}

                    {request.workingHours && (
                      <p>
                        <Clock3 size={16} />

                        <span>
                          {
                            request.workingHours
                          }
                        </span>
                      </p>
                    )}

                  </div>

                  {request.description && (
                    <div className="request-description">
                      {
                        request.description
                      }
                    </div>
                  )}

                  <div className="request-actions">

                    <button
                      className="reject-request"
                      disabled={
                        processingId ===
                        request.id
                      }
                      onClick={() =>
                        reject(request)
                      }
                    >
                      <X size={18} />
                      رفض
                    </button>

                    <button
                      className="approve-request"
                      disabled={
                        processingId ===
                        request.id
                      }
                      onClick={() =>
                        approve(request)
                      }
                    >
                      <Check size={19} />

                      {processingId ===
                      request.id
                        ? "جاري..."
                        : "قبول ونشر"}
                    </button>

                  </div>

                </article>
              )
            )}

          </div>
        )}

      </main>

    </div>
  );
}
