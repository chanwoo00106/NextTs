import Header from "@/components/auth/Header";
import BackButton from "@/components/auth/BackButton";
import { Card, CardHeader } from "../ui/card";

const ErrorCard = () => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label="Oops! Something went wrong!" />
      </CardHeader>
      <BackButton label="Back to login" href="/auth/login" />
    </Card>
  );
};

export default ErrorCard;
