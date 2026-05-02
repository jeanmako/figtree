export const PASSWORD_RESET_TOKEN_EXPIRY = 1 * 60 * 60 // 1 hour

export const MAX_LOGIN_ATTEMPTS = 10

export const TOTP_EXPIRY_IN = 45 // 45 seconds - longer than the default 30 seconds to give users more time to enter the code
export const TOTP_CODE_LENGTH = 6
export const BACKUP_CODE_AMOUNT = 5
export const BACKUP_CODE_LENGTH = 10
