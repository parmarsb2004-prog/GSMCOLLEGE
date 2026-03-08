interface Props {
  label?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}

const SectionHeading = ({ label, title, subtitle, light }: Props) => (
  <div className="text-center mb-12">
    {label && (
      <span className="inline-block text-gold font-semibold text-sm tracking-widest uppercase mb-3">
        {label}
      </span>
    )}
    <h2 className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${light ? "text-primary-foreground" : "text-foreground"}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`max-w-2xl mx-auto text-lg ${light ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionHeading;
