import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './PaymentsOptionPages.module.css'; // Import styles object
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from '../providers/AuthProvider';
import { storedb } from '../utils/firebaseconfig';
import { usePayment } from '../providers/PaymentProvider';
import Image from 'next/image';

const PaymentsOptionPages = () => {
  const [selectedGateway, setSelectedGateway] = useState(null);
  const [paymentGateways, setPaymentGateways] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { setPaymentData } = usePayment();
  const { user, loading } = useAuth();
  const router = useRouter();
  const { sessionId } = router.query;

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

    if (!loading && user) {
      fetchGateways();
    }
  }, [loading, user]);

  const handlePayment = async () => {
    if (!selectedGateway || !selectedGateway['PG-api']) {
      alert('Please select a payment method');
      return;
    }

    if (!user) {
      alert('User not authenticated.');
      return;
    }

    if (!sessionId) {
      alert('No session selected.');
      return;
    }

    setIsLoading(true);

    try {
      const token = await user.getIdToken();

      const payload = {
        sessionId,
        token,
        pg: selectedGateway['PG-api'],
        gatewayMeta: selectedGateway
      };

      setPaymentData(payload);
      router.push('/payments/PG');
    } catch (error) {
      console.error('Error getting token:', error);
      alert('Failed to get user token. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderIcon = (pgName) => {
    switch (pgName.toLowerCase()) {
      case 'cashfree':
        return (
          <Image
            src="https://cashfreelogo.cashfree.com/cashfreepayments/logopng4x/Cashfree_Payments_Logo.png"
            width={100}
            height={40}
            alt="Cashfree logo"
            unoptimized
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles['payment-page-wrapper']}>
      <div className={styles['payment-option-container']} role="region" aria-label="Payment Methods">
        <h2 className={styles['payment-title']}>Select a Payment Method</h2>
        <ul className={styles['payment-list']}>
          {paymentGateways.map((gateway) => (
            <li key={gateway['PG-api']} className={styles['payment-item']}>
              <label className={styles['payment-label']} htmlFor={`pg-${gateway['PG-api']}`}>
                <input
                  id={`pg-${gateway['PG-api']}`}
                  type="radio"
                  name="paymentMethod"
                  value={gateway['PG-api']}
                  onChange={() => setSelectedGateway(gateway)}
                  className={styles['payment-radio']}
                  checked={selectedGateway?.['PG-api'] === gateway['PG-api']}
                />
                {renderIcon(gateway['PG-name'])}
              </label>
            </li>
          ))}
        </ul>
        <button
          className={styles['payment-button']}
          onClick={handlePayment}
          disabled={!selectedGateway || isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? 'Processing...' : 'Proceed to Pay'}
        </button>
      </div>
    </div>
  );
};

export default PaymentsOptionPages;
