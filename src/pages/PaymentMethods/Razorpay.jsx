import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Razorpay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sessionId = location.state?.sessionId;
  const token = location.state?.token;

  useEffect(() => {
    const createOrder = async () => {
      try {
        if (!token || !sessionId) {
          console.error("Missing token or sessionId");
          return;
        }

        console.log("Creating Razorpay order with:", { token, sessionId });

        const response = await axios.post(
          import.meta.env.VITE_CREATE_ORDER,
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

        if (response.status === 200) {
          const { order_id } = response.data;
          startPayment(order_id);
        } else {
          console.error("Order creation failed", response.data);
        }
      } catch (error) {
        console.error("Error creating Razorpay order:", error);
      }
    };

    createOrder();
  }, [sessionId, token, navigate]);

  const startPayment = (orderId) => {
    const options = {
      key: import.meta.env.VITE_RAZ_KEY,
      order_id: orderId,
      handler: function (response) {
        navigate("/");
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      console.warn("Payment failed", response);
      navigate("/");
    });

    rzp.open();
  };

  return (
    <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Processing Payment...</span>
      </div>
    </div>
  );
};

export default Razorpay;
