import React, { useState } from 'react';
import { GENDER } from '../utils/constantsUtil';
import { MoodDescriptor } from '../model/globalTypes';

export type AppContextType = {
  name: string;
  setName: (val: string) => void;

  gender: GENDER;
  setGender: (val: GENDER) => void;

  selectedMoodList: Array<MoodDescriptor>;
  setSelectedMoodList: (val: Array<MoodDescriptor>) => void;
};

const AppContext = React.createContext<AppContextType | null>(null);

export const AppContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {

  const [name, setNameValue] = useState<string>("");

  const setName = (val: string) => {
    setNameValue(val);
  }

  const [gender, setGenderValue] = useState<GENDER>(GENDER.F);

  const setGender = (val: GENDER) => {
    setGenderValue(val);
  }

  const [selectedMoodList, setSelectedMoodListValue] = 
    useState<Array<MoodDescriptor>>([]);

  const setSelectedMoodList = (val: Array<MoodDescriptor>) => {
    setSelectedMoodListValue(val);
  }

  return (
    <AppContext.Provider
      value={{
        name,
        setName,
        gender,
        setGender,
        selectedMoodList,
        setSelectedMoodList
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
