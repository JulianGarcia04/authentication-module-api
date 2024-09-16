import { Firestore } from "@google-cloud/firestore";

export const databaseProviders = [
  {
    provide: "FIRESTORE_CONNECTION",
    useFactory: (): Firestore => {
      try {
        const db = new Firestore(
          process.env.NODE_ENV === "production"
            ? {
                projectId: "movies-project-435712",
                keyFilename: "my-service-account.json",
              }
            : {
                projectId: "movies-project-435712",
              },
        );

        return db;
      } catch (error) {
        throw error;
      }
    },
  },
];
