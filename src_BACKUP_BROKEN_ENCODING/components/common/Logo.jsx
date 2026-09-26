import logo from "../../assets/logo-ned.png";

export default function Logo({
  size = 50,
  className = "",
  showText = false,
}) {
  return (
    <div
      className={`app-logo ${className}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "9px",
      }}
    >
      <img
        src={logo}
        alt="Ù†ÙŠØ¯Ù‡"
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          display: "block",
        }}
      />

      {showText && (
        <div>
          <strong
            style={{
              display: "block",
              color: "#315f49",
              fontSize: "16px",
              fontWeight: 900,
              lineHeight: 1.2,
            }}
          >
            Ù†ÙŠØ¯Ù‡
          </strong>

          <small
            style={{
              color: "#89968e",
              fontSize: "8px",
            }}
          >
            ÙƒÙ„ Ø®Ø¯Ù…Ø§Øª Ø¨Ù„Ø¯Ùƒ ÙÙŠ Ù…ÙƒØ§Ù† ÙˆØ§Ø­Ø¯
          </small>
        </div>
      )}
    </div>
  );
}
