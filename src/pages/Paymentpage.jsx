import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import axios from "axios";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sessionId = location.state?.sessionId;

  useEffect(() => {
    console.log(sessionId)
    const createOrder = async () => {
      try {
        const token = await getFirebaseUserToken();
        if (!token) return;
        console.log({
            token,
            sessions_id: sessionId,
          },)

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
          console.log(response)
        } else {
          console.error("Order creation failed", response.data);
        }
      } catch (error) {
        console.error("Error creating Razorpay order:", error);
      }
    };

    createOrder();
  }, [sessionId]);

  const getFirebaseUserToken = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
    
      return await user.getIdToken();
    }
    return null;
  };

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

export default PaymentPage;
