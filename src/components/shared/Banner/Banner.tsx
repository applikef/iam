import { Link } from "react-router-dom";

import './Banner.css'
import { HOME_PAGE_PATH, IMAGE_BASE_URL } from "./../../../utils/constantsUtil";

export const Banner = () => {
  return (
    <>
        <div>
          <div className="banner-icon-bar">
            <div className="banner-left-icon-bar">
              <Link to={HOME_PAGE_PATH}>
                <img src={ IMAGE_BASE_URL+"resources/icons/home128.png" }
                  className="banner-icon" 
                  title="עמוד הבית"  alt="עמוד הבית" />
              </Link>
            </div>
          </div>
          <hr className="banner-hr"/>
        </div>
    </>
  );
}