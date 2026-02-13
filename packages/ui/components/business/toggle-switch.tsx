export function ToggleSwitch({ checked }: { checked: boolean }) {
  return (
    <div
      className={`w-12 h-6 rounded-full transition-colors cursor-pointer relative ${
        checked ? "bg-emerald-500" : "bg-gray-300"
      }`}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
          checked ? "translate-x-6" : "translate-x-0.5"
        }`}
      />
    </div>
  );
}
