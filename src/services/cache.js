export function getUser() {
  const userJson = localStorage.getItem("user");
  return JSON.parse(userJson);
}

export function setUser(u) {
  localStorage.setItem("user", JSON.stringify(u));
}

export function getToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function setToken(t) {
  localStorage.setItem("token", t);
}

export function LogoutUser(t) {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}

export function isLoggedin() {
  const token = getToken();
  return token ? true : false;
}

export function getName() {
  const user = getUser();
  return user && user.FULLNAME;
}
export function getId() {
  const user = getUser();
  return user && user.ID;
}
