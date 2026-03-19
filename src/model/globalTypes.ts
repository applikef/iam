import { POLARITY } from "../utils/constantsUtil";

export interface FeelingDescriptor {
  id: string;
  polarity: POLARITY;
  titleId: string;
  image: string | undefined;
}

export interface RemedyDescriptor {
  id: string;
  details: string;
  title: string;
  image: string | undefined;
}