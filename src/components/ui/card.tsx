import * as React from "react"

export function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl shadow-md border p-4 bg-white">{children}</div>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
