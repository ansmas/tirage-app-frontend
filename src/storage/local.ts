const TOKEN_KEY = "tirage_token";
const SESSION_KEY = "tirage_session";

export function saveToken(token: string) {
     localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
     return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
     localStorage.removeItem(TOKEN_KEY);
}

export function saveSessionCode(code: string){
     localStorage.setItem(SESSION_KEY, code);
}

export function getSessionCode(): string | null {
     return localStorage.getItem(SESSION_KEY);
}

export function clearSession() {
     localStorage.removeItem(SESSION_KEY);
}