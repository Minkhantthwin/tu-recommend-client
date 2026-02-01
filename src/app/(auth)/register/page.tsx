import Link from "next/link";

export const metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground">
          Enter your details to create your account
        </p>
      </div>

      {/* Register form placeholder */}
      <div className="rounded-lg border p-6">
        <p className="text-center text-muted-foreground">
          Registration form will be implemented here
        </p>
      </div>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">Already have an account? </span>
        <Link href="/login" className="text-primary hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}
