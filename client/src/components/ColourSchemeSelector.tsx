import { colorSchemes } from "../assets/assets";

const ColourSchemeSelector = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (color: string) => void;
}) => {
  return (
    <div className="space-y-3">
      <label
        htmlFor="color-scheme"
        className="block text-sm font-medium text-zinc-200"
      >
        Colour Scheme
      </label>
      <div className="grid grid-cols-6 gap-3">
        {colorSchemes.map((scheme) => (
          <button
            key={scheme.id}
            onClick={() => onChange(scheme.id)}
            className={`relative border-radius transitions-all ${value === scheme.id ? "border-2 border-blue-500" : "border border-white/10"}`}
            title={scheme.name}
          >
            <div className="flex h-10 rounded-lg overflow-hidden">
              {scheme.colors.map((color, i) => (
                <div
                  key={i}
                  style={{ backgroundColor: color }}
                  className="flex-1"
                />
              ))}
            </div>
          </button>
        ))}
      </div>
      <p className="text-xs text-zinc-400">
        Selected: {colorSchemes.find((scheme) => scheme.id === value)?.name}
      </p>
    </div>
  );
};

export default ColourSchemeSelector;
