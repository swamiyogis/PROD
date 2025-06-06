import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PaymentsOptionPages.css';
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from '../../providers/AuthProvider';
import { storedb } from '../../utils/firebaseconfig';

import { SiRazorpay, SiPhonepe } from "react-icons/si";

const PaymentsOptionPages = () => {
  const [selectedGateway, setSelectedGateway] = useState(null);
  const [paymentGateways, setPaymentGateways] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const sessionId = location.state?.sessionId;

  useEffect(() => {
    const fetchGateways = async () => {
      try {
        const docRef = doc(storedb, 'PG', 'Test-Payments');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const gateways = Object.values(data);
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
    if (!selectedGateway || !selectedGateway['PG-api']) {
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
        pg: selectedGateway['PG-api'],
        gatewayMeta: selectedGateway
      };

      navigate('/payment/cashfree', { state: payload });
    } catch (error) {
      console.error('Error getting token:', error);
      alert('Failed to get user token. Please try again.');
    }
  };

  // Render gateway-specific icons
  const renderIcon = (pgName) => {
    switch (pgName.toLowerCase()) {
      case 'phonepe':
        return <img src="https://cdnlogo.com/logos/p/79/phonepe.svg" width="100" />;
      case 'cashfree':
        return <img src="https://cashfreelogo.cashfree.com/cashfreepayments/logopng4x/Cashfree_Payments_Logo.png" width="100" />;
      default:
        return null;
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
                  onChange={() => setSelectedGateway(gateway)}
                  className="payment-radio"
                />
                {renderIcon(gateway['PG-name'])}
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
