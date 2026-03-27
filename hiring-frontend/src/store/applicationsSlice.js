import { createSlice } from '@reduxjs/toolkit'

const applicationsSlice = createSlice({
  name: 'applications',
  initialState: { list: [], selected: null },
  reducers: {
    setApplications: (state, action) => { state.list = action.payload },
    setSelected: (state, action) => { state.selected = action.payload },
  },
})

export const { setApplications, setSelected } = applicationsSlice.actions
export default applicationsSlice.reducer