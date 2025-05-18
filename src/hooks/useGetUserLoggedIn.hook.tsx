export const useGetUserLoggedIn = () => {
  const { data: userData } = useGetUserData();
  return userData;
};
