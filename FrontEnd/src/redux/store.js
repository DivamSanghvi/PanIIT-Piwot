import { configureStore } from '@reduxjs/toolkit';
import teacherReducer from './slices/teacherSlice'
import testReducer from './slices/testSlice'

const store = configureStore({
  reducer: {
    teacher: teacherReducer,
    test: testReducer,
  },
});

export default store;
