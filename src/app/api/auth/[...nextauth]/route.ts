import NextAuth from "next-auth";
import { authConfig } from "@/auth.config"; // asegúrate que la ruta esté bien

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
