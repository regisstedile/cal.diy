import { SkeletonContainer, SkeletonText } from "@calcom/ui/components/skeleton";

export default function SkeletonLoaderTeamList() {
  return (
    <SkeletonContainer>
      <div className="mb-4 space-y-2">
        <SkeletonText className="h-4 w-full" />
        <SkeletonText className="h-4 w-full" />
        <SkeletonText className="h-4 w-full" />
      </div>
    </SkeletonContainer>
  );
}
