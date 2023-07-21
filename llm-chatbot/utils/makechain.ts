import { OpenAI } from 'langchain/llms/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { LLMChain, loadQAStuffChain } from 'langchain/chains';
import { PromptTemplate } from 'langchain/prompts';

const CONDENSE_PROMPT = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;

const QA_PROMPT = `You are an AI language model, your responses are generated based on a mixture of licensed data, data created by human trainers, and publicly available data.
you have been trained on a wide range of sources, such as books, websites, and other texts, in order to develop a broad understanding of human language. It's important to note that while you strive to provide accurate and up-to-date information, your responses may not always reflect the most current news events or developments and provide user friendly response.
If you don't know the answer, just say you "As an AI language model, my responses are generated based on a mixture of licensed data, data created by human trainers, and publicly available data. I have been trained on a wide range of sources, such as books, websites, and other texts, in order to develop a broad understanding of human language. It's important to note that while I strive to provide accurate and up-to-date information, my responses may not always reflect the most current news events or developments. Is there something specific you would like to know about?" you don't know. DO NOT try to make up an answer.
If the question is not related to the context, politely respond with "Please ask questions related to United States Pharmacopeia" that you are tuned to only answer questions that are related to the United States Pharmacopeia.


 

{context}

Question: {question}
Helpful answer in markdown:`;

// const QA_PROMPT = `Context: {context} \n\n Question: {question} \n\n Try answering Question using Context. 
// Please ensure your responses are in American English and strictly pertain to the topic of HR solutions, Lanteria HR solutions and HR. 
// If a question doesn't pertain to this topic, kindly respond with "Please ask questions related to HR Management". `

export class makeChain {
  vectorstore: PineconeStore;
  model: OpenAI;

  constructor(vectorstore: PineconeStore) {
    this.vectorstore = vectorstore;
    this.model = new OpenAI({
      temperature: 0, // increase temepreature to get more creative answers
      modelName: 'gpt-4', //change this to gpt-4 if you have access
    });
  }

  run = async (inputQuestion: string) => {

    let docs = await this.vectorstore.asRetriever().getRelevantDocuments(inputQuestion);

    // console.log("docs ==>", docs)

    function isSentence(str: string) {
      let val = str.includes(' ');
      // console.log("isSentence ==>", val, str)
      return val
    }

    if (!isSentence(docs[0].pageContent)) {
      const template = `You are a helpful AI assistant to create any information for United States Pharmacopeia
      related data. Given the text of question, it is your job to write a answer that question with example or source.
      Question: {text}
      Answer:
      `
      const prompt_template = new PromptTemplate({
        inputVariables: ["text"],
        template: template,
      });

      const gptchain = new LLMChain({ llm: this.model, prompt: prompt_template })
      // console.log("inside gpt chain")
      let obj = { 'text': "", "src": "gpt4" }
      obj.text = await gptchain.run(inputQuestion);
      // console.log("result from chatgpt", obj)

      return obj
    } else {
      const inputs = {
        question: inputQuestion,
        input_documents: docs,
        chat_history: [],
      };
      const qa_prompt = PromptTemplate.fromTemplate(QA_PROMPT);
      // console.log("qa_prompt ==>", qa_prompt)
      let result = await loadQAStuffChain(this.model, { prompt: qa_prompt }).call(inputs);
      // console.log("result from wikibase ===>", result)

      if (result.text.includes("I'm sorry,")) {
        const template = `You are a helpful AI assistant to create any information for United States Pharmacopeia
      related data. Given the text of question, it is your job to write a answer that question with example or source.
      Question: {text}
      Answer:
      `
        const prompt_template = new PromptTemplate({
          inputVariables: ["text"],
          template: template,
        });

        const gptchain = new LLMChain({ llm: this.model, prompt: prompt_template })
        // console.log("inside gpt chain")
        let obj = { 'text': "", "src": "gpt4" }
        obj.text = await gptchain.run(inputQuestion);
        // console.log("result from chatgpt", obj)

        return obj
      }
      result.src = "talkingDb"

      return result;
    }
  }
};
