import {jwtDecode} from "jwt-decode";

export const decodeJwt =(token)=>{
    const decodedJwt = jwtDecode(token)
// decode header by passing in options (useful for when you need `kid` to verify a JWT):
    const decodedHeader = jwtDecode(token, { header: true });
    return decodedJwt
}

export const isTokenValid = (token) => {
    if(token === '') return false
    const decoded = jwtDecode(token);

    if(Date.now() >= decoded.exp * 1000) {
        console.log("Token expired!")
        return false
    }
    return true
}

export const redirectToUserPage = (location, navigate, roles) => {
  let from = location.state?.from?.pathname || ""
  
    if (isTokenValid(localStorage.getItem("signature"))) {
      if (roles === "USER_DELETE,USER_EDIT,USER_READ") {
        from = from || "/admin";
      } else if (roles === "USER_EDIT,USER_READ") {
        from = from || "/";
      }
    } else {
      from = from || "/login";
    }

    navigate(from, { replace: true });

  };


