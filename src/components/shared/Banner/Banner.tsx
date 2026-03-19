import { Link } from "react-router-dom";

import './Banner.css'
import { APP_ICONS, HOME_PAGE_PATH } from "./../../../utils/constantsUtil";
import { MediaUtil } from "../../../utils/MediaUtils";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import AppContext, { AppContextType } from "../../../context/AppContextProvider";

export const Banner = () => {
  const { t } = useTranslation();
  const { 
    gender,
  } = useContext(AppContext) as AppContextType;

  const feelTitle: string = t("how-do-i-feel", {context: gender});

  return (
    <>
        <div>
          <div className="banner-icon-bar">
            <Link to={"/feelings"}>
              <img src={ MediaUtil.getAppIcon(APP_ICONS.FEELINGS) }
                className="banner-icon" 
                title={ feelTitle }  
                alt={ feelTitle } />
            </Link>
            <Link to={HOME_PAGE_PATH}>
              <img src={ MediaUtil.getAppIcon(APP_ICONS.HOME) }
                className="banner-icon" 
                title="לַחֲזֹר לַהַתְחָלָה"  alt="לַחֲזֹר לַהַתְחָלָה" />
            </Link>
          </div>
          <hr className="banner-hr"/>
        </div>
    </>
  );
}