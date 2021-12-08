import getAbsoluteURL from "./getAbsoluteURL"

export const requireAuth = async (magicCode, req) => {
    const endpoint = getAbsoluteURL(
        "/api/guest-login?from=requireAuth", req
    );
    const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({magicCode})
    });
    return await response.json();
}