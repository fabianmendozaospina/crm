import { createContext } from "preact";
import { useState } from "preact/hooks";

const AuthContext = createContext([{}, () => {}]);
const AuthProvider = props: any => {
    // Initial state.
    const [auth, saveToken] = useState({
        token: '',
        auth: false
    });

    return (
        <AuthContext.Provider value={[auth, saveToken]}>
            {props.children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProvider};
