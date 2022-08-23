import React,  {useState, useEffect, createContext} from 'react';
//implementar a navegação com o useNavigate
import { useNavigate } from "react-router-dom";
import { api, createSession } from '../services/api';

export const AuthContext = createContext();
 
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [ loading, setLoading ] = useState(true);

    //executar quando inicializar
    useEffect(() => {
        const recoveredUser = localStorage.getItem('user');
        const token = localStorage.getItem("token")

        if (recoveredUser) {
            setUser(JSON.parse(recoveredUser));
            api.defaults.headers.Authorization = `Bearer ${token}`;
        }

        setLoading(false);
    }, []);


    const login = async (email, password) => {        

        const response = await createSession(email, password);

        console.log("login", response.data);

        //api criar uma session
        const loggedUser = response.data.user;
        const token = response.data.token;

        // JSON.stringifly para passar para string
        localStorage.setItem("user", JSON.stringify(loggedUser));
        localStorage.setItem("token", JSON.stringify(token));

        api.defaults.headers.Authorization = `Bearer ${token}`;

        
        setUser(loggedUser);
        navigate('/');        
    };
    const logout = () => {
        console.log("logout");
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        api.defaults.headers.Authorization = null;
        setUser(null);
        navigate("/login");
    };
    //uso cast/boolean = !!user, user, login, logout
    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}