import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Twilio } from "twilio";
import type { VerificationInstance } from "twilio/lib/rest/verify/v2/service/verification";
import type { VerificationCheckInstance } from "twilio/lib/rest/verify/v2/service/verificationCheck";

@Injectable()
export class TwilioService {
  public readonly client: Twilio = new Twilio(
    this.configService.get<string>("TWILIO_ACCOUNT_SID"),
    this.configService.get<string>("TWILIO_AUTH_TOKEN"),
    {
      accountSid: this.configService.get<string>("TWILIO_ACCOUNT_SID"),
    },
  );

  public constructor(private readonly configService: ConfigService) {}

  public async sendVerifyToken(phone: string): Promise<VerificationInstance> {
    return this.client.verify.v2
      .services(this.configService.get<string>("TWILIO_VERIFY_SERVICE") ?? "")
      .verifications.create({
        to: phone,
        channel: "sms",
      });
  }

  public async verifyCodeSent(phone: string, code: string): Promise<VerificationCheckInstance> {
    return this.client.verify.v2
      .services(this.configService.get<string>("TWILIO_VERIFY_SERVICE") ?? "")
      .verificationChecks.create({
        to: phone,
        code: code,
      });
  }
}
