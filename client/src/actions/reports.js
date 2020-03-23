import * as types from '../types/reports';


export const selectReportId = reportId => ({
  type: types.REPORT_SELECTED_ID,
  payload: reportId,
});

export const selectReport = report => ({
  type: types.REPORT_SELECTED,
  payload: report,
});