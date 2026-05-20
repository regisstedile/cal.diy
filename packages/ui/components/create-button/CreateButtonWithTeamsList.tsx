import { Button } from "../button";

type CreateButtonWithTeamsListProps = {
  subtitle?: string;
  createFunction: (teamId?: number) => void;
  [key: string]: unknown;
};

export function CreateButtonWithTeamsList({ createFunction, subtitle: _subtitle, ...rest }: CreateButtonWithTeamsListProps) {
  return (
    <Button onClick={() => createFunction()} {...rest}>
      Create
    </Button>
  );
}
