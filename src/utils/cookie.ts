function setCookie(name: string, value: number | string, maxAge: number) {
  document.cookie = `${name}=${value};max-age=${maxAge}`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=;max-age=0`;
}

function getCookie(name: string) {
  let nameEquals = name + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(nameEquals) === 0) {
      return c.substring(nameEquals.length, c.length);
    }
  }
  return "";
}

export { setCookie, deleteCookie, getCookie };
