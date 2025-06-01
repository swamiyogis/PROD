import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Cashfree = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sessionId = location.state?.sessionId;
  const token = location.state?.token;

  useEffect(() => {
    const initiateCashfreePayment = async () => {
      try {
        if (!token || !sessionId) {
          console.error("Missing token or sessionId");
          return;
        }

        const response = await axios.post(
          import.meta.env.VITE_CASHFREE_ORDER_URL,
          {
            token,
            sessions_id: sessionId,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200 && response.data.paymentSessionId) {
          const { paymentSessionId } = response.data;
          launchCashfreeCheckout(paymentSessionId);
        } else {
          console.error("Cashfree order creation failed:", response.data);
        }
      } catch (error) {
        console.error("Error initiating Cashfree payment:", error);
      }
    };

    initiateCashfreePayment();
  }, [token, sessionId]);

  const launchCashfreeCheckout = (paymentSessionId) => {
    if (!window.Cashfree) {
      console.error("Cashfree SDK not loaded");
      return;
    }

    const cashfree = new window.Cashfree({
      paymentSessionId,
      redirectTarget: "_self", // or "_blank" if you want a new tab
    });

    cashfree.redirect();
  };

  return (
    <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}>
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Redirecting to Cashfree...</span>
      </div>
    </div>
  );
};

export default Cashfree;
