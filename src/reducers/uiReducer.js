const initialState = {
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight
};

export default function uiReducer(state = initialState, action) {
	switch (action.type) {
        case 'SCREEN_RESIZE':
        	return Object.assign({}, state, {
                screenWidth: action.screenWidth,
                screenHeight: action.screenHeight
            });

        default: return state;
    }
}