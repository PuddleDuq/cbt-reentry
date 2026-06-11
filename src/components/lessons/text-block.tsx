interface TextBlockProps {
  body: string;
}

export function TextBlock({ body }: TextBlockProps) {
  return (
    <p className="text-foreground leading-relaxed text-base">
      {body}
    </p>
  );
}
