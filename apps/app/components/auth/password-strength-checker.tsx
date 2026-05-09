/* eslint-disable no-useless-escape */
export type PasswordStrengthCheckerProps = {
  password: string
}

const PasswordStrengthChecker = ({
  password,
}: PasswordStrengthCheckerProps) => {
  const isTenCharactersLong = password.length >= 10
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};`':"\\|,.<>\/?]/.test(
    password
  )

  return (
    <div className="tracking-snug flex flex-wrap items-center gap-x-2 text-xs font-medium">
      <PasswordCondition title="Uppercase letter" isMet={hasUppercase} />
      <PasswordCondition title="Lowercase letter" isMet={hasLowercase} />
      <PasswordCondition title="Number" isMet={hasNumber} />
      <PasswordCondition
        title="Special chararacter"
        isMet={hasSpecialCharacter}
      />
      <PasswordCondition title="10+ characters" isMet={isTenCharactersLong} />
      {password.length > 72 && (
        <PasswordCondition title="72 characters or less" isMet={false} />
      )}
    </div>
  )
}

export default PasswordStrengthChecker

type PasswordConditionProps = {
  title: string
  isMet: boolean
}

const PasswordCondition = ({ title, isMet }: PasswordConditionProps) => {
  return (
    <div
      className={
        "flex items-center gap-1 transition duration-200 " +
        (isMet ? "text-accent-foreground" : "text-quiet")
      }
    >
      {isMet ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-success h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
          />
        </svg>
      )}

      <p className="text-tiny">{title}</p>
    </div>
  )
}
