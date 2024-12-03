import ScannerMix from "@/components/scanner/ScannerContainer";
import MainCard from "@/components/composite/MainCard";

const getSlug = async (params: Promise<{ scanType: string }>) => {
  let slug = (await params).scanType;
  // if (slug !== "2d") {
  //   slug = "1d";
  // }
  slug = "mix";
  return slug;
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ scanType: string }>;
}) => {
  const slug = await getSlug(params);

  return {
    title: `${slug.toUpperCase()} Scanner`,
  };
};

const scannerPage = async ({
  params,
}: {
  params: Promise<{ scanType: string }>;
}) => {
  const slug = await getSlug(params);

  return (
    <MainCard title={`${slug} scanner`} description="scan barcode or QR code">
      <ScannerMix />
    </MainCard>
  );
};

export default scannerPage;
