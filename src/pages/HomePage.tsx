import { useContext } from "react";
import AppContext, { AppContextType } from "../context/AppContextProvider";
import "./../assets/styles/global.css";
import { Link } from "react-router-dom";
import { MediaUtil } from "../utils/MediaUtils";
import { APP_ICONS } from "../utils/constantsUtil";

export const HomePage = () => {
  // const navigate = useNavigate();
  const { 
    name,
    setName,
    gender
  } = useContext(AppContext) as AppContextType;

  const friendImageUrl = MediaUtil.getAppIcon(APP_ICONS.CALM_FRIEND);

  return (
    <>
      <div className="app-page">  
        <div className="normal-color app-header-xl">
          <div className="margin-xl">שָׁלוֹם {name === "" ? "חֲבֵרָה" : name }</div>
          <img src={friendImageUrl} alt="App friend" height="256px" />
          <div>אֵיךְ אַתְּ מַרְגִּישָׁה?</div>
          <Link to="/feelings" className="app-header-m">
              <div>
                <span><img src={ MediaUtil.getAppIcon(APP_ICONS.ARROW_RTL) } alt="" height="32px" /> </span>
                הַקְלִיקִי כָּאן כְּדֵי לְסַפֵּר לִי
              </div>
          </Link> 
        </div>
      </div>
    </>
  )
} 