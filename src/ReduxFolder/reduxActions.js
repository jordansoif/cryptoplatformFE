export const loginUserDispatch = user => {
  return {
    type: "LOGIN",
    currentUser: user
  };
};
