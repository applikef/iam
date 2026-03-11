import { MoodDescriptor } from "../model/globalTypes";
import { POLARITY } from "./constantsUtil";

export class MoodsUtil {
  public static getPolarityMoods(moodsList: Array<MoodDescriptor>, polarity: POLARITY): Array<MoodDescriptor> {
    var list: Array<MoodDescriptor> = [];
    for(var i=0; i < moodsList.length; i++) {
      if (moodsList[i].polarity === polarity) {
        list.push(moodsList[i]);
      }
    }
    return list;
  }

  public static getPositiveMoods(moodsList: Array<MoodDescriptor>): Array<MoodDescriptor> {
    return MoodsUtil.getPolarityMoods(moodsList, POLARITY.POSITIVE);
  }

  public static getNegativeMoods(moodsList: Array<MoodDescriptor>): Array<MoodDescriptor> {
    return MoodsUtil.getPolarityMoods(moodsList, POLARITY.NEGATIVE);
  }

  public static getTitlesAsString(moods: Array<MoodDescriptor>): string {
    var str: string = "";
    for (var i=0; i < moods.length; i++) {
      if (moods.length === 1) {
        return " " +  moods[0].title
      }

      if (i === moods.length -1) {
        str += " ו";
      }
      else {
        str += " ";
      }

      str += moods[i].title;
    }
    return str;
  }
}