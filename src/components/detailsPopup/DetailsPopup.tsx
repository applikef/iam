import React, { useContext } from "react";
import "./DetailsPopup.css";

export interface DetailsPopupProps {
  onClose: Function;
  baseUrl: string;
  infoId?: string;
  fileName?: string;
}

export const DetailsPopup = (props: DetailsPopupProps) => {
  const baseUrl = props.baseUrl ? props.baseUrl : "";
  const fileName = props.infoId ? `${props.infoId}.html` : props.fileName;
  const smallDevice = true;

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
            height={smallDevice ? "250px" : "500px"} 
            width={smallDevice ? "500px" : "1000px"}
          />
        </div>
      }
    </div>
  )
}