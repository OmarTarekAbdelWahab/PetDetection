import { useState } from "react";

import { userService } from "../services/userService";

function AnalyzePage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [results, setResults] = useState({ class: null, detect: null, segment: null });
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files.length === 0) return;
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setLoading(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1]; // Strip prefix like 'data:image/jpeg;base64,...'

      try {

        const response = await userService.analyzeImage(base64);

        setResults({
          class: `data:image/png;base64,${response.photos.classification_image_base64}`,
          detect: `data:image/png;base64,${response.photos.detection_image_base64}`,
          segment: `data:image/png;base64,${response.photos.segmentation_image_base64}`,
        });
      } catch (err) {
        console.error("API error:", err);
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Animal Detector</h1>

      <div className="flex flex-col items-center space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="text-sm"
        />
        {preview && <img src={preview} alt="Preview" className="w-64 h-auto rounded shadow-md" />}

        <button
          onClick={handleAnalyze}
          disabled={!selectedFile || loading}
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primaryDark transition disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze Image"}
        </button>

        {results.class && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Classification</h3>
              <img src={results.class} alt="Classification" className="w-full h-auto rounded border" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Detection</h3>
              <img src={results.detect} alt="Detection" className="w-full h-auto rounded border" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Segmentation</h3>
              <img src={results.segment} alt="Segmentation" className="w-full h-auto rounded border" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnalyzePage;
