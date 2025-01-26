import OpenAI from "openai";

// 创建 OpenAI 实例
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY, // 使用环境变量存储 API 密钥
  dangerouslyAllowBrowser: true, // 允许在前端直接调用 API（仅在开发环境使用）
});

/**
 * 生成冥想思考内容
 * @param {string} userPrompt 用户输入的冥想主题
 * @returns {Promise<string>} 生成的冥想思考内容
 */
export const generateMeditationThought = async (userPrompt) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",  // 指定模型
      messages: [
        { role: "user", content: `Generate a meditation thought about: ${userPrompt}` },
      ],
      temperature: 0.7,  // 控制生成内容的创造性程度
      max_tokens: 200,   // 限制生成文本的最大长度
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating meditation thought:", error);
    throw new Error("Failed to generate meditation thought. Please try again.");
  }
};
