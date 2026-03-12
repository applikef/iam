import { useContext, useRef } from "react";
import { Banner } from "../components/shared/Banner/Banner";
import "./../assets/styles/global.css";
import AppContext, { AppContextType } from "../context/AppContextProvider";
import { MoodsUtil } from "../utils/MoodsUtil";
import { ImageCatalogUtil } from "../utils/catalogUtil";
import { Link } from "react-router-dom";
import { APP_ICONS, DEFAULT_FRIEND_HEIGHT } from "../utils/constantsUtil";
import { MediaUtil } from "../utils/MediaUtils";

export const Explore = () => {
  // const navigate = useNavigate();

  const { 
    name,
    gender,
    selectedMoodList,
  } = useContext(AppContext) as AppContextType;

  const positive = 
   useRef(MoodsUtil.getPositiveMoods(selectedMoodList));
  const negative =
    useRef(MoodsUtil.getNegativeMoods(selectedMoodList));;

  const happyFriendImageUrl = MediaUtil.getAppIcon(APP_ICONS.HAPPY_FRIEND);
  const thinkingFriendImageUrl = MediaUtil.getAppIcon(APP_ICONS.THINKING_FRIEND);

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
                    כַּמָּה נִפְלָא שֶׁיֵּשׁ לָךְ זְמַן בּוֹ אַתְּ מַרְגִּישָׁה 
                    { MoodsUtil.getTitlesAsString(positive.current) }
                    <img src={happyFriendImageUrl} alt="Happy app friend" height={ DEFAULT_FRIEND_HEIGHT } />
                  </div>
                </div>
              }
              { 
              negative.current.length > 0 &&
                <div className="margin-top-xl negative-color">
                  מָה נַעֲשֶׂה עִם זֶה שֶׁאַתְּ מַרְגִּישָׁה
                  { MoodsUtil.getTitlesAsString(negative.current) }?

                  <Link to="/resolve" className="negative-color app-header-m">
                    <div className="margin-top-xl">
                      <span><img src={ MediaUtil.getAppIcon(APP_ICONS.ARROW_RTL) } alt="" height="24px" /> </span>
                      הַקְלִיקִי כָּאן כְּדֵי שֶׁנַּחְשֹׁב מָה יָכוֹל לַעֲזֹר לְךָ
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