import React, { useContext } from "react";
import "./DetailsPopup.css";
import AppContext, { AppContextType } from "../../context/AppContextProvider";

export interface DetailsPopupProps {
  onClose: Function;
  baseUrl: string;
  infoId?: string;
  fileName?: string;
}

export const DetailsPopup = (props: DetailsPopupProps) => {
    const { 
      name,
      gender,
      isMobile
  } = useContext(AppContext) as AppContextType;

  const baseUrl = props.baseUrl ? props.baseUrl : "";
  const fileName = props.infoId ? `${props.infoId}.html` : props.fileName;

  function hasInfo():boolean {
    if (props.infoId !== undefined && props.infoId.length > 0) { 
      return true;
    }
    return false;
  }

  return(
    <div>
      { hasInfo() &&
        <div className="app-show-flex-column"> 
          <span className="details-popup-close app-clickable" onClick={() => props.onClose()}>סגור חלון</span>
          <iframe title="mouseJumpingShapeClick" 
            src={`resources/${baseUrl}/${fileName}`} 
            height={isMobile ? "500px" : "500px"} 
            width={isMobile ? "250px" : "500px"}
          />
        </div>
      }
    </div>
  )
}