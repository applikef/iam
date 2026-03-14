import { APP_ICONS, IMAGE_BASE_URL } from "./constantsUtil";

export class MediaUtil {
  public static getAppIcon(iconType: APP_ICONS): string {
    switch(iconType) {
      case APP_ICONS.HOME:
        return IMAGE_BASE_URL + "resources/icons/duckyHome123.png";
      case APP_ICONS.MOODS:
        return IMAGE_BASE_URL+"resources/icons/pin128.png";
      case APP_ICONS.CALM_FRIEND: 
        return IMAGE_BASE_URL+"resources/icons/ducky-duck-calm.png";
      case APP_ICONS.HAPPY_FRIEND: 
        return IMAGE_BASE_URL+"resources/icons/ducky-duck-happy.png";
      case APP_ICONS.THINKING_FRIEND: 
        return IMAGE_BASE_URL+"resources/icons/ducky-duck-thinking.png";
      case APP_ICONS.ARROW_RTL: 
        return IMAGE_BASE_URL+"resources/icons/arrowTRL128.png";
    }
  }
}
