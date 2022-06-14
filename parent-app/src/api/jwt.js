const JWT_STORAGE_KEY = 'JWT_STORAGE_KEY'
export function updateJwt(newToken) {
    localStorage.setItem(JWT_STORAGE_KEY, newToken)
}

const JWT_NOT_FOUND = 'not_found'
export function getJwt() {
    return localStorage.getItem(JWT_STORAGE_KEY) ?? JWT_NOT_FOUND
}

export function deleteJwt() {
    localStorage.removeItem(JWT_STORAGE_KEY)
}

export function isJwtStored() {
    return getJwt() == JWT_NOT_FOUND
}
