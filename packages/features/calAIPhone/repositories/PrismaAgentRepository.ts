import type { PrismaClient } from "@calcom/prisma/client";

type AgentWithPhoneNumbers = {
  id: number;
  providerAgentId: string | null;
  outboundPhoneNumbers: Array<{ id: string; subscriptionStatus: string; phoneNumber: string }>;
} | null;

// Stub: AI Phone agent repository for cal.diy
export class PrismaAgentRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(_id: number): Promise<null> {
    return null;
  }

  async findAgentWithPhoneNumbers(_id: string | number | undefined): Promise<AgentWithPhoneNumbers> {
    return null;
  }

  async findProviderAgentIdById(_id: string | number): Promise<{ providerAgentId: string | null } | null> {
    return null;
  }
}
