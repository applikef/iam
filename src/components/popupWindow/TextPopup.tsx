import React, { useContext } from "react";
import "./PopupWindow.css";
import AppContext, { AppContextType } from "../../context/AppContextProvider";
import { useTranslation } from "react-i18next";
import { MediaUtil } from "../../utils/MediaUtils";
import { APP_ICONS } from "../../utils/constantsUtil";

export interface TextPopupProps {
  onClose: Function;
  infoId?: string;
}

export const TextPopup = (props: TextPopupProps) => {
    const { t } = useTranslation();
  
    const { 
      gender,
  } = useContext(AppContext) as AppContextType;

  function hasInfo():boolean {
    if (props.infoId !== undefined && props.infoId.length > 0) { 
      return true;
    }
    return false;
  }

  return(
    <div>
      { hasInfo() &&
        <div className="text-popup"> 
          <div className="text-popup-close app-clickable" onClick={() => props.onClose()}>
            סגור חלון
          </div>
          <hr/>
          <div>
            { t(`popup-${props.infoId}`, { context: gender }) }
          </div>
          <div>
            <img src={ MediaUtil.getAppIcon(APP_ICONS.HAPPY_FRIEND) } 
              alt="Happy app friend" 
              height="96px" />
          </div>
        </div>
      }
    </div>
  )
}