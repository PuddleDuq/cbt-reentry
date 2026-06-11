interface ExampleBlockProps {
  title: string;
  body: string;
}

export function ExampleBlock({ title, body }: ExampleBlockProps) {
  return (
    <div className="bg-secondary-light/40 border-l-4 border-secondary rounded-r-lg p-4">
      <div className="flex items-start gap-2">
        <span aria-hidden="true" className="text-lg leading-none mt-0.5">📋</span>
        <div>
          <p className="font-semibold text-foreground text-sm">{title}</p>
          <p className="text-foreground/80 text-sm mt-1 leading-relaxed">{body}</p>
        </div>
      </div>
    </div>
  );
}
