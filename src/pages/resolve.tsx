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

export const Resolve = () => {
  // const navigate = useNavigate();

  const { 
    name,
    gender,
    selectedFeelingsList
  } = useContext(AppContext) as AppContextType;

  const negativeFeelings = useRef(FeelingsUtil.getNegativeFeelings(selectedFeelingsList));;

  var remedies = RemediesCatalogUtil.getRemedies(GENDER.F);

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

  return (
    <>
      <div className="app-page">
        <Banner />
        <div className="normal-color app-header-xl">
          הַקְלִיקִי עַל מַשֶּׁהוּ שֶׁיִּגְרֹם לָךְ לְהַרְגִּישׁ פָּחוֹת 
          { FeelingsUtil.getTitlesAsString(negativeFeelings.current) }?
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
              מַרְגִּישָׁה אַחֶרֶת? הַקְלִיקִי כָּאן
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