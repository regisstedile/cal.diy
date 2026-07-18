import { ERROR_STATUS, SUCCESS_STATUS } from "@calcom/platform-constants";
import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsInt } from "class-validator";

export class AppPushSubscriptionDataOutput {
  @Expose()
  @IsInt()
  @ApiProperty()
  id!: number;
}

export class RegisterAppPushSubscriptionOutput {
  @ApiProperty({ example: SUCCESS_STATUS, enum: [SUCCESS_STATUS, ERROR_STATUS] })
  status!: typeof SUCCESS_STATUS | typeof ERROR_STATUS;

  @Expose()
  @Type(() => AppPushSubscriptionDataOutput)
  @ApiProperty({ type: AppPushSubscriptionDataOutput })
  data!: AppPushSubscriptionDataOutput;
}

export class DeleteAppPushSubscriptionOutput {
  @ApiProperty({ example: SUCCESS_STATUS, enum: [SUCCESS_STATUS, ERROR_STATUS] })
  status!: typeof SUCCESS_STATUS | typeof ERROR_STATUS;
}
