import * as React from "react"

export function Button({ className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`rounded-xl px-4 py-2 ${className}`} {...props} />;
}
