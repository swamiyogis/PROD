import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// import cashfree from "../../utils/Cashfree";
import { load } from "@cashfreepayments/cashfree-js";
import axios from "axios";

const PGRedirect = () => {
  const location = useLocation();
  const sessionId = location.state?.sessionId;
  const token = location.state?.token;
  const selectedGateway = location.state?.pg?.toUpperCase();

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

        if (response.status === 200) {
          const data = response.data;
          if (selectedGateway === "PHONEPE") {
            if (data.redirect_url) {
              window.location.href = data.redirect_url;
            } else {
              console.error("Missing redirect URL for PhonePe");
            }
          } else if (selectedGateway === "CASHFREE") {

            
            const cashfree = await load({
              mode: "production" //or production
            });

            const cfSessionId = data.payment_session_id;

            if (cfSessionId) {
              cashfree.checkout({
                paymentSessionId: data.payment_session_id,
                redirectTarget: "_self",
              });
            } else {
              console.error("payment_session_id is missing in response");
            }
          }
        } else {
          console.error("Unexpected backend response:", response);
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
          {selectedGateway === "PHONEPE"
            ? "Redirecting to PhonePe..."
            : "Opening Cashfree..."}
        </span>
      </div>
    </div>
  );
};

export default PGRedirect;
