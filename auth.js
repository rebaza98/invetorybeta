
import { connectToDB } from "@/utils/databse";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Usuario from "./models/core/usuario";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
  } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              user: { label: "Usuario", type: "text", placeholder: "usuario" },
              password: { label: "Password", type: "password", placeholder: "*****" },
            },
            async authorize(credentials, req) {
              console.log(credentials)
              console.log("AUTHORIZA")
              try {
                await connectToDB()
                const usuarioUnico = await Usuario.findOne({ user: credentials.user });
                if (usuarioUnico){
                  console.log("USUARIO FOUND", usuarioUnico)
                  //const matchPassword = await bcrypt.compare(credentials.password, usuarioUnico.password)
                  const matchPassword = true
                  if (!matchPassword) return null
                  const user = {
                    name: usuarioUnico.user,
                    role: usuarioUnico.role

                  }
                  return user
                }else{
                  console.log("NOT FOUND", usuarioUnico)
                  return null
                }
                
              } catch (error) {
                  console.log("ERROR")
              }
      
             
            },
          }),
    ],

    callbacks: {
      async jwt({ token, user}) {
        // THIS USER CAN BE USED IS SAME AS CONSULTED IN DB
        if (user) {
          token.role = user.role
        }
        return token;
      },
      session({session, token, user}){
        session.user.role = token.role
        return session
      }
      
    },
    

  });
