import { Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";

@Injectable()
export class BcryptService {
  private readonly saltRounds: number = 10;

  public encrypt(plainTextPassword: string): string {
    const salt = bcrypt.genSaltSync(this.saltRounds);

    return bcrypt.hashSync(plainTextPassword, salt);
  }

  public compare(plainTextPassword: string, hash: string): boolean {
    return bcrypt.compareSync(plainTextPassword, hash);
  }
}
