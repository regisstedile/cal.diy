import type { ChangeEvent, ReactNode } from "react";

export const TeamsFilter = () => null;

type FilterCheckboxFieldProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  icon?: ReactNode;
  testId?: string;
};

export const FilterCheckboxField = ({ id, label, checked, onChange, icon, testId }: FilterCheckboxFieldProps) => (
  <div className="flex items-center gap-2 px-3 py-2" data-testid={testId}>
    <input id={id} type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 rounded" />
    {icon}
    <label htmlFor={id} className="text-sm cursor-pointer select-none">
      {label}
    </label>
  </div>
);

export const FilterCheckboxFieldsContainer = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col">{children}</div>
);
