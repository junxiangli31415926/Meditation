import React, { useState } from "react";
import { generateMeditationThought } from "../api/openaiService";

const MeditationThoughtGenerator = () => {
  const [topic, setTopic] = useState("");   // 存储用户输入的主题
  const [thought, setThought] = useState(""); // 存储生成的内容
  const [loading, setLoading] = useState(false); // 加载状态

  // 按钮点击事件：调用 API 生成冥想思考
  const handleGenerateThought = async () => {
    if (!topic.trim()) {
      alert("please enter the purpose");
      return;
    }

    setLoading(true);
    setThought("");  // 清空之前的内容

    try {
      const result = await generateMeditationThought(topic);
      setThought(result);
    } catch (error) {
      setThought("Cannot generate meditation, please try later");
    }

    setLoading(false);
  };
  
//改这里@hans
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Mediatation Thought Generator</h1>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Please enter the purpose for medication!"
        style={{ padding: "10px", width: "300px" }}
      />
      <button
        onClick={handleGenerateThought}
        style={{ marginLeft: "10px", padding: "10px 20px" }}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generating the thought"}
      </button>
      {thought && (
        <div style={{ marginTop: "20px", fontSize: "20px", fontStyle: "italic" }}>
          <h3>生成的冥想思考：</h3>
          <p>{thought}</p>
        </div>
      )}
    </div>
  );
};

export default MeditationThoughtGenerator;
