import { SearchInput } from "@restaurant/ui";

type QuickSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function QuickSearchBar({ value, onChange }: QuickSearchBarProps) {
  return (
    <SearchInput
      value={value}
      onChange={onChange}
      placeholder="Buscar producto..."
      debounceMs={200}
    />
  );
}