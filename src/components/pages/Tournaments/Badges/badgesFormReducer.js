export const badgesTypes = {
  setFromPlayerType: '[form] setFromPlayerType',
  setFormTeam: '[form] setFormTeam',
  setSize: '[form] setSize',
  setFieldCheck: '[form] setFieldCheck',
  setTextColor: '[form] setTextColor',
  setBgColor: '[form] setBgColor',
  setBgImage: '[form] setBgImage',
  removeBgImage: '[form] removeBgImage',
};

const badgeFormReducer = (state, action) => {
  switch (action.type) {
    case badgesTypes.setFromPlayerType:
      return { ...state, playerType: action.payload };
    case badgesTypes.setFormTeam:
      return { ...state, teamId: action.payload };
    case badgesTypes.setSize:
      return { ...state, size: action.payload };
    case badgesTypes.setFieldCheck:
      return {
        ...state,
        fields: state.fields.map(field => {
          if (field.name === action.payload.name) return action.payload;
          return field;
        }),
      };
    case badgesTypes.setTextColor:
      return { ...state, textColor: action.payload };
    case badgesTypes.setBgColor:
      return { ...state, bgColor: action.payload };
    case badgesTypes.setBgImage:
      return { ...state, bgImage: action.payload };
    case badgesTypes.removeBgImage:
      return { ...state, bgImage: action.payload };
    default:
      return state;
  }
};

export default badgeFormReducer;
