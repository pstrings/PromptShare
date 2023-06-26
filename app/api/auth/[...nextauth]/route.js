import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session }) {
      const userSession = await User.findOne({
        email: session.user.email,
      });

      // updating session with the details of currently logged in user and returning the ongoing session
      session.user.id = userSession._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        //   check if user already exists
        const userExists = await User.findOne({
          email: profile.email,
        });

        // if not then create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            // here, we are replacing multiple whitespaces with no white space
            username: profile.name.replace(/\s/g, "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
