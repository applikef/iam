import { useContext, useLayoutEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive'
import AppContext, { AppContextType } from "../context/AppContextProvider";

import "./../assets/styles/global.css";
import { Link } from "react-router-dom";
import { MediaUtil } from "../utils/MediaUtils";
import { APP_ICONS, GENDER, MOBILE_SCREEN_WIDTH } from "../utils/constantsUtil";

export const HomePage = () => {
  const { t } = useTranslation();
  const { 
    name,
    setName,
    gender,
    setGender,
    setIsMobile
  } = useContext(AppContext) as AppContextType;

  const isMobile = useMediaQuery({ query: `(max-width: ${ MOBILE_SCREEN_WIDTH }px)` });
  const friendImageUrl = MediaUtil.getAppIcon(APP_ICONS.CALM_FRIEND);

  useLayoutEffect(() => {
    setIsMobile(isMobile);
  }, [isMobile, setIsMobile]);

  function changeGenderHandler(value: any) {
    setGender(value);
  }

  return (
    <>
      <div className="app-page">  
        <div className="normal-color app-header-xl">
          <div className="margin-xl">מְדַבְּרִים רְגָשׁוֹת</div>
          <img src={friendImageUrl} alt="App friend" height="128px" />
          <div>מִי אִתִּי?</div>
          <div className="user-color">
            <span className="margin-left-l">אני</span>
            <select className="user-color app-header-xl padding-bottom-xs padding-right-xs" 
              onChange={ (event) => changeGenderHandler(event.target.value) }
              value={gender === GENDER.M ? GENDER.M : GENDER.F}>
              <option value={ GENDER.F }>יַלְדָּה</option>
              <option value={ GENDER.M }>יֶלֶד</option>
            </select>
          </div>

          <div>
            <Link to="/feelings" className="app-header-m">
                <div>
                  <span><img src={ MediaUtil.getAppIcon(APP_ICONS.ARROW_RTL) } alt="" height="32px" /> </span>
                  { t("click-to-tell", {context: gender}) }
                </div>
            </Link>
          </div>
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