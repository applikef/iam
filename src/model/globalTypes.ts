import { POLARITY } from "../utils/constantsUtil";

export interface MoodDescriptor {
  id: string;
  polarity: POLARITY;
  title: string;
  image: string | undefined;
}