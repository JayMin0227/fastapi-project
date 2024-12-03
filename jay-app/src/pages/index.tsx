// // /home/jaymin/pbl_next_jay/src/pages/index.tsx
// import { VStack, Heading, Button, Text } from "@chakra-ui/react";
// import { useState } from "react";
// import { Session } from "@supabase/supabase-js";
// import supabase from "@/libs/supabase";

// export default function Auth() {
//   const [sessionInfo, setSessionInfo] = useState<Session | null>(null);

//   const GitHubSignIn = async () => {
//     try {
//       const { error } = await supabase.auth.signInWithOAuth({
//         provider: "github",
//       });
//       if (error) throw error;
//     } catch (err) {
//       console.error("ログインエラー:", err);
//     }
//   };

//   const signOut = async () => {
//     try {
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;
//       setSessionInfo(null);
//     } catch (err) {
//       console.error("ログアウトエラー:", err);
//     }
//   };

//   return (
//     <VStack spacing={4} align="center" justify="center" height="100vh">
//       <Heading>ログインページ</Heading>
//       {sessionInfo ? (
//         <>
//           <Text>ログイン済み: {sessionInfo.user.email}</Text>
//           <Button colorScheme="red" onClick={signOut}>
//             ログアウト
//           </Button>
//         </>
//       ) : (
//         <Button colorScheme="teal" onClick={GitHubSignIn}>
//           GitHubでログイン
//         </Button>
//       )}
//     </VStack>
//   );
// // }

// import { Inter } from "next/font/google";
// import { Button } from "@chakra-ui/react";
// import supabase from "@/libs/supabase";
// import axios from "axios";
// import { useEffect, useState } from "react";


// const inter = Inter({ subsets: ["latin"] });

// export default function Home() {
//   const GitHubSignIn = async () => {
//     await supabase.auth.signInWithOAuth({
//       provider: 'github',
//     })
//   }

//   const SignOut = async () => {
//     await supabase.auth.signOut({
//     })
//   }

//   async function getSession() {
//     const {data, error} = await supabase.auth.getSession();
//     try {
//       console.log(data)
//     } catch (error) {
//         console.error(error);
//     }
//   }

//   return (
//     <>
//       <Button onClick={getSession}>Session</Button>
//       <Button onClick={GitHubSignIn}>Github</Button>
//       <Button onClick={SignOut}>SignOut</Button>
//     </>
//   );
// }








// import { Inter } from "next/font/google";
// import { Button, VStack, Heading, Text } from "@chakra-ui/react";
// import { useState } from "react";
// import supabase from "@/libs/supabase";
// import { Session } from "@supabase/supabase-js";
// import { useRouter } from "next/router"; // 追加


// const inter = Inter({ subsets: ["latin"] });

// export default function Auth() {
//   const router = useRouter(); // 追加
//   const [sessionInfo, setSessionInfo] = useState<Session | null>(null);

//   // GitHubでログインする関数
//   const GitHubSignIn = async () => {
//     try {
//       const { error } = await supabase.auth.signInWithOAuth({
//         provider: "github",
//       });
//       if (error) throw error;
//     } catch (error) {
//       console.error("GitHubログインエラー:", error);
//     }
//   };

//   // ログアウト処理
//   const signOut = async () => {
//     try {
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;
//       setSessionInfo(null); // セッション情報をクリア
//     } catch (err) {
//       console.error("ログアウトエラー:", err);
//     }
//   };

//   return (
//     <VStack
//       spacing={4}
//       align="center"
//       justify="center"
//       height="100vh"
//       className={inter.className}
//     >
//       <Heading>GitHubでログイン</Heading>
//       {sessionInfo ? (
//         <>
//           <Text>ログイン済み: {sessionInfo.user.email}</Text>
//           <Button colorScheme="red" onClick={signOut}>
//             ログアウト
//           </Button>
//         </>
//       ) : (
//         <Button colorScheme="teal" size="lg" onClick={GitHubSignIn}>
//           GitHubでログイン
//         </Button>
//       )}
//     </VStack>
//   );
// }



import { Inter } from "next/font/google";
import { Button, VStack, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import supabase from "@/libs/supabase";
import { Session } from "@supabase/supabase-js";

const inter = Inter({ subsets: ["latin"] });

export default function Auth() {
  const [sessionInfo, setSessionInfo] = useState<Session | null>(null);

  // GitHubでログインする関数
  const GitHubSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
      });
      if (error) throw error;
    } catch (error) {
      console.error("GitHubログインエラー:", error);
    }
  };

  // ログアウト処理
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setSessionInfo(null); // セッション情報をクリア
    } catch (err) {
      console.error("ログアウトエラー:", err);
    }
  };

  return (
    <VStack
      spacing={4}
      align="center"
      justify="center"
      height="100vh"
      className={inter.className}
    >
      <Heading>GitHubでログイン</Heading>
      {sessionInfo ? (
        <>
          <Text>ログイン済み: {sessionInfo.user.email}</Text>
          <Button colorScheme="red" onClick={signOut}>
            ログアウト
          </Button>
        </>
      ) : (
        <Button colorScheme="teal" size="lg" onClick={GitHubSignIn}>
          GitHubでログイン
        </Button>
      )}
    </VStack>
  );
}
