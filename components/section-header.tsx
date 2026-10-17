/** Lets a Chinese headline wrap after its full-width punctuation instead of mid-word. */
export function Phrases({ text }: { text: string }) {
  return text.split(/(?<=[，：；])/).map((phrase) => (
    <span key={phrase} className="inline-block">
      {phrase}
    </span>
  ));
}

export function SectionHeader({ heading }: { heading: string }) {
  return (
    <header className="grid gap-4 md:grid-cols-12 md:gap-10">
      <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-snug md:col-span-7">
        <Phrases text={heading} />
      </h2>
    </header>
  );
}
