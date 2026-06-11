interface KeyPointBlockProps {
  body: string;
}

export function KeyPointBlock({ body }: KeyPointBlockProps) {
  return (
    <div className="bg-accent/10 border-l-4 border-accent rounded-r-lg p-4">
      <p className="text-foreground text-sm leading-relaxed">
        <span aria-hidden="true">⭐</span>{" "}
        <span className="font-semibold">Key Point:</span>{" "}
        <span className="font-medium">{body}</span>
      </p>
    </div>
  );
}
