import { POLARITY } from "../utils/constantsUtil";

export interface MoodDescriptor {
  id: string;
  polarity: POLARITY;
  title: string;
  image: string | undefined;
}

export interface RemedyDescriptor {
  id: string;
  details: string;
  title: string;
  image: string | undefined;
}