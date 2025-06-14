// pages/_app.js
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../reactPages/providers/AuthProvider';
import { UserProvider } from '../reactPages/providers/UserProvider';
import { SessionProvider } from '../reactPages/providers/SessionProvider';
import { FirestoreListener } from '../reactPages/utils/FirestoreListener';
import { AppWrapper } from '../reactPages/utils/AppWraper';
import { PaymentProvider } from '@/reactPages/providers/PaymentProvider';
import MainLayout  from '@/reactPages/components/Mainlayout'
import '../styles/globals.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const noLayout = Component.noLayout || false;

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {noLayout ? (
          <PaymentProvider>
            <Component {...pageProps} />
          </PaymentProvider>
        ) : (
          <UserProvider>
            <SessionProvider>
              <AppWrapper>
                  <MainLayout>
                    <Component {...pageProps} />
                  </MainLayout>
              </AppWrapper>
            </SessionProvider>
          </UserProvider>
        )}
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
