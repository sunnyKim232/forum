import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "8993675eb9e3c7f67f54",
      clientSecret: "2e388083b3a8dfb9761b619c19732d41e4b86583",
    }),
  ],
  secret: "sunnyMalgn",
  adapter: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions);
