---
title: "Team hooks"
source: "https://cal.com/docs/atoms/hooks/team-hooks"
tags: [cal-com, docs]
---
# Team hooks

Copy page

Overview of all the hooks associated with teams.

Copy page

### 
1. `useTeams`

The useTeams returns all teams info. This hook is useful when you need to display or manage a user’s entire collection of teams.Below code snippet shows how to use the useTeams hook to fetch team details.

```
import { useTeams } from "@calcom/atoms";

export default function UserTeams() {
  const { data: teams, isLoading: isLoadingTeams } = useTeams();

  return (
    <>
      {isLoadingTeams && <p>Loading...</p>}
      {!isLoadingTeams && !teams && <p>No teams found</p>}
      {!isLoadingTeams &&
        teams &&
        (Boolean(teams?.length)) &&
        teams?.map((team) => {
            return (
                <div key={team.id}><h1>Team name: {team.name}</h1></div>
            );
       })}
    </>
  );
}
```

Was this page helpful?

Yes No

[[docs-atoms-hooks-event-types-hooks|Event types hooks]][[docs-atoms-hooks-user-hooks|User hooks]]
