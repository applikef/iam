import { Link } from "react-router-dom";

import './Banner.css'
import { HOME_PAGE_PATH, IMAGE_BASE_URL } from "./../../../utils/constantsUtil";
import { CatalogUtil } from "../../../utils/catalogUtil";

export const Banner = () => {
  return (
    <>
        <div>
          <div className="banner-icon-bar">
            <Link to={"/moods"}>
              <img src={ IMAGE_BASE_URL+"resources/icons/pin128.png" }
                className="banner-icon" 
                title="רגשות"  alt="רגשות" />
            </Link>
            <div>
              <img src={CatalogUtil.getCatalogImage("app-friend")} alt="" 
                className="banner-icon" />
            </div>
            <Link to={HOME_PAGE_PATH}>
              <img src={ IMAGE_BASE_URL+"resources/icons/home128.png" }
                className="banner-icon" 
                title="עמוד הבית"  alt="עמוד הבית" />
            </Link>
          </div>
          <hr className="banner-hr"/>
        </div>
    </>
  );
}