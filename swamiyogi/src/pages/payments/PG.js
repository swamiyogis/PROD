import dynamic from 'next/dynamic';
import { FirebaseProvider } from '../../reactPages/providers/firebaseProvider';
import {PrivateRoute} from '../../reactPages/utils/privaterouter'

const Payments = dynamic(() => import('@/reactPages/PaymentMethods/PGMethods'), { ssr: false });

const PG = () =>{
  return <Payments/>;
}

PG.noLayout = true;

export default PG