interface TipBlockProps {
  body: string;
}

export function TipBlock({ body }: TipBlockProps) {
  return (
    <div className="bg-primary-light/10 border-l-4 border-primary rounded-r-lg p-4">
      <p className="text-foreground text-sm leading-relaxed">
        <span aria-hidden="true">💡</span>{" "}
        <span className="font-semibold">Tip:</span>{" "}
        {body}
      </p>
    </div>
  );
}
