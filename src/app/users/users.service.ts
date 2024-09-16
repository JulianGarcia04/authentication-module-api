import type { DocumentData, Query } from "@google-cloud/firestore";
import { Firestore } from "@google-cloud/firestore";
import { Inject, Injectable } from "@nestjs/common";
import type { UserDto, UpdateUserDto, FindUsersDto } from "./users.schema";

@Injectable()
export class UsersService {
  public constructor(@Inject("FIRESTORE_CONNECTION") private readonly db: Firestore) {}

  public async find(
    filters?: FindUsersDto,
  ): Promise<{ exists: boolean; data: DocumentData; id: string }[]> {
    let userCollectionRef: Query<DocumentData, DocumentData> = this.db.collection("users");

    Object.entries(filters ?? {}).forEach(([key, val]) => {
      userCollectionRef = userCollectionRef.where(key, "==", val);
    });

    const userListSnap = await userCollectionRef.get();

    const list = userListSnap.docs.map((doc) => {
      return { exists: doc.exists, data: doc.data(), id: doc.id };
    });

    return list;
  }

  public async findById(
    userID: string,
  ): Promise<{ exists: boolean; data?: DocumentData; id: string }> {
    const userDocumentRef = this.db.doc(`users/${userID}`);

    const userDocument = await userDocumentRef.get();

    return { exists: userDocument.exists, data: userDocument.data(), id: userDocument.id };
  }

  public async create(data: UserDto): Promise<{ id: string }> {
    return this.db.collection("users").add(data);
  }

  public async update(userID: string, data: UpdateUserDto): Promise<void> {
    await this.db.doc(`users/${userID}`).set(data, { merge: true });
  }
}
