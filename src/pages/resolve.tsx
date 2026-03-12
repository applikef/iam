import { Link } from "react-router-dom";
import { Card } from "../components/shared/Card/Card";
import { MoodsCatalogUtil, RemediesCatalogUtil } from "../utils/catalogUtil";
import { DEFAULT_IMAGE_HEIGHT, GENDER } from "../utils/constantsUtil";
import "./../assets/styles/global.css";
import { useContext, useRef, useState } from "react";
import { Banner } from "../components/shared/Banner/Banner";
import AppContext, { AppContextType } from "../context/AppContextProvider";
import { MoodDescriptor } from "../model/globalTypes";
import { MoodsUtil } from "../utils/MoodsUtil";

export const Resolve = () => {
  // const navigate = useNavigate();

    const { 
    name,
    gender,
    selectedMoodList
  } = useContext(AppContext) as AppContextType;

  const [selectedList, setSelectedList] = useState<Array<string>>([])
  const negativeMoods = useRef(MoodsUtil.getNegativeMoods(selectedMoodList));;

  var remedies = RemediesCatalogUtil.getRemedies(GENDER.F);
  
  function updateMoodSelection(moodId: string) {
    var newList: Array<string>;
    if (selectedList.includes(moodId)) {
      newList = selectedList.filter((item) => item !== moodId);
      setSelectedList([...newList])
    }
    else {
      newList = [...selectedList, moodId];
      setSelectedList([...newList]);
    }
    
    var descriptorList: Array<MoodDescriptor> = [];
    newList.forEach((item: string) => {
      const d: MoodDescriptor | undefined = MoodsCatalogUtil.getMoodDescriptor(item, gender);
      if (d !== undefined) {
        descriptorList.push(d)
      }
    })
  }

  return (
    <>
      <div className="app-page">
        <Banner />
        <div className="normal-color app-header-xl">
          בואי נחשוב מה יכול לעזור לך להרגיש פחות 
          { MoodsUtil.getTitlesAsString(negativeMoods.current) }
        </div>
        <div className="normal-color margin-bottom-xl app-header-m">
          הקליקי על משהו שאולי יעזור לך להרגיש יותר טוב
        </div>

        <div className="grid-layout">
        {
          remedies.map((remedy) => {
            return (
              <span id={"card-"+remedy.id} key={remedy.id} 
                onClick={ () => { updateMoodSelection(remedy.id) }}
                className={ selectedList.includes(remedy.id) ?
                  "app-clickable margin-xs app-border-selected"
                :
                  "app-clickable margin-xs app-no-border"}>
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
    </>
  )
} 