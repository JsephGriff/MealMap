import * as React from "react"

export function Select({ children, onValueChange, defaultValue }: any) {
  return <select onChange={(e) => onValueChange(e.target.value)} defaultValue={defaultValue} className="border rounded-lg px-3 py-2 w-full">{children}</select>;
}

export function SelectTrigger({ children, className = '' }: any) {
  return <div className={`mb-2 ${className}`}>{children}</div>;
}

export function SelectValue({ placeholder }: any) {
  return <option disabled>{placeholder}</option>;
}

export function SelectContent({ children }: any) {
  return <>{children}</>;
}

export function SelectItem({ value, children }: any) {
  return <option value={value}>{children}</option>;
}
