import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PGRedirect = () => {
  const location = useLocation();
  const sessionId = location.state?.sessionId;
  const token = location.state?.token;
  const selectedGateway = location.state?.pg?.toUpperCase(); // "CASHFREE" or "PHONEPE"

  useEffect(() => {
    const initiatePayment = async () => {
      if (!token || !sessionId || !selectedGateway) {
        console.error("Missing token, sessionId, or pg");
        return;
      }

      const body = {
        token,
        sessions_id: sessionId,
        PG: selectedGateway,
      };

      console.log("Initiating payment with:", body);

      try {
        const response = await axios.post(
          import.meta.env.VITE_CASHFREE_ORDER_URL,
          body,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200 && response.data.redirect_url) {
          window.location.href = response.data.redirect_url;
        } else {
          console.error("Unexpected response:", response.data);
        }
      } catch (err) {
        console.error("Payment initiation error:", err);
      }
    };

    initiatePayment();
  }, [token, sessionId, selectedGateway]);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">
          Redirecting to {selectedGateway}...
        </span>
      </div>
    </div>
  );
};

export default PGRedirect;
