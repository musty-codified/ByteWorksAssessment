import {jwtDecode} from "jwt-decode";


export const decodeJwt =(token)=>{
    const decodedJwt = jwtDecode(token)
    console.log(decodeJwt.toString)

    /* prints:
   /* {
        "sub": "ilemonamustapha@gmail.com",
        "roles": "USER_EDIT,USER_READ",
        "exp": 1701751692,
        "userId": "usr61760044557440",
        "iat": 1701715692
      } */

// decode header by passing in options (useful for when you need `kid` to verify a JWT):
    const decodedHeader = jwtDecode(token, { header: true });
    console.log(decodedHeader)

    return decodedJwt

    /* prints:
 * { typ: "JWT",
 *   alg: "HS256" }
 */
   
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

export const redirectToUserPage =(location, navigate, roles)=>{
    let from = location.state?.from?.pathname

    if(isTokenValid(localStorage.getItem("signature"))){
        if(roles==="USER_DELETE,USER_EDIT,USER_READ")
        from = location.state?.from?.pathname || "/admin"
    else if (roles === "USER_EDIT,USER_READ")
    from = location.state?.from?.pathname || "/"

    } else {
        from = location.state?.from?.pathname || "/login"
    }
    navigate(from, { replace: true })

}

// export const redirectToUserPage =(roles)=>{

//     if(isTokenValid(localStorage.getItem("signature"))){
//         if(roles==="USER_EDIT, USER_READ, USER_DELETE")
//         window.location.href = "/admin"
//     else if (roles === "USER_EDIT, USER_READ")

//     window.location.href = "/"

//     } else {
//         window.location.href = "/login"
//     }

//     // navigate(from, { replace: true })

// }

