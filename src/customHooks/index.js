import { useSelector } from "react-redux";

export const useUserInfo = () => {
  const loginUser = useSelector((state) => state.loginUser);
  const { userInfo } = loginUser;
  return userInfo;
};
