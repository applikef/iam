import { Link } from "react-router-dom";
import { Card } from "../components/shared/Card/Card";
import { MoodsCatalogUtil } from "../utils/catalogUtil";
import { APP_ICONS, DEFAULT_IMAGE_HEIGHT, GENDER } from "../utils/constantsUtil";
import "./../assets/styles/global.css";
import { useContext, useState } from "react";
import { Banner } from "../components/shared/Banner/Banner";
import AppContext, { AppContextType } from "../context/AppContextProvider";
import { MoodDescriptor } from "../model/globalTypes";
import { MediaUtil } from "../utils/MediaUtils";

export const Moods = () => {
  // const navigate = useNavigate();

    const { 
    name,
    gender,
    setSelectedMoodList
  } = useContext(AppContext) as AppContextType;

  const [selectedList, setSelectedList] = useState<Array<string>>([])

  var moods = MoodsCatalogUtil.getMoods(GENDER.F);
  
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
    setSelectedMoodList(descriptorList);
  }

  return (
    <>
      <div className="app-page">
        <Banner />
        <div className="normal-color app-header-xl">
          הַקְלִיקִי עַל תְּמוּנוֹת שֶׁמַּרְאוֹת אֵיךְ אַתְּ מַרְגִּישָׁה
        </div>
        <div className="app-clickable normal-color margin-bottom-xl">
          { selectedList.length > 0 &&
            <Link to="/explore" className="normal-color app-header-m">
              <div>
                <span><img src={ MediaUtil.getAppIcon(APP_ICONS.ARROW_RTL) } alt="" height="16px" /> </span>
                הַקְלִיקִי כָּאן כְּדֵי לְהַמְשִׁיךְ
              </div>
            </Link>
          }
        </div>

        <div className="grid-layout">
        {
          moods.map((mood) => {
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
        <div className="app-clickable normal-color margin-top-xl margin-bottom-xl">
          { selectedList.length > 0 &&
            <Link to="/explore" className="normal-color app-header-m">
              <div>
                <span><img src={ MediaUtil.getAppIcon(APP_ICONS.ARROW_RTL) } alt="" height="16px" /> </span>
                הַקְלִיקִי כָּאן כְּדֵי לְהַמְשִׁיךְ
              </div>
            </Link>
          }
        </div>

      </div>
    </>
  )
} 