type Props = {
  className?: string;
  children: string | JSX.Element | JSX.Element[];
};

export function H1({ className, children }: Props) {
  return (
    <h1
      className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl${className ? ` ${className}` : ""}`}
    >
      {children}
    </h1>
  );
}

export function H2({ className, children }: Props) {
  return (
    <h2
      className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0${className ? ` ${className}` : ""}`}
    >
      {children}
    </h2>
  );
}

export function H3({ className, children }: Props) {
  return (
    <h3
      className={`scroll-m-20 text-2xl font-semibold tracking-tight${className ? ` ${className}` : ""}`}
    >
      {children}
    </h3>
  );
}

export function H4({ className, children }: Props) {
  return (
    <h4
      className={`scroll-m-20 text-xl font-semibold tracking-tight${className ? ` ${className}` : ""}`}
    >
      {children}
    </h4>
  );
}

export function P({ className, children }: Props) {
  return (
    <p
      className={`leading-7 [&:not(:first-child)]:mt-6${className ? ` ${className}` : ""}`}
    >
      {children}
    </p>
  );
}

export function Blockquote({ className, children }: Props) {
  return (
    <blockquote
      className={`mt-6 border-l-2 pl-6 italic${className ? ` ${className}` : ""}`}
    >
      {children}
    </blockquote>
  );
}

export function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export function Lead({ className, children }: Props) {
  return (
    <p
      className={`text-xl text-muted-foreground${className ? ` ${className}` : ""}`}
    >
      {children}
    </p>
  );
}

export function Large({ className, children }: Props) {
  return (
    <div className={`text-lg font-semibold${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
}

export function Small({ className, children }: Props) {
  return (
    <small
      className={`text-sm font-medium leading-none${className ? ` ${className}` : ""}`}
    >
      {children}
    </small>
  );
}

export function Muted({ className, children }: Props) {
  return (
    <p
      className={`text-sm text-muted-foreground${className ? ` ${className}` : ""}`}
    >
      {children}
    </p>
  );
}
