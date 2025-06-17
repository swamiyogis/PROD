import { useEffect } from "react";
// import cashfree from "../../utils/Cashfree";
import { load } from "@cashfreepayments/cashfree-js";
import axios from "axios";
import { usePayment } from "../providers/PaymentProvider";

const PGRedirect = () => {
  const {paymentData} = usePayment();

  useEffect(() => {
    const initiatePayment = async () => {
      if (!paymentData.token || !paymentData.sessionId) {
        console.error("Missing token, sessionId, or pg");
        return;
      }

      const body = {
        token : paymentData.token,
        sessions_id: paymentData.sessionId,
        PG: "CASHFREE",
      };
      

      try {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_CASHFREE_ORDER_URL,
          body,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          const data = response.data;
            const cashfree = await load({
              mode: "production" 
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
          
        } else {
          console.error("Unexpected backend response:", response);
        }
      } catch (err) {
        console.error("Payment initiation error:", err);
      }
    };

    initiatePayment();
  }, [paymentData.token, paymentData.sessionId, paymentData.selectedGateway]);

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
           Opening Cashfree...
        </span>
      </div>
    </div>
  );
};

export default PGRedirect;
