interface TagFilterProps {
  selectedTag: string;
  onTagChange: (tag: string) => void;
}

export function TagFilter({ selectedTag, onTagChange }: TagFilterProps) {
  const tags = [
    { value: "all", label: "All" },
    { value: "personal", label: "Personal" },
    { value: "startup", label: "Startup" },
    { value: "technology", label: "Technology" },
  ];

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="text-gray-600">Filter by:</span>
        {tags.map((tag, index) => (
          <div key={tag.value} className="flex items-center gap-2">
            <button
              onClick={() => onTagChange(tag.value)}
              className={`hover:underline ${
                selectedTag === tag.value
                  ? "text-black font-medium"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {tag.label}
            </button>
            {index < tags.length - 1 && (
              <span className="text-gray-400">|</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
