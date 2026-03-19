import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Card } from "../components/shared/Card/Card";
import { FeelingsCatalogUtil } from "../utils/catalogUtil";
import { APP_ICONS, DEFAULT_IMAGE_HEIGHT, GENDER, MOBILE_HEIGHT_RATIO } from "../utils/constantsUtil";
import "./../assets/styles/global.css";
import { useContext, useState } from "react";
import { Banner } from "../components/shared/Banner/Banner";
import AppContext, { AppContextType } from "../context/AppContextProvider";
import { FeelingDescriptor } from "../model/globalTypes";
import { MediaUtil } from "../utils/MediaUtils";
import { FeelingsUtil } from "../utils/FeelingsUtil";

export const Feelings = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { 
    isMobile,
    gender,
    setSelectedFeelingsList
  } = useContext(AppContext) as AppContextType;

  const [selectedList, setSelectedList] = useState<Array<string>>([])

  var feelings = FeelingsCatalogUtil.getFeelings(gender);
  
  function updateFeelingSelection(feelingId: string) {
    var newList: Array<string>;
    if (selectedList.includes(feelingId)) {
      newList = selectedList.filter((item) => item !== feelingId);
      setSelectedList([...newList])
    }
    else {
      newList = [...selectedList, feelingId];
      setSelectedList([...newList]);
    }
    
    var descriptorList: Array<FeelingDescriptor> = 
      FeelingsUtil.getFeelingsDescriptorList(newList, gender);
    setSelectedFeelingsList(descriptorList);
  }

  function feelingsSelectionDoneHandler() {
    var descriptorList: Array<FeelingDescriptor> = 
      FeelingsUtil.getFeelingsDescriptorList(selectedList, gender);
    var positiveFeelings = FeelingsUtil.getPositiveFeelings(descriptorList);
    var negativeFeelings = FeelingsUtil.getNegativeFeelings(descriptorList);
    if (positiveFeelings.length > 0) {
      navigate("/explore");
    }
    else if (negativeFeelings.length > 0) {
      navigate("/resolve")
    }
  }
  
  const imageHeight = isMobile ? DEFAULT_IMAGE_HEIGHT * MOBILE_HEIGHT_RATIO : DEFAULT_IMAGE_HEIGHT;
  
  return (
    <>
      <div className="app-page">
        <Banner />
        <div className="normal-color app-header-xl">
          { t("click-on-feelings-images", { context: gender }) }
        </div>
        <div className="app-clickable app-header-l margin-bottom-xl app-link">
          { selectedList.length > 0 &&
            <div onClick={ () => feelingsSelectionDoneHandler()}>
              <span className="margin-left-s">
                <img src={ MediaUtil.getAppIcon(APP_ICONS.ARROW_RTL) } alt="" height="16px" /> 
              </span>
              { t("click-to-continue", { context: gender })}
            </div>
          }
        </div>

        <div className="grid-layout">
        {
          feelings.map((feeling) => {
            return (
              <span id={"card-"+feeling.id} key={feeling.id} 
                onClick={ () => { updateFeelingSelection(feeling.id) }}
                className={ selectedList.includes(feeling.id) ?
                  "app-clickable margin-xs app-border-selected"
                :
                  "app-clickable margin-xs app-no-border"}>
              <Card key={feeling.id}
                  content={ t(feeling.titleId, { context: gender }).toString() } 
                  media={ feeling.image }
                  height={ imageHeight }
              />
              </span>
            )
          })
        }
        </div>
        <div className="app-clickable app-header-l margin-bottom-xl app-link">
          { selectedList.length > 0 &&
            <div onClick={ () => feelingsSelectionDoneHandler()}>
              <span className="margin-left-s">
                <img src={ MediaUtil.getAppIcon(APP_ICONS.ARROW_RTL) } alt="" height="16px" /> 
              </span>
              { t("click-to-continue", { context: gender})}
            </div>
          }
        </div>

      </div>
    </>
  )
} 