import { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Input,
  VStack,
  HStack,
  Tag,
} from "@chakra-ui/react";
import axios from "axios";

export default function MemoApp() {
  const [memos, setMemos] = useState([]); // メモの一覧を保存
  const [newTitle, setNewTitle] = useState(""); // 新しいメモのタイトル
  const [newContent, setNewContent] = useState(""); // 新しいメモの内容
  const [newTags, setNewTags] = useState(""); // 新しいメモのタグ（カンマ区切り）

  // サーバーからメモ一覧を取得する関数
  const fetchMemos = async () => {
    try {
      const res = await axios.get("http://localhost:8000/ideas");
      setMemos(res.data); // サーバーから取得したデータを保存
    } catch (err) {
      console.error("メモ取得エラー:", err);
    }
  };

  // 新しいメモを追加する関数
  const addMemo = async () => {
    try {
      const newMemo = {
        title: newTitle,
        content: newContent,
        tags: newTags.split(",").map((tag) => tag.trim()), // カンマ区切りのタグを配列に変換
      };
      await axios.post("http://localhost:8000/ideas", newMemo);
      setNewTitle(""); // 入力欄をリセット
      setNewContent("");
      setNewTags("");
      fetchMemos(); // メモ一覧を更新
    } catch (err) {
      console.error("メモ追加エラー:", err);
    }
  };

  // メモを削除する関数
  const deleteMemo = async (id: number) => {
    try {
      // 指定されたIDのメモを削除
      await axios.delete(`http://localhost:8000/ideas/${id}`);
  
      // 削除後にIDをリセットするエンドポイントを呼び出す
      const resetResponse = await axios.delete("http://localhost:8000/ideas/reset");
  
      // レスポンスメッセージを確認
      console.log(resetResponse.data.message);
  
      // 再度メモ一覧を取得して表示を更新
      fetchMemos();
    } catch (err) {
      console.error("削除エラー:", err);
      alert("メモの削除に失敗しました。");
    }
  };
  

  // ページを開いたときにメモを取得
  useEffect(() => {
    fetchMemos();
  }, []);

  return (
    <VStack spacing={4} align="center">
      {/* 新しいメモを入力するフォーム */}
      <HStack>
        <Input
          placeholder="タイトル"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <Input
          placeholder="内容"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <Input
          placeholder="タグ (カンマ区切り)"
          value={newTags}
          onChange={(e) => setNewTags(e.target.value)}
        />
        <Button colorScheme="teal" onClick={addMemo}>
          追加
        </Button>
      </HStack>

      {/* メモの一覧表示 */}
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>タイトル</Th>
              <Th>内容</Th>
              <Th>タグ</Th>
              <Th>作成日時</Th>
              <Th>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            {memos.map((memo: any) => (
              <Tr key={memo.id}>
                <Td>{memo.id}</Td>
                <Td>{memo.title}</Td>
                <Td>{memo.content}</Td>
                <Td>
                  {memo.tags.map((tag: string, index: number) => (
                    <Tag key={index} mr={1}>
                      {tag}
                    </Tag>
                  ))}
                </Td>
                <Td>{memo.created_at}</Td>
                <Td>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => deleteMemo(memo.id)}
                  >
                    削除
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
}
