import Link from "next/link";

export const metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>

      {/* Login form placeholder */}
      <div className="rounded-lg border p-6">
        <p className="text-center text-muted-foreground">
          Login form will be implemented here
        </p>
      </div>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">Don&apos;t have an account? </span>
        <Link href="/register" className="text-primary hover:underline">
          Register
        </Link>
      </div>

      <div className="text-center">
        <Link
          href="/forgot-password"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  );
}
