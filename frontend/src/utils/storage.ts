export const setToken = async (token: string) => {
  localStorage.setItem("token", token);   
}