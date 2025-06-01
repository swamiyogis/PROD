import { SessionProvider } from './providers/SessionProvider';
import { UserProvider } from './providers/UserProvider';
import { AuthProvider } from './providers/AuthProvider';
import {FirestoreListener} from './utils/FirestoreListener'
import {AppWrapper} from './utils/AppWraper';
import AppRoutes from './Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
     <AuthProvider>  
        <UserProvider> 
          <SessionProvider>
            <AppWrapper>
              <AppRoutes />
              <FirestoreListener/>
            </AppWrapper>
          </SessionProvider>
        </UserProvider>
      </AuthProvider>
  </QueryClientProvider>
  );
}

export default App;
