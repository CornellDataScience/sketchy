import { useState, useEffect } from "react";

const Home: React.FC = () => {
  const [output, setOutput] = useState("");
  const [ogImage, setOgImage] = useState<{ bytes: string; path: string }>({
    bytes: "",
    path: "",
  });
  const [sketchImage, setSketchImage] = useState<{
    bytes: string;
    path: string;
  }>({ bytes: "", path: "" });
  const [similarityScore, setSimilarityScore] = useState("");

  const handleClick = () => {
    window.electronAPI.runPythonScript();

    window.electronAPI.handlePythonScriptResponse((message: any) => {
      setOutput(message);
    });
  };

  const uploadImage = () => {
    window.electronAPI.runUploadImage();

    window.electronAPI.handleImageSetResponse((message: any) => {
      setOgImage(message);
    });
  };

  const uploadSketch = () => {
    window.electronAPI.runUploadSketch();

    window.electronAPI.handleSketchSetResponse((message: any) => {
      setSketchImage(message);
    });
  };

  const checkSimilarity = () => {
    if (ogImage && sketchImage) {
      window.electronAPI.runImageSimilarity(ogImage, sketchImage);
    }

    window.electronAPI.handleSimilarityResponse((message: any) => {
      setSimilarityScore(message);
    });
  };

  return (
    <>
      <button onClick={uploadImage} id="upload-image">
        Upload Image
      </button>
      <button onClick={uploadSketch} id="upload-sketch">
        Upload Sketch
      </button>
      <button
        onClick={checkSimilarity}
        disabled={ogImage.path == "" || sketchImage.path == ""}
        id="check-similarity"
        className="checkSimilarity"
      >
        Check Similarity
      </button>

      <h4 id="similarity-score">Similarity Score: {similarityScore}</h4>

      <img src={`data:image/jpg;base64,${ogImage.bytes}`} alt={ogImage.path} />
      <img
        src={`data:image/jpg;base64,${sketchImage.bytes}`}
        alt={sketchImage.path}
      />
      {output}
      <button onClick={handleClick}>asdf</button>
    </>
  );
};

export default Home;