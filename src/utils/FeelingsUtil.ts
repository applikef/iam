import { FeelingDescriptor } from "../model/globalTypes";
import { FeelingsCatalogUtil } from "./catalogUtil";
import { GENDER, POLARITY } from "./constantsUtil";

export class FeelingsUtil {
  public static getPolarityMoods(feelingsList: Array<FeelingDescriptor>, polarity: POLARITY): Array<FeelingDescriptor> {
    var list: Array<FeelingDescriptor> = [];
    for(var i=0; i < feelingsList.length; i++) {
      if (feelingsList[i].polarity === polarity) {
        list.push(feelingsList[i]);
      }
    }
    return list;
  }

  public static getFeelingsDescriptorList(feelingsIdList: Array<string>, gender: GENDER): Array<FeelingDescriptor> {
    var descriptorList: Array<FeelingDescriptor> = [];
    feelingsIdList.forEach((item: string) => {
      const d: FeelingDescriptor | undefined = FeelingsCatalogUtil.getFeelingDescriptor(item, gender);
      if (d !== undefined) {
        descriptorList.push(d)
      }
    })
    return descriptorList;
  }

  public static getPositiveFeelings(feelingsList: Array<FeelingDescriptor>): Array<FeelingDescriptor> {
    return FeelingsUtil.getPolarityMoods(feelingsList, POLARITY.POSITIVE);
  }

  public static getNegativeFeelings(feelingsList: Array<FeelingDescriptor>): Array<FeelingDescriptor> {
    return FeelingsUtil.getPolarityMoods(feelingsList, POLARITY.NEGATIVE);
  }

  public static getTitlesAsString(feelings: Array<FeelingDescriptor>): string {
    var str: string = "";
    for (var i=0; i < feelings.length; i++) {
      if (feelings.length === 1) {
        return " " +  feelings[0].title
      }

      if (i === feelings.length -1) {
        str += " ו";
      }
      else {
        str += " ";
      }

      str += feelings[i].title;
    }
    return str;
  }
}