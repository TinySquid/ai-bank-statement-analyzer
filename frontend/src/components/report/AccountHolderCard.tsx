import { Card, CardContent, CardHeader } from "../ui/card";

const AccountHolderCard = ({ accountHolderName }: { accountHolderName: string }) => {
  return (
    <Card className="m-4 bg-neutral-800 border-neutral-700 text-white">
      <CardHeader>
        <h2 className="text-2xl font-semibold">Account Holder</h2>
      </CardHeader>
      <CardContent>
        <p className="text-lg">{accountHolderName}</p>
      </CardContent>
    </Card>
  );
};

export default AccountHolderCard;
