import react,{createContext,useState,useEffect,useContext} from 'react';

const AuthContext= createContext();

export const useAuth=()=>{
    return useContext(AuthContext)
}


export const Authprovider=({children})=>{
    const [isLoggedIn,setIsLoggedIn]= useState(false);
    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
          setIsLoggedIn(true);
        }
      }, []);
    
      const login = (token) => {
        localStorage.setItem('userToken', token);
        setIsLoggedIn(true);
      };
    
      const logout = () => {
        localStorage.removeItem('userToken');
        setIsLoggedIn(false);
      };

      return(
        <AuthContext.Provider value={{ isLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
      )

}

