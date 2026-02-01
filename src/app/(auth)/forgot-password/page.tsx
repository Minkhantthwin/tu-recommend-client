import Link from "next/link";

export const metadata = {
  title: "Forgot Password",
};

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Forgot your password?</h1>
        <p className="text-muted-foreground">
          Enter your email and we&apos;ll send you a reset link
        </p>
      </div>

      {/* Forgot password form placeholder */}
      <div className="rounded-lg border p-6">
        <p className="text-center text-muted-foreground">
          Forgot password form will be implemented here
        </p>
      </div>

      <div className="text-center text-sm">
        <Link href="/login" className="text-primary hover:underline">
          Back to login
        </Link>
      </div>
    </div>
  );
}
