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
          `Ù‡Ù„ ØªØ±ÙŠØ¯ Ù‚Ø¨ÙˆÙ„ "${request.name}" ÙˆÙ†Ø´Ø±Ù‡ ÙÙŠ Ù†ÙŠØ¯Ù‡ØŸ`
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
          "Ø­Ø¯Ø« Ø®Ø·Ø£ Ø£Ø«Ù†Ø§Ø¡ Ù‚Ø¨ÙˆÙ„ Ø§Ù„Ø·Ù„Ø¨"
        );

      } finally {
        setProcessingId(null);
      }
    };

  const reject =
    async (request) => {
      const confirmed =
        window.confirm(
          `Ù‡Ù„ ØªØ±ÙŠØ¯ Ø±ÙØ¶ Ø·Ù„Ø¨ "${request.name}"ØŸ`
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
          "Ø­Ø¯Ø« Ø®Ø·Ø£ Ø£Ø«Ù†Ø§Ø¡ Ø±ÙØ¶ Ø§Ù„Ø·Ù„Ø¨"
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
            Ø·Ù„Ø¨Ø§Øª Ø§Ù„ØªØ³Ø¬ÙŠÙ„
          </h1>

          <p>
            Ø±Ø§Ø¬Ø¹ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ù‚Ø¨Ù„ Ù†Ø´Ø±Ù‡Ø§
          </p>
        </div>

        <span>
          {requests.length}
        </span>

      </header>

      <main className="requests-content">

        {loading ? (
          <div className="requests-loading">
            Ø¬Ø§Ø±ÙŠ ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ø·Ù„Ø¨Ø§Øª...
          </div>
        ) : requests.length === 0 ? (
          <div className="empty-requests">

            <div>
              <Inbox size={31} />
            </div>

            <h2>
              Ù…ÙÙŠØ´ Ø·Ù„Ø¨Ø§Øª Ø¬Ø¯ÙŠØ¯Ø©
            </h2>

            <p>
              Ø£ÙŠ ØªØ³Ø¬ÙŠÙ„ Ø¬Ø¯ÙŠØ¯ Ù‡ÙŠØ¸Ù‡Ø± Ù‡Ù†Ø§
              ØªÙ„Ù‚Ø§Ø¦ÙŠÙ‹Ø§.
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
                      Ø§Ù†ØªØ¸Ø§Ø±
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
                      Ø±ÙØ¶
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
                        ? "Ø¬Ø§Ø±ÙŠ..."
                        : "Ù‚Ø¨ÙˆÙ„ ÙˆÙ†Ø´Ø±"}
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
