import type { Category } from "../../types";

type CategoryBarProps = {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  productCounts: Record<string, number>;
};

export function CategoryBar({ categories, activeCategory, onCategoryChange, productCounts }: CategoryBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        const count = productCounts[cat.id] ?? 0;
        return (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`flex items-center gap-2 px-4 h-[var(--size-touch-sm)] rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              isActive
                ? "bg-primary-600 text-white shadow-md scale-[1.02]"
                : "bg-surface border border-border text-text-secondary hover:bg-surface-secondary hover:border-border-strong"
            }`}
          >
            <span className="text-base">{cat.icon}</span>
            <span>{cat.name}</span>
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${
                isActive ? "bg-white/20" : "bg-surface-secondary text-text-muted"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}