import { useContext, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { Banner } from "../components/shared/Banner/Banner";
import "./../assets/styles/global.css";
import AppContext, { AppContextType } from "../context/AppContextProvider";
import { FeelingsUtil } from "../utils/FeelingsUtil";
import { Link } from "react-router-dom";
import { APP_ICONS, DEFAULT_FRIEND_HEIGHT } from "../utils/constantsUtil";
import { MediaUtil } from "../utils/MediaUtils";
import { FeelingDescriptor } from "../model/globalTypes";

export const Explore = () => {
  const { t } = useTranslation();

  const { 
    gender,
    selectedFeelingsList,
  } = useContext(AppContext) as AppContextType;

  const positive = 
   useRef(FeelingsUtil.getPositiveFeelings(selectedFeelingsList));
  const negative =
    useRef(FeelingsUtil.getNegativeFeelings(selectedFeelingsList));;

  const happyFriendImageUrl = MediaUtil.getAppIcon(APP_ICONS.HAPPY_FRIEND);
  const thinkingFriendImageUrl = MediaUtil.getAppIcon(APP_ICONS.THINKING_FRIEND);

  /**
   * String translation should be done in a component
   * @returns 
   */
  function translate(feelings: FeelingDescriptor[]) {
    var titles: Array<string> = [];
    for (var i=0; i < feelings.length; i++) {
      var title = t(feelings[i].titleId, { context: gender });
      titles.push(title)
    }
    return titles;
  }

  return (
    <>
      <div className="app-page"> 
        <Banner />
        <div className="app-header-xl">
            <div>
              {
                positive.current.length > 0 &&
                <div>
                  <div className="positive-color">
                    { t("wonderfull-you-feel", { context: gender }) } 
                    { FeelingsUtil.getTitlesAsString(translate(positive.current)) }
                    <div>
                      <img src={happyFriendImageUrl} alt="Happy app friend" height={ DEFAULT_FRIEND_HEIGHT } />
                    </div>
                  </div>
                </div>
              }
              { 
                negative.current.length === 0 &&
                <div className="margin-top-xl negative-color">
                  <Link to="/feelings" className="app-header-m">
                    <div className="margin-top-xl">
                      <span><img src={ MediaUtil.getAppIcon(APP_ICONS.ARROW_RTL) } alt="" height="24px" /> </span>
                      { t("feel-differently", {context: gender}) }
                    </div>
                  </Link>
                </div>
              }
              { 
                negative.current.length > 0 &&
                <div className="margin-top-xl negative-color">
                  { t("what-to-do", {context: gender}) }
                  { FeelingsUtil.getTitlesAsString(translate(negative.current)) }?

                  <Link to="/resolve" className="app-header-m">
                    <div className="margin-top-xl">
                      <span><img src={ MediaUtil.getAppIcon(APP_ICONS.ARROW_RTL) } alt="" height="24px" /> </span>
                      { t("click-to-think", {context: gender}) }
                    </div>
                  </Link>

                  <img src={thinkingFriendImageUrl} alt="Thinking app friend"  
                    className="margin-top-xl" height={ DEFAULT_FRIEND_HEIGHT } />

                </div>
              }
            </div>
        </div>
      </div>
    </>
  )
} 