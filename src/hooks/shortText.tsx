interface ShortTextProps {
  text: string;
  startChars: number;
  endChars: number;
}

const ShortText = ({ text, startChars, endChars }: ShortTextProps) => {
  if (text.length <= startChars + endChars) {
    return <span>{text}</span>;
  }

  const start = text.slice(0, startChars);
  const end = text.slice(-endChars);
  return <span>{start}...{end}</span>;
};

export default ShortText;