import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GenresData, RegionData, RegionsResponse } from "src/redux/@type";
import { RootState } from "src/redux/store";

type InitialState = {
  regions: RegionData[];
};

const initialState: InitialState = {
  regions: [],
};

const regionSlice = createSlice({
  name: "regionReducer",
  initialState,
  reducers: {
    getRegions: (_, __: PayloadAction<undefined>) => {},
    setRegions: (state, action: PayloadAction<RegionData[]>) => {
      state.regions = action.payload;
    },
  },
});

export const { getRegions, setRegions } = regionSlice.actions;

export const RegionSelectors = {
  getRegions: (state: RootState) => state.regionReducer.regions,
};

export default regionSlice.reducer;
