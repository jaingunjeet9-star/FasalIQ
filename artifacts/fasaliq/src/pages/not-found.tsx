export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 bg-card border border-border rounded-full flex items-center justify-center mb-6 shadow-sm">
        <span className="font-serif text-3xl text-muted-foreground">?</span>
      </div>
      <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Field Not Found</h1>
      <p className="text-foreground/70 max-w-md mx-auto mb-8 font-medium">
        We couldn't locate this page. It might have been moved or doesn't exist in the current season.
      </p>
      <button 
        onClick={() => window.history.back()}
        className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium"
      >
        Return to Safety
      </button>
    </div>
  );
}
