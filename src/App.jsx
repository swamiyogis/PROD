import { SessionProvider } from './providers/SessionProvider';
import { UserProvider } from './providers/UserProvider';
import { AuthProvider } from './providers/AuthProvider';
import {FirestoreListener} from './utils/FirestoreListener'
import {AppWrapper} from './utils/AppWraper';
import AppRoutes from './Routes';

function App() {
  return (
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
  );
}

export default App;
