const initialState = {
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    pieceInHand: null
};

export default function uiReducer(state = initialState, action) {
	switch (action.type) {
        case "SCREEN_RESIZE":
        	return Object.assign({}, state, {
                screenWidth: action.screenWidth,
                screenHeight: action.screenHeight
            });

        case "PICK_UP_PIECE":
            return Object.assign({}, state, {
                pieceInHand: {
                    type: action.piece.type,
                    color: action.piece.color,
                    originPos: action.piece.originPos
                }
            });

        case "PLACE_PIECE":
            return Object.assign({}, state, {
                pieceInHand: null
            });


        default: return state;
    }
}