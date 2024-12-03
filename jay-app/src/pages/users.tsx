// import { Fruit } from "@/types/fruit";
// import {
//   Button,
//   FormControl,
//   FormLabel,
//   NumberDecrementStepper,
//   NumberIncrementStepper,
//   NumberInput,
//   NumberInputField,
//   NumberInputStepper,
//   Input,
//   Table,
//   TableContainer,
//   Tbody,
//   Td,
//   Th,
//   Thead,
//   Tr,
// } from "@chakra-ui/react";

// import axios from "axios";
// import { useState, useEffect } from "react";




// export default function Users() {
//   // Stateの定義
//   const [users, setUsers] = useState<Fruit[]>([]);
//   const [newId, setNewId] = useState<number>(); // 初期値は undefined（空白表示）
//   const [newName, setNewName] = useState<string>(""); // 名前は文字列型
//   const [newPrice, setNewPrice] = useState<number>(); // 初期値は undefined（空白表示）

//   // データを取得する関数 (GET)
//   async function getUsers() {
//     try {
//       const url = "http://localhost:8000/users";  // URL を localhost に変更

//       const res = await axios.get(url);
      
//       setUsers(res.data); // 取得したデータをStateに設定
//     } catch (err) {
//       console.error("Error fetching users:", err);
//     }
//   }

//   // データを送信する関数 (POST)
//   async function addUsers() {
//     try{
//       const url = "http://127.0.0.1:8000/users";
//       const newUser={id:newId,name:newName,price:newPrice};
//       await axios.post(url,newUser);
//       setNewId(undefined);
//       setNewName("");
//       setNewPrice(undefined);
     
      
//       getUsers();
//     }catch(err){
//       console.error(err);
//     }
//   }

//   // データを削除する関数 (DELETE)
//   async function deleteUser(userId: number) {
//     try {
//       const url = `http://localhost:8000/users/${userId}`;
//       await axios.delete(url);
//       getUsers(); // データを再取得して更新
//     } catch (err) {
//       console.error("Error deleting user:", err);
//     }
//   }




//   // コンポーネントがマウントされたときにユーザー情報を取得
//   useEffect(() => {
//     getUsers();
//   }, []);

//   return (
//     <>
//        <FormControl mt={4}>
//                 <FormLabel>ID</FormLabel>
//                 <Input 


//                     value={newId !== undefined ? newId : ""}  // undefined のときに空白を表示
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       if (value === "") {
//                         setNewId(undefined);  // 空白の場合、undefined に設定
//                       } else {
//                         const parsedValue = parseInt(value, 10);
//                         if (!isNaN(parsedValue)) {
//                           setNewId(parsedValue);
//                         }
//                       }
//                     }}
//                     placeholder="新しいIDを入力"


//                 />
//                 <FormLabel mt={2}>Name</FormLabel>
//                 <Input 
//                     value={newName}
//                     onChange={(e) => setNewName(e.target.value)}
//                     placeholder="新しいNameを入力"
//                 />
//                 <FormLabel mt={2}>Price</FormLabel>
//                 <Input 


//                       value={newPrice !== undefined ? newPrice : ""}  // undefined のときに空白を表示
//                       onChange={(e) => {
//                         const value = e.target.value;
//                         if (value === "") {
//                           setNewPrice(undefined);  // 空白の場合、undefined に設定
//                         } else {
//                           const parsedValue = parseFloat(value);
//                           if (!isNaN(parsedValue)) {
//                             setNewPrice(parsedValue);
//                           }
//                         }
//                       }}
//                       placeholder="新しいPriceを入力"

                      
//                 />
                
//                 <Button mt={2} onClick={addUsers}>アイテム追加</Button> {/* アイテムを追加するボタン */}
//       </FormControl>

//       <TableContainer>
//         <Table variant="striped"  mt={4}>
//           <Thead>
//             <Tr>
//               <Th>ID</Th>
//               <Th>Name</Th>
//               <Th>Price</Th>
//              </Tr>
//           </Thead>
//           <Tbody>
//             {users.map((res) => (
//               <Tr key={res.id}>
//                 <Td>{res.id}</Td>
//                 <Td>{res.name}</Td>
//                 <Td>{res.price}</Td>




//                  <Td>
//                   {/* 各行に削除ボタンを追加 */}
//                   <Button colorScheme="red" onClick={() => deleteUser(res.id)}>削除</Button>
//                 </Td>




//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//       </TableContainer>  
//       </>  
//     )
    
// }