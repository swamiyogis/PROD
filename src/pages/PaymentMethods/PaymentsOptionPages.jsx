import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PaymentsOptionPages.css';
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from '../../providers/AuthProvider';
import { collection, getDocs } from 'firebase/firestore';
import { storedb } from '../../utils/firebaseconfig'; // adjust path as needed

const PaymentsOptionPages = () => {
  const [selectedGateway, setSelectedGateway] = useState('');
  const [paymentGateways, setPaymentGateways] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const sessionId = location.state?.sessionId;

  // ✅ Fetch payment gateways from Firestore
  useEffect(() => {
    const fetchGateways = async () => {
      try {
        const docRef = doc(storedb, 'PG', 'Test-Payments');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data(); // this is an object with keys like 0, 1, etc.
          const gateways = Object.values(data); // convert to array
          setPaymentGateways(gateways);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching gateways:', error);
      }
    };

    fetchGateways();
  }, []);


  const handlePayment = async () => {
    if (!selectedGateway) {
      alert('Please select a payment method');
      return;
    }

    if (!user) {
      alert('User not authenticated.');
      return;
    }

    try {
      const token = await user.getIdToken();

      const payload = {
        sessionId,
        token,
        paymentGateway: selectedGateway,
      };

      switch (selectedGateway.toLowerCase()) {
        case 'razopay':
          navigate('/payment/razorpay', { state: payload });
          break;
        case 'cashfree':
          navigate('/payment/cashfree', { state: payload });
          break;
        case 'paytm':
          navigate('/payment/paytm', { state: payload });
          break;
        default:
          alert(`Selected ${selectedGateway}, Out of Service`);
      }
    } catch (error) {
      console.error('Error getting token:', error);
      alert('Failed to get user token. Please try again.');
    }
  };

  return (
    <div className="payment-page-wrapper">
      <div className="payment-option-container">
        <h2 className="payment-title">Select a Payment Method</h2>
        <ul className="payment-list">
          {paymentGateways.map((gateway) => (
            <li key={gateway['PG-api']} className="payment-item">
              <label className="payment-label">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={gateway['PG-api']}
                  onChange={(e) => setSelectedGateway(e.target.value)}
                  className="payment-radio"
                />
                {gateway['PG-name']}
              </label>
            </li>
          ))}
        </ul>
        <button className="payment-button" onClick={handlePayment}>
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default PaymentsOptionPages;
