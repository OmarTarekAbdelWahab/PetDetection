import { createContext, useContext, useState } from 'react';
import { authService } from '../services/authService';
import { storageHandler } from '../services/storageHandler';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(storageHandler.getUserFromStorage());

    const logUserIn = async (credentials) => {
        console.log('Logging in with credentials:', credentials)
        let user;
        user = await authService.login(credentials);

        // if (typeof credentials === 'string') {
        //     user = await authService.googleLogAuth(credentials);
        // }else {
        //     user = await authService.login(credentials);
        // }
        setUser(user);
    };

    const registerUser = async (credentials) => {
        console.log('Registering with credentials:', credentials);
        const user = await authService.register(credentials);
        setUser(user);
        console.log("Done registering");
    };

    const logUserOut = async () => {
        console.log('Logging out');
        await authService.logout();
        setUser(null);
    };

    return <AuthContext.Provider value={{user, logUserIn, registerUser, logUserOut}}>
        {children}
    </AuthContext.Provider>
};

export const useAuth = () => useContext(AuthContext);