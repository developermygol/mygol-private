const initialState = null;

const appearanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'setAppearanceData':
      return { ...action.payload };
    case 'addImage':
      return { ...state, bgImageUrl: action.payload.bgImageUrl, bgUploadId: action.payload.bgUploadId };
    case 'removeImage':
      const updatedState = { ...state };
      delete updatedState['bgImageUrl'];
      delete updatedState['bgUploadId'];
      return updatedState;
    case 'updateBgColor':
      return { ...state, bgColor: action.payload };
    case 'updateColor1':
      return { ...state, color1: action.payload };
    case 'updateColor2':
      return { ...state, color2: action.payload };
    case 'updateColor3':
      return { ...state, color3: action.payload };
    default:
      return state;
  }
};

export default appearanceReducer;
