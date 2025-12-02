import { MongoServerError } from "mongodb";

export const isDuplicateKeyError = (err: any): err is MongoServerError => {
  return err instanceof MongoServerError && err.code === 11000;
};
