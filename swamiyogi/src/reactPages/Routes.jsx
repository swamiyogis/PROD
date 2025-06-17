import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './providers/AuthProvider';
import { PrivateRoute, PublicRoute } from './utils/routerGaurds';
import MainLayout from './components/Mainlayout';
import { FirebaseProvider } from './providers/firebaseProvider';

const Home = lazy(() => import('./Homepage'));
const Workshops = lazy(() => import('./Workshops'));
const Terms = lazy(() => import('./rules/Terms'));
const Contact = lazy(() => import('./rules/Contact'));
const FAQs = lazy(() => import('./rules/FAQs'));
const RefundPolicy = lazy(() => import('./rules/RefundPolicy'));
const Mission = lazy(() => import('./rules/Mission'));
const Policy = lazy(() => import('./rules/Policy'));
const Paymentpage = lazy(() => import('./PaymentMethods/PaymentsOptionPages'));
const AuthPage = lazy(() => import('./Authpage'));
const UserSesisonPage = lazy(() => import('./UserSessionPage'))
const YogaDay = lazy(() => import('./YogaDayPage'));
const PGRedirect = lazy(() => import('./PaymentMethods/PGMethods'));


function AppRoutes() {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/auth" element={
            <PublicRoute>
              <FirebaseProvider>
                <AuthPage />
              </FirebaseProvider>
            </PublicRoute>
          } />

          <Route path="/" element={<MainLayout />}>

            <Route index element={<Home />} />
            <Route path="workshops" element={<Workshops />} />
            <Route path="terms" element={<Terms />} />
            <Route path="contact" element={<Contact />} />
            <Route path="FAQs" element={<FAQs />} />
            <Route path="refund" element={<RefundPolicy />} />
            <Route path="mission" element={<Mission/>} />
            <Route path="policy" element={<Policy />} />
            <Route path="YogaDay" element={<YogaDay />} />
            <Route path="mysessions" element={
              <FirebaseProvider>
                <PrivateRoute>
                  <UserSesisonPage />
                </PrivateRoute>
              </FirebaseProvider>
            } />
          </Route>

          <Route path="/payment" element={
            <FirebaseProvider>
              <PrivateRoute>
                <Paymentpage />
              </PrivateRoute>
            </FirebaseProvider>
          } />
          <Route path="/payment/cashfree" element={
            <FirebaseProvider>
              <PrivateRoute>
                <PGRedirect />
              </PrivateRoute>
            </FirebaseProvider>
          } />


          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default AppRoutes;
