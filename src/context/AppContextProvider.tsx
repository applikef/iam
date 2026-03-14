import React, { useState } from 'react';
import { GENDER } from '../utils/constantsUtil';
import { FeelingDescriptor } from '../model/globalTypes';

export type AppContextType = {
  name: string;
  setName: (val: string) => void;

  gender: GENDER;
  setGender: (val: GENDER) => void;

  selectedFeelingsList: Array<FeelingDescriptor>;
  setSelectedFeelingsList: (val: Array<FeelingDescriptor>) => void;
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

  const [selectedFeelingsList, setSelectedFeelingsListValue] = 
    useState<Array<FeelingDescriptor>>([]);

  const setSelectedFeelingsList = (val: Array<FeelingDescriptor>) => {
    setSelectedFeelingsListValue(val);
  }

  return (
    <AppContext.Provider
      value={{
        name,
        setName,
        gender,
        setGender,
        selectedFeelingsList,
        setSelectedFeelingsList
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
