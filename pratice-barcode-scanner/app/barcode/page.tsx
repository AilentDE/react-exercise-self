import { Button } from "@/components/ui/button";
import MainCard from "@/components/composite/MainCard";
import Link from "next/link";

const BarcodePage = () => {
  return (
    <MainCard title="scanner type" description="library support booth type now">
      <Button className="w-2/3" disabled>
        {/* <Link href={"/barcode/1d"}>1D barcode</Link> */}
        1D barcode
      </Button>
      <Button className="w-2/3" disabled>
        {/* <Link href={"/barcode/2d"}>2D barcode</Link> */}
        2D barcode
      </Button>
      <Button className="w-2/3" asChild>
        <Link href={"/barcode/mix"}>1D/2D barcode</Link>
      </Button>
    </MainCard>
  );
};

export default BarcodePage;
