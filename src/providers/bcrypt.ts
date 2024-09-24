import { Injectable } from "@nestjs/common";
import { genSaltSync, hashSync, compareSync } from "bcrypt";

@Injectable()
export class BcryptService {
  private readonly saltRounds: number = 10;

  public encrypt(plainTextPassword: string): string {
    const salt = genSaltSync(this.saltRounds);
    return hashSync(plainTextPassword, salt);
  }

  public compare(plainTextPassword: string, hash: string): boolean {
    return compareSync(plainTextPassword, hash);
  }
}
