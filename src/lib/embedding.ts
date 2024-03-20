// import OpenAIAPI from "openai";

// const openai = new OpenAIAPI({
//     apiKey: process.env.OPENAI_API_KEY,
//   });


//   export const getEmbedding = async (text: string) => {
//     try {
//       const response = await openai.embeddings.create({
//         model: "text-embedding-ada-002",
//         input: text.replace(/\n/g, " "),
//       });
  
//       // const result = await response.json()
//     return response.data[0].embedding as number[];

//     //   if (response.data && response.data && response.data[0] && response.data[0].embedding) {
//     //     return response.data[0].embedding as number[];
//     //   } else {
//     //     throw new Error("Invalid response format from OpenAI");
//     //   }
//     } catch (error) {
//       console.error("An error occurred while fetching embeddings:", error);
//       // Handle the error appropriately
//       // You might want to re-throw the error or return a specific result
//       throw error; // Re-throwing the error to propagate it to the calling function
//     }
//   };
  
import { OpenAIApi, Configuration } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function getEmbedding(text: string) {
  try {
    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: text.replace(/\n/g, " "),
    });
    const result = await response.json();
    return result.data[0].embedding as number[];
  } catch (error) {
    console.log("error calling openai embeddings api", error);
    throw error;
  }
}