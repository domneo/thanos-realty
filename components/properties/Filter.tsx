export interface FilterProps {
  label: string;
  options: {
    label: string;
    value: string;
  }[];
  selected?: string;
  onSelectChange?: (value: string) => void;
}

export const Filter = ({
  label,
  options,
  selected,
  onSelectChange,
}: FilterProps) => {
  return (
    <>
      <label
        className="form-label fw-bold mb-3"
        htmlFor={label.toLocaleLowerCase().replace(/\s/g, "")}
      >
        {label}
      </label>
      <select
        id={label.toLocaleLowerCase().replace(/\s/g, "")}
        className="form-select form-select-lg mb-4"
        aria-label={label}
        value={selected}
        onChange={(e) =>
          onSelectChange ? onSelectChange(e.target.value) : null
        }
      >
        <option value="all">All</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};
