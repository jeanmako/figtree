export type AuthErrorCode =
  | "NO_CREDENTIALS"
  | "INVALID_CREDENTIALS"
  | "EXCEEDED_LOGIN_ATTEMPTS"
  | "TOO_MANY_LOGIN_ATTEMPTS"
  | "EMAIL_NOT_VERIFIED"
  | "OAUTH_CALLBACK_ERROR"
  | "OAUTH_SIGNIN_ERROR"
  | "OAUTH_PROCESSING_ERROR"
  | "NETWORK_ERROR"
  | "UNKNOWN";

export type ErrorDisplayType = "inline" | "toast";

// TODO: Make sure to include Better Auth errors too

export interface AuthError {
  code: AuthErrorCode;
  message: string;
  display: ErrorDisplayType;
  field?: "email" | "password" | "otp";
  retryable?: boolean;
}

export const authErrorMap: Record<AuthErrorCode, AuthError> = {
  NO_CREDENTIALS: {
    code: "NO_CREDENTIALS",
    message: "Please provide an email and password.",
    display: "inline",
    field: "email",
  },

  INVALID_CREDENTIALS: {
    code: "INVALID_CREDENTIALS",
    message: "Email or password is incorrect.",
    display: "inline",
    field: "password",
  },

  EXCEEDED_LOGIN_ATTEMPTS: {
    code: "EXCEEDED_LOGIN_ATTEMPTS",
    message: "Account locked due to too many attempts. Contact support.",
    display: "toast",
  },

  TOO_MANY_LOGIN_ATTEMPTS: {
    code: "TOO_MANY_LOGIN_ATTEMPTS",
    message: "Too many attempts. Please try again later.",
    display: "toast",
    retryable: true,
  },

  EMAIL_NOT_VERIFIED: {
    code: "EMAIL_NOT_VERIFIED",
    message: "Please verify your email address.",
    display: "inline",
    field: "email",
  },

  OAUTH_PROCESSING_ERROR: {
    code: "OAUTH_PROCESSING_ERROR",
    message:
      "We encountered an issue processing your request. Please try again.",
    display: "toast",
  },

  OAUTH_SIGNIN_ERROR: {
    code: "OAUTH_SIGNIN_ERROR",
    message: "There was an issue signing you in. Check provider settings.",
    display: "toast",
  },

  OAUTH_CALLBACK_ERROR: {
    code: "OAUTH_CALLBACK_ERROR",
    message: "Problem processing OAuth response. Please try again.",
    display: "toast",
  },

  NETWORK_ERROR: {
    code: "NETWORK_ERROR",
    message: "Network error. Check your connection.",
    display: "toast",
    retryable: true,
  },

  UNKNOWN: {
    code: "UNKNOWN",
    message: "Something went wrong. Please try again.",
    display: "toast",
  },
};

// Errors coming from the Better Auth

const errorCodeMap: Record<string, AuthErrorCode> = {
  "no-credentials": "NO_CREDENTIALS",
  "invalid-credentials": "INVALID_CREDENTIALS",
  "exceeded-login-attempts": "EXCEEDED_LOGIN_ATTEMPTS",
  "too-many-login-attempts": "TOO_MANY_LOGIN_ATTEMPTS",
  "email-not-verified": "EMAIL_NOT_VERIFIED",
  Callback: "OAUTH_PROCESSING_ERROR",
  OAuthSignin: "OAUTH_SIGNIN_ERROR",
  OAuthCallback: "OAUTH_CALLBACK_ERROR",
};

export function mapToAuthError(err: unknown) {
  if (typeof err === "string") {
    const mapped = errorCodeMap[err];
    return authErrorMap[mapped ?? "UNKNOWN"];
  }

  if (typeof err === "object" && err !== null && "code" in err) {
    const raw = (err as any).code;
    const mapped = errorCodeMap[raw];
    return authErrorMap[mapped ?? "UNKNOWN"];
  }

  return authErrorMap.UNKNOWN;
}
/*
export enum ErrorCode {
  IncorrectEmailPassword = "incorrect-email-password",
  UserNotFound = "user-not-found",
  IncorrectPassword = "incorrect-password",
  UserMissingPassword = "missing-password",
  TwoFactorDisabled = "two-factor-disabled",
  TwoFactorAlreadyEnabled = "two-factor-already-enabled",
  TwoFactorSetupRequired = "two-factor-setup-required",
  SecondFactorRequired = "second-factor-required",
  IncorrectTwoFactorCode = "incorrect-two-factor-code",
  IncorrectBackupCode = "incorrect-backup-code",
  MissingBackupCodes = "missing-backup-codes",
  IncorrectEmailVerificationCode = "incorrect_email_verification_code",
  InternalServerError = "internal-server-error",
  NewPasswordMatchesOld = "new-password-matches-old",
  ThirdPartyIdentityProviderEnabled = "third-party-identity-provider-enabled",
  RateLimitExceeded = "rate-limit-exceeded",
  SocialIdentityProviderRequired = "social-identity-provider-required",
  UserAccountLocked = "user-account-locked",
}

Here’s a **complete, clean, production-ready version** of the architecture we discussed—split by domain, but still easy to use via one resolver + one hook.

This avoids the “giant auth dump” problem and keeps login/signup scalable without extra libraries.

---

# 🧱 1. Shared types (`auth-errors.types.ts`)

```ts id="types_1"
export type ErrorDisplayType = "inline" | "toast";

export interface AuthError {
  code: string;
  message: string;
  display: ErrorDisplayType;
  field?: "email" | "password" | "otp" | "username" | "terms";
  retryable?: boolean;
}
```

---

# 🌐 2. Shared errors (`auth-errors.shared.ts`)

```ts id="shared_1"
import { AuthError } from "./auth-errors.types";

export const sharedAuthErrorMap = {
  NETWORK_ERROR: {
    code: "NETWORK_ERROR",
    message: "Network error. Check your connection.",
    display: "toast",
    retryable: true,
  },
  OAUTH_FAILED: {
    code: "OAUTH_FAILED",
    message: "Social login failed. Try again.",
    display: "toast",
  },
  OAUTH_CALLBACK_ERROR: {
    code: "OAUTH_CALLBACK_ERROR",
    message: "OAuth login failed. Please retry.",
    display: "toast",
  },
  UNKNOWN: {
    code: "UNKNOWN",
    message: "Something went wrong. Please try again.",
    display: "toast",
  },
} satisfies Record<string, AuthError>;
```

---

# 🔐 3. Login errors (`auth-errors.login.ts`)

```ts id="login_1"
import { AuthError } from "./auth-errors.types";

export const loginErrorMap = {
  INVALID_CREDENTIALS: {
    code: "INVALID_CREDENTIALS",
    message: "Email or password is incorrect.",
    display: "inline",
    field: "password",
  },
  EMAIL_NOT_VERIFIED: {
    code: "EMAIL_NOT_VERIFIED",
    message: "Please verify your email address.",
    display: "inline",
    field: "email",
  },
  EXCEEDED_LOGIN_ATTEMPTS: {
    code: "EXCEEDED_LOGIN_ATTEMPTS",
    message:
      "Account locked due to too many attempts. Contact support.",
    display: "toast",
  },
} satisfies Record<string, AuthError>;
```

---

# 🆕 4. Signup errors (`auth-errors.signup.ts`)

```ts id="signup_1"
import { AuthError } from "./auth-errors.types";

export const signupErrorMap = {
  EMAIL_ALREADY_EXISTS: {
    code: "EMAIL_ALREADY_EXISTS",
    message: "This email is already registered.",
    display: "inline",
    field: "email",
  },
  USERNAME_TAKEN: {
    code: "USERNAME_TAKEN",
    message: "This username is already taken.",
    display: "inline",
    field: "username",
  },
  WEAK_PASSWORD: {
    code: "WEAK_PASSWORD",
    message: "Password is too weak.",
    display: "inline",
    field: "password",
  },
  TERMS_NOT_ACCEPTED: {
    code: "TERMS_NOT_ACCEPTED",
    message: "You must accept the terms.",
    display: "inline",
    field: "terms",
  },
} satisfies Record<string, AuthError>;
```

---

# 🔗 5. Unified error resolver (`auth-errors.resolve.ts`)

This is the only function your UI ever needs.

```ts id="resolve_1"
import { sharedAuthErrorMap } from "./auth-errors.shared";
import { loginErrorMap } from "./auth-errors.login";
import { signupErrorMap } from "./auth-errors.signup";
import { AuthError } from "./auth-errors.types";

export type AuthErrorCode =
  | keyof typeof sharedAuthErrorMap
  | keyof typeof loginErrorMap
  | keyof typeof signupErrorMap;

export function resolveAuthError(code: AuthErrorCode): AuthError {
  return (
    loginErrorMap[code as keyof typeof loginErrorMap] ||
    signupErrorMap[code as keyof typeof signupErrorMap] ||
    sharedAuthErrorMap[code as keyof typeof sharedAuthErrorMap] ||
    sharedAuthErrorMap.UNKNOWN
  );
}
```

---

# 🧪 6. Normalize backend / string errors

```ts id="normalize_1"
import { resolveAuthError, AuthErrorCode } from "./auth-errors.resolve";

const backendErrorMap: Record<string, AuthErrorCode> = {
  "invalid-credentials": "INVALID_CREDENTIALS",
  "no-credentials": "INVALID_CREDENTIALS",
  "email-not-verified": "EMAIL_NOT_VERIFIED",
  "exceeded-login-attempts": "EXCEEDED_LOGIN_ATTEMPTS",

  OAuthSignin: "OAUTH_FAILED",
  OAuthCallback: "OAUTH_CALLBACK_ERROR",

  "email-exists": "EMAIL_ALREADY_EXISTS",
  "username-taken": "USERNAME_TAKEN",
};

export function mapToAuthError(err: unknown) {
  if (typeof err === "string") {
    const mapped = backendErrorMap[err];
    return resolveAuthError(mapped ?? "UNKNOWN");
  }

  if (typeof err === "object" && err !== null && "code" in err) {
    const raw = (err as any).code;
    const mapped = backendErrorMap[raw];
    return resolveAuthError(mapped ?? "UNKNOWN");
  }

  return resolveAuthError("UNKNOWN");
}
```

---

# 🪝 7. Shared hook (`use-auth-error.ts`)

```ts id="hook_1"
"use client";

import { useState } from "react";
import { toastManager } from "@figtree/ui/components/toast";
import { AuthError } from "./auth-errors.types";
import { mapToAuthError } from "./auth-errors.normalize";

export function useAuthError() {
  const [error, setError] = useState<AuthError | null>(null);

  function handleError(err: unknown) {
    const parsed = mapToAuthError(err);

    if (parsed.display === "inline") {
      setError(parsed);
    } else {
      toastManager.add({ title: parsed.message });
    }
  }

  function clearError() {
    setError(null);
  }

  return {
    error,
    handleError,
    clearError,
  };
}
```

---

# ✉️ 8. Example: Login form usage

```tsx id="login_example"
import { useAuthError } from "./use-auth-error";

export function LoginForm() {
  const { error, handleError, clearError } = useAuthError();

  async function onSubmit(values: any) {
    clearError();

    try {
      await login(values);
    } catch (err) {
      handleError(err);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input name="email" />
      <input name="password" type="password" />

      {error?.field === "password" && (
        <p className="text-red-500">{error.message}</p>
      )}

      <button type="submit">Login</button>
    </form>
  );
}
```

---

# 🆕 9. Example: Signup form usage

```tsx id="signup_example"
import { useAuthError } from "./use-auth-error";

export function SignupForm() {
  const { error, handleError, clearError } = useAuthError();

  async function onSubmit(values: any) {
    clearError();

    try {
      await signup(values);
    } catch (err) {
      handleError(err);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input name="email" />
      <input name="username" />
      <input name="password" type="password" />

      {error?.field === "email" && (
        <p className="text-red-500">{error.message}</p>
      )}

      {error?.field === "username" && (
        <p className="text-red-500">{error.message}</p>
      )}

      <button type="submit">Sign up</button>
    </form>
  );
}
```

---

# 🧠 What you now have (this is the important part)

### ✔ Clean separation

* login errors
* signup errors
* shared infrastructure errors

### ✔ One resolver

No scattered mapping logic anywhere else

### ✔ One hook

Consistent UX pattern across all auth flows

### ✔ No global state explosion

Each form owns its own error state

---

# ⚖️ Why this scales well

When you add:

* magic links
* MFA
* password reset
* social login providers

You only:

* add new error codes
* drop them into the correct map

Nothing else changes.

---

If you want next-level refinement, I can show you how to evolve this into a **fully type-safe backend ↔ frontend contract using Zod + inferred error unions**, which removes string errors entirely.

*/
