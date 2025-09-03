import { useEffect } from "react";

export default function TelegramLogin({
  botName,
  onAuth,
  size = "large",
  requestAccess = "write",
  cornerRadius = 12,
  usePic = false,
}) {
  useEffect(() => {
    // expose a global callback for Telegram widget
    window.onTelegramAuth = (user) => {
      if (onAuth) onAuth(user);
    };

    const container = document.getElementById("tg-login-container");
    if (!container) return;

    // clear old scripts to avoid duplicates in React StrictMode
    container.innerHTML = "";

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", botName); // no @
    script.setAttribute("data-size", size);
    script.setAttribute("data-userpic", usePic ? "true" : "false");
    script.setAttribute("data-request-access", requestAccess);
    script.setAttribute("data-radius", String(cornerRadius));
    // The widget calls this global when user completes login:
    script.setAttribute("data-onauth", "onTelegramAuth(user)");

    container.appendChild(script);

    return () => {
      delete window.onTelegramAuth;
      if (container.contains(script)) container.removeChild(script);
    };
  }, [botName, onAuth, size, requestAccess, cornerRadius, usePic]);

  return <div id="tg-login-container" />;
}
