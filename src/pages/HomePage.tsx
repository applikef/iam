import { useContext, useLayoutEffect } from "react";
import { useMediaQuery } from 'react-responsive'
import AppContext, { AppContextType } from "../context/AppContextProvider";
import "./../assets/styles/global.css";
import { Link } from "react-router-dom";
import { MediaUtil } from "../utils/MediaUtils";
import { APP_ICONS, MOBILE_SCREEN_WIDTH } from "../utils/constantsUtil";

export const HomePage = () => {
  // const navigate = useNavigate();
  const { 
    name,
    setName,
    gender,
    setIsMobile
  } = useContext(AppContext) as AppContextType;

  const isMobile = useMediaQuery({ query: `(max-width: ${ MOBILE_SCREEN_WIDTH }px)` });
  const friendImageUrl = MediaUtil.getAppIcon(APP_ICONS.CALM_FRIEND);

  useLayoutEffect(() => {
    setIsMobile(isMobile);
  }, [isMobile, setIsMobile]);


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
          <div className="margin-top-xl">
            <iframe title="intro" style={{"border": "none"}}
              src={`/iam/resources/intro.html`} 
              height={ isMobile ? "240px" : "100px"} 
              width={ isMobile ? "250px" : "550px"}
            />
          </div> 
        </div>
      </div>
    </>
  )
} 