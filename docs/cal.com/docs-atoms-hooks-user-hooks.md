---
title: "User hooks"
source: "https://cal.com/docs/atoms/hooks/user-hooks"
tags: [cal-com, docs]
---
# User hooks

Copy page

Overview of all the hooks associated with users.

Copy page

### 
1. `useMe`

The useMe returns the current user’s info. This hook is useful when you need to display a user’s details.Below code snippet shows how to use the useMe hook to fetch user details.

```
import { useMe } from "@calcom/atoms";

export default function UserDetails() {
  const { data: userData, isLoading: isLoadingUser } = useMe();

  return (
    <>
      {isLoadingUser && <p>Loading...</p>}
      {!isLoadingUser && !userData && <p>No user found</p>}
      {!isLoadingUser &&
        !!userData &&
        return (
          <div>Username: {userData.username}</div>
        )
      }
    </>
  );
}
```

Was this page helpful?

Yes No

[[docs-atoms-hooks-team-hooks|Team hooks]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)
