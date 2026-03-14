import { ImageCatalogEntryType, ImageCatalogType, MoodListType, RemedyListType } from "../model/catalogTypes";
import { FeelingDescriptor, RemedyDescriptor } from "../model/globalTypes";
import { IMAGE_BASE_URL, GENDER } from "./constantsUtil";
import { ObjectsUtil } from "./ObjectsUtil";

export class ImageCatalogUtil {
    private static imageCatalog: ImageCatalogType = require("./../assets/catalogs/imageCatalog.json");
    private static catalogImages = ImageCatalogUtil.imageCatalog.images;

  /*********
   * Image Catalog
   */    
  public static getCatalogImages(imageIds: string[] | undefined): string[] {
    if (imageIds === undefined) {
      return [];
    }

    let images: string[] = imageIds.map((id) => ImageCatalogUtil.getCatalogImage(id));
    return images;
  }

  public static getEmptyImage(): string {
     return IMAGE_BASE_URL + ImageCatalogUtil.imageCatalog.emptyImageUrl;
  }

  public static getCatalogImage(imageId: string): string {
    for (let i=0; i < ImageCatalogUtil.catalogImages.length; i++) {
      if (ImageCatalogUtil.catalogImages[i].id === imageId) {
        return IMAGE_BASE_URL + ImageCatalogUtil.catalogImages[i].url;
      }    
    }
    return IMAGE_BASE_URL + ImageCatalogUtil.imageCatalog.emptyImageUrl;
  }

  public static getRandomCatalogImages(count: number, isUnique?: boolean): Array<ImageCatalogEntryType> {
    let indices = [];
    indices = ObjectsUtil.getArrayOfNumbers(ImageCatalogUtil.catalogImages.length);
    let randomIndices:Array<number> = ObjectsUtil.generateRandomNumbers(0, indices.length-1, count);

    let imagesArr = [];
    for (let i=0; i < randomIndices.length; i++) { 
      imagesArr.push(ImageCatalogUtil.catalogImages[indices[randomIndices[i]]]);
    }

    return imagesArr;
  }
}
  
export class MoodsCatalogUtil {
  private static  moodList: MoodListType = require("./../assets/catalogs/moodsCatalog.json");

  public static getMoods(gender: GENDER) {
    var FeelingDescriptorList: Array<FeelingDescriptor> = [];

    MoodsCatalogUtil.moodList.moods.forEach(mood => {
      FeelingDescriptorList.push ({
          id: mood.id,
          title: mood.title[gender],
          polarity: mood.polarity,
          image: mood.image !== undefined ? 
            ImageCatalogUtil.getCatalogImage(mood.image[gender]) 
          : ImageCatalogUtil.getEmptyImage()
        }
      )
    });
    return FeelingDescriptorList;
  }

  public static getFeelingDescriptor(id: string, gender: GENDER): FeelingDescriptor | undefined {
    const moods = MoodsCatalogUtil.moodList.moods;
    for (var i=0; i < moods.length; i++) {
      const mood = moods[i];
      if (mood.id === id) {
        return {
          id: mood.id,
          title: mood.title[gender],
          polarity: mood.polarity,
          image: mood.image !== undefined ? 
            ImageCatalogUtil.getCatalogImage(mood.image[gender]) 
          : ImageCatalogUtil.getEmptyImage()
        }
      }
    };
  }
}

export class RemediesCatalogUtil {
  private static  remedyList: RemedyListType = require("./../assets/catalogs/remediesCatalog.json");

  public static getRemedies(gender: GENDER) {
    var remedyDescriptorList: Array<RemedyDescriptor> = [];

    RemediesCatalogUtil.remedyList.remedies.forEach(remedy => {
      remedyDescriptorList.push ({
          id: remedy.id,
          title: remedy.title[gender],
          details: "",
          image: remedy.image !== undefined ? 
            ImageCatalogUtil.getCatalogImage(remedy.image[gender]) 
          : ImageCatalogUtil.getEmptyImage()
        }
      )
    });
    return remedyDescriptorList;
  }

  public static getRemedyDescriptor(id: string, gender: GENDER):RemedyDescriptor | undefined {
    const remedies = RemediesCatalogUtil.remedyList.remedies;
    for (var i=0; i < remedies.length; i++) {
      const remedy = remedies[i];
      if (remedy.id === id) {
        return {
          id: remedy.id,
          title: remedy.title[gender],
          details: remedy.details,
          image: remedy.image !== undefined ? 
            ImageCatalogUtil.getCatalogImage(remedy.image[gender]) 
          : ImageCatalogUtil.getEmptyImage()
        }
      }
    };
  }
}