import react,{createContext,useState,useEffect,useContext} from 'react';

const AuthContext= createContext();

export const useAuth=()=>{
    return useContext(AuthContext)
}


export const Authprovider=({children})=>{
    const [isLoggedIn,setIsLoggedIn]= useState(false);
    const[alert,setShowalert]=useState(false);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        const alertflag= localStorage.getItem('showAlert');

        if (token) {
          setIsLoggedIn(true);
          localStorage.removeItem('showAlert')

        }

      
      }, []);

     
    
      const login = (token) => {
        localStorage.setItem('userToken', token);
        localStorage.setItem('showAlert','true');
        setIsLoggedIn(true);
        setShowalert(true);

      };

      
    
      const logout = () => {
        localStorage.removeItem('userToken');
        setIsLoggedIn(false);
      };

   
      

      return(
        <AuthContext.Provider value={{ isLoggedIn, login, logout,setIsLoggedIn,alert,setShowalert,alert,setShowalert}}>
            {children}
        </AuthContext.Provider>
      )

}

