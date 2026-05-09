import { LoginProvider } from "@/modules/auth/login/components/login-context"
import { LoginPageClient } from "@/modules/auth/login/page-client"

const LoginPage = () => {
  return (
    <LoginProvider initialValues={{ email: "", password: "" }}>
      <div className="flex w-full flex-1 flex-col justify-center">
        <LoginPageClient />
      </div>
    </LoginProvider>
  )
}

export default LoginPage
