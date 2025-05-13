interface SectionCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const SectionCard = ({ title, description, children }: SectionCardProps) => {
  return (
    <div className="flex flex-col gap-4 border border-white/10 rounded-lg p-4 w-full sm:w-[500px] mx-auto">
      <h2 className="text-2xl font-bold mx-auto mb-1">{title}</h2>
      {description && <p className="text-sm text-gray-500">{description}</p>}
      {children}
    </div>
  );
};

export default SectionCard;
