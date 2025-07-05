function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="min-h-dvh flex items-center justify-center">{children}</div>;
}

export default AuthLayout;
