import { useContext } from "react";
import AppContext, { AppContextType } from "../context/AppContextProvider";
import "./../assets/styles/global.css";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const { 
    name,
    setName,
    gender
  } = useContext(AppContext) as AppContextType;
  // const navigate = useNavigate();

  return (
    <>
      <div className="app-page">  
        <div className="app-header-xl">
          <div>שלום {name}</div>
          <Link to="/moods" className="app-header-m">
              <div>הקליקי כאן כדי להמשיך</div>
          </Link> 
        </div>
      </div>
    </>
  )
} 