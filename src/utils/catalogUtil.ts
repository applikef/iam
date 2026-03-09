import { ImageCatalogEntryType, ImageCatalogType, MoodListType } from "../model/catalogTypes";
import { MoodDescriptor } from "../model/globalTypes";
import { IMAGE_BASE_URL, GENDER } from "./constantsUtil";
import { ObjectsUtil } from "./ObjectsUtil";

export class CatalogUtil {
    private static imageCatalog: ImageCatalogType = require("./../assets/catalogs/imageCatalog.json");
    private static catalogImages = CatalogUtil.imageCatalog.images;

    private static  moodList: MoodListType = require("./../assets/catalogs/moodsCatalog.json");

  /*********
   * Image Catalog
   */    
  public static getCatalogImages(imageIds: string[] | undefined): string[] {
    if (imageIds === undefined) {
      return [];
    }

    let images: string[] = imageIds.map((id) => CatalogUtil.getCatalogImage(id));
    return images;
  }

  public static getEmptyImage(): string {
     return IMAGE_BASE_URL + CatalogUtil.imageCatalog.emptyImageUrl;
  }

  public static getCatalogImage(imageId: string): string {
    for (let i=0; i < CatalogUtil.catalogImages.length; i++) {
      if (CatalogUtil.catalogImages[i].id === imageId) {
        return IMAGE_BASE_URL + CatalogUtil.catalogImages[i].url;
      }    
    }
    return IMAGE_BASE_URL + CatalogUtil.imageCatalog.emptyImageUrl;
  }

  public static getRandomCatalogImages(count: number, isUnique?: boolean): Array<ImageCatalogEntryType> {
    let indices = [];
    indices = ObjectsUtil.getArrayOfNumbers(CatalogUtil.catalogImages.length);
    let randomIndices:Array<number> = ObjectsUtil.generateRandomNumbers(0, indices.length-1, count);

    let imagesArr = [];
    for (let i=0; i < randomIndices.length; i++) { 
      imagesArr.push(CatalogUtil.catalogImages[indices[randomIndices[i]]]);
    }

    return imagesArr;
  }
  
  /*********
   * Moods Catalog
   */
  public static getMoods(gender: GENDER) {
    var moodDescriptorList: Array<MoodDescriptor> = [];

    CatalogUtil.moodList.moods.forEach(mood => {
      moodDescriptorList.push ({
          id: mood.id,
          title: mood.title[gender],
          image: mood.image !== undefined ? 
            CatalogUtil.getCatalogImage(mood.image[gender]) 
          : CatalogUtil.getEmptyImage()
        }
      )
    });
    return moodDescriptorList;
  }
}