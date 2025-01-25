import React, { useEffect, useState } from "react";

const LongTaskComponent = () => {
  const [status, setStatus] = useState("Waiting for task...");
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    const fetchTaskStatus = async () => {
      setIsRequesting(true);

      try {
        const response = await fetch("http://127.0.0.1:5000/long-task");

        if (!response.body) {
          throw new Error("ストリームレスポンスが無効です");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        let done = false;
        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          if (value) {
            const chunk = decoder.decode(value);
            console.log("Received chunk:", chunk);

            // データを行ごとに処理
            const lines = chunk.split("\n").filter((line) => line.trim() !== "");
            lines.forEach((line) => {
              const parsed = JSON.parse(line);
              setStatus(parsed.status);
            });
          }
        }

        setStatus("Task completed");
      } catch (error) {
        console.error("エラー:", error);
        setStatus("An error occurred");
      } finally {
        setIsRequesting(false);
      }
    };

    fetchTaskStatus();
  }, []);

  return (
    <div>
      <h1>Flask API リクエスト</h1>
      <p>ステータス: {status}</p>
      <button
        onClick={() => window.location.reload()}
        disabled={isRequesting}
      >
        再リクエスト
      </button>
    </div>
  );
};

export default LongTaskComponent;
