import { Card } from "../components/shared/Card/Card";
import { RemediesCatalogUtil } from "../utils/catalogUtil";
import { DEFAULT_IMAGE_HEIGHT, GENDER } from "../utils/constantsUtil";
import "./../assets/styles/global.css";
import { useContext, useRef, useState } from "react";
import { Banner } from "../components/shared/Banner/Banner";
import AppContext, { AppContextType } from "../context/AppContextProvider";
import { MoodsUtil } from "../utils/MoodsUtil";
import { DetailsPopup } from "../components/detailsPopup/DetailsPopup";

export const Resolve = () => {
  // const navigate = useNavigate();

  const { 
    name,
    gender,
    selectedMoodList
  } = useContext(AppContext) as AppContextType;

  const negativeMoods = useRef(MoodsUtil.getNegativeMoods(selectedMoodList));;

  var remedies = RemediesCatalogUtil.getRemedies(GENDER.F);

  const [selectedRemedyId, setSelectedRemedyId] = useState<string | null>();

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
          בּוֹאִי נַחְשֹׁב מָה יָכוֹל לַעֲזֹר לָךְ לְהַרְגִּישׁ פָּחוֹת 
          { MoodsUtil.getTitlesAsString(negativeMoods.current) }
        </div>
        <div className="normal-color margin-bottom-xl app-header-m app-clickable">
          הַקְלִיקִי עַל מַשֶּׁהוּ שֶׁאוּלַי יַעֲזֹר לְךָ לְהַרְגִּישׁ יוֹתֵר טוֹב
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
                  height={ DEFAULT_IMAGE_HEIGHT }
              />
              </span>
            )
          })
        }
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