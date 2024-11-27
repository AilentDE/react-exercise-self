const ImageCard = ({
  title,
  photoUrl,
  size,
  children,
}: {
  title: string;
  photoUrl?: string;
  size?: number;
  children?: React.ReactNode;
}) => (
  <div className="flex flex-col p-4 space-y-2 border border-white rounded-md justify-between items-center">
    <h2 className="text-center text-2xl font-bold">{title}</h2>
    {photoUrl && (
      <img
        src={photoUrl}
        alt="Uploaded"
        // className="w-64 h-64 object-cover"
      />
    )}
    {size && <p className="text-center text-lg">{size} bytes</p>}
    {children}
  </div>
);

export default ImageCard;
