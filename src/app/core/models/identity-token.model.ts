export interface IdentityToken {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    token_type: string;
    expires_at?: Date;
}
