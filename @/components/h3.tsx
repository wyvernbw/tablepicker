export function H3({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={
        "scroll-m-20 text-2xl font-semibold tracking-tight" + " " + className
      }
    >
      {children}
    </h3>
  );
}
