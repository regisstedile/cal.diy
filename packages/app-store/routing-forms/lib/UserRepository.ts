export const UserRepository = {
  async enrichUserWithItsProfile<T extends { id: number }>({
    user,
  }: {
    user: T;
  }): Promise<T & { nonProfileUsername: null; profile: { organization: { slug: string | null; requestedSlug: string | null } | null } }> {
    return { ...user, nonProfileUsername: null, profile: { organization: null } };
  },
};
