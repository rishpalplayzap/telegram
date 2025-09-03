import { useState } from "react";
import TelegramLogin from "./TelegramLogin";

function App() {
  const [me, setMe] = useState(null);
  // const apiUrl = import.meta.env.VITE_API_URL;
  const botName = 'rishpalBot'; // no @

  const handleAuth = async (tgUser) => {
    try {

      console.log("Telegram auth data:", tgUser);
      // // Send payload to backend for verification
      // const res = await fetch(`${apiUrl}/api/telegram/auth`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(tgUser),
      // });
      // const data = await res.json();
      // if (!res.ok) throw new Error(data?.message || "Login failed");
      setMe(data.user); // whatever your backend returns
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div style={{ maxWidth: 520, margin: "60px auto", fontFamily: "sans-serif" }}>
      <h2>Telegram Login tested (React + Vite)</h2>
      {!me ? (
        <>
          <p>Click the Telegram button:</p>
          <TelegramLogin botName={botName} onAuth={handleAuth} />
        </>
      ) : (
        <>
          <h3>Welcome, {me.first_name} {me.last_name || ""}</h3>
          <p>@{me.username} (id: {me.id})</p>
          {me.photo_url && <img src={me.photo_url} alt="avatar" width={80} height={80} />}
        </>
      )}
    </div>
  );
}

export default App;
