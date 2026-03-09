import { Link } from "react-router-dom";
import { Card } from "../components/shared/Card/Card";
import { CatalogUtil } from "../utils/catalogUtil";
import { DefaultImageHeight, GENDER } from "../utils/constantsUtil";
import "./../assets/styles/global.css";
import { useState } from "react";

export const Moods = () => {
  // const navigate = useNavigate();

  const [selectedList, setSelectedList] = useState<Array<string>>([])

  var moods = CatalogUtil.getMoods(GENDER.F);

  function updateMoodSelection(moodId: string) {
    if (selectedList.includes(moodId)) {
      const newList = selectedList.filter((item) => item !== moodId);
      setSelectedList([...newList])
    }
    else {
      setSelectedList([...selectedList, moodId])
    } 
  }

  return (
    <>
      <div className="app-header-xl">
        איך אני מרגישה?
      </div>

      <div className="grid-layout">
      {
        moods.map((mood) => {
          return (
            <span id={"card-"+mood.id} key={mood.id} 
              onClick={ () => { updateMoodSelection(mood.id) }}
              className={ selectedList.includes(mood.id) ?
                "margin-xs app-border-selected"
              :
                "margin-xs app-no-border"}>
            <Card key={mood.id}
                content={ mood.title } 
                media={ mood.image }
                height={ DefaultImageHeight }
            />
            </span>
          )
        })
      }
      </div>

      <div className="app-clickable">
        { selectedList.length > 0 &&
          <Link to="/" className="app-header-m">
            <div>תקליקי כאן כדי שנחשוב ביחד מה יכול לעזור לך?</div>
          </Link>          
        }
      </div>
    </>
  )
} 