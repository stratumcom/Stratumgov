export function FormField({
  label,
  id,
  error,
  optional,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2.5 block text-base font-medium">
        {label}
        {optional ? (
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            (optional)
          </span>
        ) : (
          <span className="ml-1 text-highlight" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 text-sm text-error"
        >
          {error}
        </p>
      )}
    </div>
  );
}
