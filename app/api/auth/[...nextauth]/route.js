import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@utils/database";
import User from "@models/user.model";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "1042763016304-ucp99582aeiopqvgpu38r8qg9o7j8n28.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });

      session.user.id = sessionUser._id;

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDatabase();

        // check if the user exists
        const userExist = await User.findOne({ email: profile.email });

        // if not, create a new user
        if (!userExist) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
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
