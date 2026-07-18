import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsString } from "class-validator";

export const APP_PUSH_PLATFORMS = ["IOS", "ANDROID"] as const;
export type AppPushPlatform = (typeof APP_PUSH_PLATFORMS)[number];

export class RegisterAppPushSubscriptionInput {
  @IsString()
  @ApiProperty({ description: "Expo/FCM/APNs push token of the device" })
  token!: string;

  @IsIn(APP_PUSH_PLATFORMS)
  @ApiProperty({ enum: APP_PUSH_PLATFORMS })
  platform!: AppPushPlatform;

  @IsString()
  @ApiProperty({
    description: "Stable device identifier — re-registering the same device replaces its token",
  })
  deviceId!: string;
}

export class DeleteAppPushSubscriptionInput {
  @IsString()
  @ApiProperty({ description: "Push token to unregister" })
  token!: string;
}
