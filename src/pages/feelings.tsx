import { useNavigate } from "react-router-dom";
import { Card } from "../components/shared/Card/Card";
import { FeelingsCatalogUtil } from "../utils/catalogUtil";
import { APP_ICONS, DEFAULT_IMAGE_HEIGHT, GENDER } from "../utils/constantsUtil";
import "./../assets/styles/global.css";
import { useContext, useState } from "react";
import { Banner } from "../components/shared/Banner/Banner";
import AppContext, { AppContextType } from "../context/AppContextProvider";
import { FeelingDescriptor } from "../model/globalTypes";
import { MediaUtil } from "../utils/MediaUtils";
import { FeelingsUtil } from "../utils/FeelingsUtil";

export const Feelings = () => {
  const navigate = useNavigate();

    const { 
    name,
    gender,
    setSelectedFeelingsList
  } = useContext(AppContext) as AppContextType;

  const [selectedList, setSelectedList] = useState<Array<string>>([])

  var feelings = FeelingsCatalogUtil.getFeelings(GENDER.F);
  
  function updateMoodSelection(feelingId: string) {
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
  
  return (
    <>
      <div className="app-page">
        <Banner />
        <div className="normal-color app-header-xl">
          הַקְלִיקִי עַל תְּמוּנוֹת שֶׁמַּרְאוֹת אֵיךְ אַתְּ מַרְגִּישָׁה
        </div>
        <div className="app-clickable app-header-l margin-bottom-xl app-link">
          { selectedList.length > 0 &&
            <div onClick={ () => feelingsSelectionDoneHandler()}>
              <span className="margin-left-s">
                <img src={ MediaUtil.getAppIcon(APP_ICONS.ARROW_RTL) } alt="" height="16px" /> 
              </span>
              הַקְלִיקִי כָּאן כְּדֵי לְהַמְשִׁיךְ
            </div>
          }
        </div>

        <div className="grid-layout">
        {
          feelings.map((mood) => {
            return (
              <span id={"card-"+mood.id} key={mood.id} 
                onClick={ () => { updateMoodSelection(mood.id) }}
                className={ selectedList.includes(mood.id) ?
                  "app-clickable margin-xs app-border-selected"
                :
                  "app-clickable margin-xs app-no-border"}>
              <Card key={mood.id}
                  content={ mood.title } 
                  media={ mood.image }
                  height={ DEFAULT_IMAGE_HEIGHT }
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
              הַקְלִיקִי כָּאן כְּדֵי לְהַמְשִׁיךְ
            </div>
          }
        </div>

      </div>
    </>
  )
} 