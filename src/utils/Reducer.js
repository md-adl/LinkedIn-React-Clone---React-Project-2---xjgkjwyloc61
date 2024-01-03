export const initialState = {
  token: null,
  posts: [],
  userName: "",
  searchPost: null,
  personalDetail: null,
  ownPost: [],
  profile: null,
  groupPost: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_POST":
      return { ...state, posts: action.payload };
    case "SET_OWNPOST":
      return { ...state, ownPost: action.payload };
    case "SET_GROUP":
      return { ...state, groupPost: action.payload };
    case "REMOVE_GROUP_POST":
      const updatedGroupPost = state.groupPost.filter(
        (post) => post._id !== action.payload,
      );
      return { ...state, groupPost: updatedGroupPost };
    case "SET_OWNPOSTDUP":
      return { ...state, ownPost: action.payload };
    case "SET_NAME":
      return { ...state, userName: action.payload };
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "SET_SEARCH":
      return { ...state, searchPost: action.payload };
    case "SET_PERSONAL":
      return { ...state, personalDetail: action.payload };
    case "SET_PROFILE":
      return { ...state, profile: action.payload };
    default:
      return state;
  }
};

export default reducer;
