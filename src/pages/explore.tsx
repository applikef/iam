import { useContext, useRef } from "react";
import { Banner } from "../components/shared/Banner/Banner";
import "./../assets/styles/global.css";
import AppContext, { AppContextType } from "../context/AppContextProvider";
import { MoodsUtil } from "../utils/MoodsUtil";
import { CatalogUtil } from "../utils/catalogUtil";
import { Link } from "react-router-dom";
import { DEFAULT_FRIEND_HEIGHT } from "../utils/constantsUtil";

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

  const happyFriendImageUrl = CatalogUtil.getCatalogImage("app-friend-happy");
  const thinkingFriendImageUrl = CatalogUtil.getCatalogImage("app-friend-thinking");

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
                    כמה נפלא שיש לך זמן בו את מרגישה 
                    { MoodsUtil.getTitlesAsString(positive.current) }
                    <img src={happyFriendImageUrl} alt="Happy app friend" height={ DEFAULT_FRIEND_HEIGHT } />
                  </div>
                </div>
              }
              { 
              negative.current.length > 0 &&
                <div className="margin-top-xl negative-color">
                  מה נעשה עם זה שאת מרגישה
                  { MoodsUtil.getTitlesAsString(negative.current) }?

                  <Link to="/resolve" className="negative-color app-header-m">
                    <div className="margin-top-xl">
                      הקליקי כאן כדי שנחשוב מה יכול לעזור לך?
                    </div>
                  </Link>

                  <img src={thinkingFriendImageUrl} alt="Thinking app friend"  height={ DEFAULT_FRIEND_HEIGHT } />

                </div>
              }
            </div>
        </div>
      </div>
    </>
  )
} 