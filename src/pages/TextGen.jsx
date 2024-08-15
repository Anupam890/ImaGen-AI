import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { saveAs } from "file-saver";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { markdownToTxt } from "markdown-to-txt";
import { usePromptHistory } from "../Context/PromptHistoryContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const TextGen = () => {
  const [prompt, setPrompt] = useState("");
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { promptHistory, addPrompt } = usePromptHistory();

  const genAi = new GoogleGenerativeAI("AIzaSyBqqwWiUAK79WaQRwV7mm0Ixh1LRuvboGA");

  const generateData = async (event) => {
    event.preventDefault();
    if (prompt === "") {
      toast.error("Please enter a prompt");
      return;
    }

    const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
      toast.loading("Generating Content");
      setIsLoading(true);
      console.log("Generating content with prompt:", prompt);
      const result = await model.generateContent(prompt);
      console.log("API response:", result);
      const markdownContent = result.response.candidates[0].content.parts[0].text;
      const plainTextContent = markdownToTxt(markdownContent);
      setData(plainTextContent);
      toast.dismiss();
      addPrompt(prompt); // Add the prompt to history
    } catch (error) {
      console.error("Error generating data:", error);
      toast.error("Error generating data");
    } finally {
      setIsLoading(false);
    }
  };


  const fileDownload = async () => {
    if (data === "") {
      toast.error("No data to download");
      return;
    }
  
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10;
    const maxLineWidth = pageWidth - margin * 2;
    const fontSize = 12;
    const lineHeight = 1.5;
    const maxLinesPerPage = Math.floor((pageHeight - margin * 2) / (fontSize * lineHeight));
  
    doc.setFont("helvetica", "normal");
    doc.setFontSize(fontSize);
  
    const lines = doc.splitTextToSize(data, maxLineWidth);
  
    lines.forEach((line, index) => {
      const lineNumberOnPage = index % maxLinesPerPage;
      const isNewPage = index > 0 && lineNumberOnPage === 0;
  
      if (isNewPage) {
        doc.addPage();
      }
  
      const y = margin + (lineNumberOnPage * fontSize * lineHeight);
  
      if (index === 0) {
        doc.setFont("helvetica", "bold");
        doc.text(line, margin, y);
        doc.setFont("helvetica", "normal");
      } else {
        doc.text(line, margin, y);
      }
    });
  
    doc.save("generated_text.pdf");
    toast.success("Downloaded successfully");
  };
  

  return (
    <div className="flex flex-col h-screen">
      <div className="prompt-bar bg-blue-500 p-4 text-white">
        <form onSubmit={generateData}>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt..."
            className="w-full p-2 text-black rounded mb-2"
          />
          <div className="group flex items-center gap-3">
            <button
              type="submit"
              className="ml-2 p-2 bg-white text-blue-500 rounded"
            >
              Generate
            </button>
            <button
              type="button"
              onClick={fileDownload}
              className="ml-2 p-2 bg-white text-blue-500 rounded"
            >
              Download
            </button>
          </div>
        </form>
      </div>
      <div
        className={`text-editor flex-1 bg-white p-4 transition-shadow duration-300 ${
          isLoading ? "shadow-lg" : ""
        }`}
      >
        <textarea
          className="w-full h-full p-2 border border-gray-300 text-black rounded resize-none"
          value={data}
          readOnly
        />
      </div>
      <div className="prompt-history p-4 bg-gray-100 text-black">
        <h3 className="text-lg font-bold mb-2">Prompt History</h3>
        {/* <ul>
          {promptHistory.map((item, index) => (
            <li key={index} className="mb-1">
              {item}
            </li>
          ))}
        </ul> */}
      </div>
      <Toaster />
    </div>
  );
};

export default TextGen;
