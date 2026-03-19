import { useTranslation } from 'react-i18next';
import { Card } from "../components/shared/Card/Card";
import { RemediesCatalogUtil } from "../utils/catalogUtil";
import { APP_ICONS, DEFAULT_IMAGE_HEIGHT, GENDER } from "../utils/constantsUtil";
import "./../assets/styles/global.css";
import { useContext, useRef, useState } from "react";
import { Banner } from "../components/shared/Banner/Banner";
import AppContext, { AppContextType } from "../context/AppContextProvider";
import { FeelingsUtil } from "../utils/FeelingsUtil";
import { DetailsPopup } from "../components/detailsPopup/DetailsPopup";
import { Link } from "react-router-dom";
import { MediaUtil } from "../utils/MediaUtils";
import { FeelingDescriptor } from '../model/globalTypes';

export const Resolve = () => {
  const { t } = useTranslation();

  const { 
    name,
    gender,
    selectedFeelingsList
  } = useContext(AppContext) as AppContextType;

  const negativeFeelings = useRef(FeelingsUtil.getNegativeFeelings(selectedFeelingsList));;

  var remedies = RemediesCatalogUtil.getRemedies(gender);

  const [selectedRemedyId, setSelectedRemedyId] = useState<string | null>(null);

  function remedySelectionHandler(id: string) {
    setSelectedRemedyId(id);
  }

  function switchShow() {
    return (
      selectedRemedyId === null ?
        "info-popup-hide"
      :
        "info-popup-show"
    )
  }

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
        <div className="normal-color app-header-xl">
          { t("click-for-remedy", {context: gender}) } 
          { FeelingsUtil.getTitlesAsString(translate(negativeFeelings.current)) }?
        </div>

        <div className="grid-layout">
        {
          remedies.map((remedy) => {
            return (
              <span id={"card-"+remedy.id} key={remedy.id} 
                onClick={ () => { remedySelectionHandler(remedy.id) }}
                className="app-clickable margin-xs app-no-border">
              <Card key={remedy.id}
                  content={ remedy.title } 
                  media={ remedy.image }
                  height={ DEFAULT_IMAGE_HEIGHT * 3 / 4 }
              />
              </span>
            )
          })
        }
        </div>

        <div className="margin-top-xl negative-color">
          <Link to="/feelings" className="app-header-m">
            <div className="margin-top-xl margin-bottom-xl">
              <span><img src={ MediaUtil.getAppIcon(APP_ICONS.ARROW_RTL) } alt="" height="16px" /> </span>
              { t("feel-differently", {context: gender}) }
            </div>
          </Link>
        </div>
      </div>

      { selectedRemedyId !== null &&
        <div className={`info-popup-content ${ switchShow() }`}>
          <DetailsPopup infoId={selectedRemedyId} baseUrl="remedyDetails" onClose={() => setSelectedRemedyId(null)}/>
        </div>
      }
    </>
  )
} 