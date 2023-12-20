import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = { firstState: '' };

const nameSlice = createSlice({
	name: 'firstState',
	initialState,
	reducers: {
		firstName(state, action) {
			state.firstState = action.payload;
		}
	}
});
// nameSlice.actions.firstName;
export const nameActions = nameSlice.actions;

const store = configureStore({ reducer: nameSlice.reducer });

export default store;
