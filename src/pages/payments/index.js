import dynamic from 'next/dynamic';
import { FirebaseProvider } from '../../reactPages/providers/firebaseProvider';
import {PrivateRoute} from '../../reactPages/utils/privaterouter'

const PaymentPage = dynamic(() => import('../../reactPages/PaymentMethods/PaymentsOptionPages'), { ssr: false });

const payment = () => {
  return (
    <FirebaseProvider>
      <PrivateRoute>
        <PaymentPage />
      </PrivateRoute>
    </FirebaseProvider>
  );
}
payment.noLayout = true;


export default payment