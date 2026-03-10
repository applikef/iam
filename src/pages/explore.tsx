import { useContext } from "react";
import { Banner } from "../components/shared/Banner/Banner";
import "./../assets/styles/global.css";
import AppContext, { AppContextType } from "../context/AppContextProvider";
import { MoodDescriptor } from "../model/globalTypes";

export const Explore = () => {
  // const navigate = useNavigate();

  const { 
    name,
    gender,
    selectedMoodList,
  } = useContext(AppContext) as AppContextType;


  return (
    <>
      <div className="app-page"> 
        <Banner />
        <div className="app-header-xl">
          {selectedMoodList.map((d: MoodDescriptor) => {
            return(
              <div>
                { d.id + " " + d.title + " " + d.polarity }
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
} 