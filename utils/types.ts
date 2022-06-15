export interface GenerateAccessTokenTypes {
    (id: number, login: string): string 
}
export interface GenerateRefreshTokenTypes {
    (id: string): string 
}
export interface PayloadTokenTypes {
    id: number,
    login: string
}