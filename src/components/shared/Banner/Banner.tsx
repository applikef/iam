import { Link } from "react-router-dom";

import './Banner.css'
import { APP_ICONS, HOME_PAGE_PATH } from "./../../../utils/constantsUtil";
import { MediaUtil } from "../../../utils/MediaUtils";

export const Banner = () => {
  return (
    <>
        <div>
          <div className="banner-icon-bar">
            <Link to={"/feelings"}>
              <img src={ MediaUtil.getAppIcon(APP_ICONS.MOODS) }
                className="banner-icon" 
                title="אֵיךְ אֲנִי מַרְגִּישָׁה?"  alt="אֵיךְ אֲנִי מַרְגִּישָׁה?" />
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