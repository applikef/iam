import { useContext } from "react";
import AppContext, { AppContextType } from "../context/AppContextProvider";
import "./../assets/styles/global.css";
import { Link } from "react-router-dom";
import { ImageCatalogUtil } from "../utils/catalogUtil";

export const HomePage = () => {
  // const navigate = useNavigate();
  const { 
    name,
    setName,
    gender
  } = useContext(AppContext) as AppContextType;

  const friendImageUrl = ImageCatalogUtil.getCatalogImage("app-friend");

  return (
    <>
      <div className="app-page">  
        <div className="normal-color app-header-xl">
          <div className="margin-xl">שלום {name === "" ? "חברה" : name }</div>
          <img src={friendImageUrl} alt="App friend" height="256px" />
          <div>מעכשיו אני איתך</div>
          <Link to="/moods" className="normal-color app-header-m">
              <div>הקליקי כאן כדי להמשיך</div>
          </Link> 
        </div>
      </div>
    </>
  )
} 