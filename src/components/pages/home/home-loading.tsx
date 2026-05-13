export function HomeLoading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Loading...</p>
      </div>
    </div>
  );
}
