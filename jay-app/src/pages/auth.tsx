import { Center, HStack, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { HelloUserMessage } from "@/components/Messages/HelloUserMessage";
import { LogoutButton } from "@/components/Buttons/LogOutButton";
import { ItemTableButton } from "@/components/Buttons/ItemTableButton";

export default function Auth() {
  return (
    <>
      <Head>
        <title>Memo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center h="100vh">
        <VStack>
          <HelloUserMessage />
          <LogoutButton />
          <ItemTableButton />
        </VStack>
      </Center>
    </>
  );
}


