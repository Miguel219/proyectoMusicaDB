import { combineReducers } from 'redux';

import * as types from '../types/reports';


const reportSelectedId = (state = null, action) => {
  switch (action.type) {
    case types.REPORT_SELECTED_ID: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

const reportSelected = (state = [], action) => {
  switch (action.type) {
    case types.REPORT_SELECTED: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};


const report = combineReducers({
  reportSelected,
  reportSelectedId
});

export default report;

export const getReport = (state) => state.reportSelected;
export const getReportSelected = (state) => state.reportSelectedId;