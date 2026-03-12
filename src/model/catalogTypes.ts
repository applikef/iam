import { POLARITY } from "../utils/constantsUtil";

/*********
 * Image Catalog
 */
export enum CATALOG_IMAGE_TYPE {
  PICTURE,
  CLIPART
}

export interface ImageCatalogType {
  images: Array<ImageCatalogEntryType>;
  emptyImageUrl: string
}

export interface MetaDataType {
  firstLetter?: string;
  alternativeSpelling?: string;
}

export interface ImageCatalogEntryType {
  id: string;
  url: string;
  imageType?: CATALOG_IMAGE_TYPE;
  isTransparent?: boolean;
  audioId?: string;
  title?: string;
  name?: string;
  metadata?: MetaDataType | undefined;
}

/**********
 * Mood Catalog
 */
export interface GenderSplitType {
    female: string;
    male: string;
}

export interface MoodType {
  id: string;
  polarity: POLARITY;
  title: GenderSplitType;
  image: GenderSplitType;
}

export interface MoodListType {
  moods: Array<MoodType>;
}

export interface RemedyType {
  id: string;
  title: GenderSplitType;
  image: GenderSplitType;
  details: string;
}

export interface RemedyListType {
  remedies: Array<RemedyType>;
}
