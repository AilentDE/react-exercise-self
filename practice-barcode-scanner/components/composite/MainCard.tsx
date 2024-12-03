import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type MainCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const MainCard = ({ title, description, children }: MainCardProps) => {
  return (
    <Card className="flex flex-col min-w-[320px] min-h-[420px] justify-between">
      <CardHeader>
        <CardTitle>
          <h1 className="text-4xl text-center">{title.toUpperCase()}</h1>
        </CardTitle>
        <CardDescription>
          <p className="text-sm text-center">
            {description.toLocaleLowerCase()}
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        {children}
      </CardContent>
      <CardFooter>
        <p className="text-gray-400 text-sm">powered by D.E.</p>
      </CardFooter>
    </Card>
  );
};

export default MainCard;
