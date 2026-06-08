export function BufferingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
      <div className="relative w-12 h-12">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-white/20 rounded-full animate-spin border-t-white" />
      </div>
    </div>
  );
}
