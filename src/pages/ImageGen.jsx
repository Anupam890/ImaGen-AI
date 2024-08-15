import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { saveAs } from "file-saver";

const ImageGen = () => {
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [option, setOption] = useState("");

  const options = [
    {
      id: 1,
      name: "Stable Diffusion XL",
      values: "stabilityai/stable-diffusion-xl-base-1.0",
    },
    {
      id: 2,
      name: "Stable Diffusion",
      values: "runwayml/stable-diffusion-v1-5",
    },
    {
      id: 3,
      name: "Cartoon Style",
      values: "alvdansen/littletinies",
    },
    {
      id: 4,
      name: "Anime Style",
      values: "John6666/mala-anime-mix-nsfw-pony-xl-v3-sdxl",
    },
  ];

  const generateImage = (e) => {
    e.preventDefault();
    if (prompt === "") {
      return toast.error("Please enter a prompt");
    }
    toast.loading("Generating image...");

    fetch(`https://api-inference.huggingface.co/models/${option}`, {
      headers: {
        Authorization: "Bearer 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",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ inputs: prompt }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.error || "Failed to generate image");
          });
        }
        return response.blob();
      })
      .then((result) => {
        const imageUrl = URL.createObjectURL(result);
        setImage(imageUrl);
        toast.dismiss();
        toast.success("Image generated successfully!");
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.message);
      });
  };

  const downloadImage = () => {
    if (!image) {
      return toast.error("No image generated yet");
    }
    saveAs(image, "generated_image.png");
    toast.success("Image downloaded successfully!");
  };

  return (
    <div className="text-white min-h-screen flex items-center justify-center flex-col bg-gray-900 p-4">
      <Toaster position="top-right" reverseOrder={false} />
      <form onSubmit={generateImage} className="w-full max-w-md">
        <div className="image-container border-2 border-white w-full h-72 flex items-center justify-center mb-4">
          {image ? (
            <img
              src={image}
              alt="Generated"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500">No image generated</span>
          )}
        </div>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter prompt..."
          className="mb-4 w-full text-white bg-gray-800 p-2 rounded"
        />
        <select
          value={option}
          onChange={(e) => setOption(e.target.value)}
          className="bg-[#1D90F5] text-white mb-2 rounded-md px-1 py-1 border-none outline-none"
        >
          <option value="" disabled>Select model...</option>
          {options.map((option) => (
            <option key={option.id} value={option.values} className="text-white">
              {option.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-[#1D90F5] text-white px-4 py-2 rounded-md w-full mb-2"
        >
          Generate
        </button>
        <button
          type="button"
          onClick={downloadImage}
          className="bg-[#1D90F5] text-white px-4 py-2 rounded-md w-full mb-2"
        >
          {image ? "Download Image" : "No image generated"}
        </button>
        {prompt && (
          <p className="text-gray-400">{`Your recent prompt is: ${prompt}`}</p>
        )}
      </form>
    </div>
  );
};

export default ImageGen;
