"use server";

import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "../appWrite";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import { redirect } from "next/navigation";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );
    console.log(user);

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error);
  }
};
export const signIn = async ({ email, password }: signInProps) => {
  try {
    // Mutation / Database/ Make
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("wealth-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const user = await getUserInfo({ userId: session.userId });

    return parseStringify(user);
  } catch (error) {
    console.error("Error", error);
  }
};

export const signUp = async (userData: SignUpParams) => {
  try {
    // Mutation / Database/ Make fetch
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(),
      userData.email,
      userData.password,
      `${userData.firstName} ${userData.lastName}`
    );
    const session = await account.createEmailPasswordSession(
      userData.email,
      userData.password
    );

    cookies().set("wealth-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.error("Error", error);
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();

    // const user = await getUserInfo({ userId: result.$id})

    return parseStringify(result);
  } catch (error) {
    return null;
  }
}

//Logout
export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();
    cookies().delete("wealth-session");
    await account.deleteSession("current");
    redirect("/sign-up");
  } catch (error) {
    return null;
  }
};
