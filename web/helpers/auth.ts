export const setToken = (value: string) => {
  //document.cookie = `authToken=${value}; Secure; HttpOnly`;'
  document.cookie = `authToken=${value}; HttpOnly`;
  console.log("<< setToken", document.cookie);
};

export const getToken = (): string | undefined => {
  console.log(">> getToken", document.cookie);

  const value = "; " + document.cookie;
  const parts = value.split("; authToken=");

  if (parts.length == 2) {
    return !parts ? "" : parts.pop()?.split(";").shift();
  }
};
