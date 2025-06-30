import { useState } from "react";

import { userService } from "../services/userService";
import Button from "../components/Button";
import AnalysisDetails from "../components/AnalysisDetails";
import { isPet } from "../utils/utility";

function AnalyzePage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [responseData, setResponseData] = useState({});
    const [preview, setPreview] = useState(null);
    const [images, setImages] = useState({ class: null, detect: null, segment: null });
    const [loading, setLoading] = useState(false);
    const [fileError, setFileError] = useState(null);

    const MAX_FILE_SIZE = 0.5 * 1024 * 1024; // 0.5MB

    const handleFileChange = (e) => {
        if (e.target.files.length === 0) return;
        
        const file = e.target.files[0];
        setFileError(null);

        // Check file size
        if (file.size > MAX_FILE_SIZE) {
            const fileSizeKB = (file.size / (1024)).toFixed(2);
            setFileError(`File size (${fileSizeKB}KB) exceeds the 0.5MB limit. Please choose a smaller image.`);
            setSelectedFile(null);
            setPreview(null);
            return;
        }
        
        if (!file.type.startsWith('image/')) {
            setFileError('Please select a valid image file.');
            setSelectedFile(null);
            setPreview(null);
            return;
        }
        
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleAnalyze = async () => {
        if (!selectedFile) return;

        setLoading(true);

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64 = reader.result.split(",")[1];

            try {
                const response = await userService.analyzeImage(base64);

                setResponseData({
                    classification: response.result.classification,
                    detection: response.result.detection,
                    segmentation_classes: response.result.segmentation_classes,
                    processingTime: response.result.processingTime,
                });
                setImages({
                    class: `data:image/jpeg;base64,${response.result.classificationImage}`,
                    detect: `data:image/jpeg;base64,${response.result.detectionImage}`,
                    segment: `data:image/jpeg;base64,${response.result.segmentationImage}`,
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-primary bg-clip-text text-transparent mb-4">
                        Animal Detection AI
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Upload an image to detect, classify, and segment animals using advanced computer vision
                    </p>
                </div>

                <div className="flex flex-col items-center space-y-6">
                    {/* File Upload Section */}
                    <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                        <div className="text-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Select Image</h2>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                                <div className="flex items-start space-x-2">
                                    <svg
                                        className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <div className="text-left">
                                        <p className="text-sm text-blue-800 font-medium">Important Notes:</p>
                                        <ul className="text-xs text-blue-700 mt-1 space-y-1">
                                            <li>• Analysis may take 2-3 minutes</li>
                                            <li>• Keep image size under 0.5MB for best results</li>
                                            <li>• Supported formats: JPG, JPEG, PNG, WebP</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <label className="block w-full cursor-pointer">
                            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                            <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
                                fileError 
                                    ? 'border-red-300 bg-red-50' 
                                    : 'border-primary bg-primary/5 hover:bg-primaryDark/10'
                            }`}>
                                <div className="flex flex-col items-center space-y-2">
                                    <svg
                                        className={`w-8 h-8 ${fileError ? 'text-red-500' : 'text-primary'}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                        />
                                    </svg>
                                    <span className={`font-medium ${fileError ? 'text-red-600' : 'text-primary'}`}>
                                        {selectedFile ? selectedFile.name : "Click to upload image"}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        Max size: 0.5MB
                                    </span>
                                </div>
                            </div>
                        </label>

                        {fileError && (
                            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-sm text-red-700 font-medium">{fileError}</p>
                                </div>
                            </div>
                        )}

                        {selectedFile && !fileError && (
                            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-green-700 font-medium">✅ File selected</span>
                                    <span className="text-green-600">
                                        {(selectedFile.size / (1024)).toFixed(2)}KB
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {preview && (
                        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Preview</h3>
                            <img
                                src={preview}
                                alt="Preview"
                                className="max-w-sm max-h-64 rounded-lg shadow-md border border-gray-200 mx-auto block"
                            />
                        </div>
                    )}
                    
                    <div className="w-full max-w-sm">
                        <Button
                            text={
                                loading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        <span>Analyzing...</span>
                                    </div>
                                ) : (
                                    "🔍 Analyze Image"
                                )
                            }
                            onClick={handleAnalyze}
                            disabled={!selectedFile || loading || fileError}
                        />
                    </div>

                    {responseData.classification && (
                        <>
                            {(() => {
                                const petPresence = isPet(responseData.classification);
                                return (
                                    <div className={`w-full max-w-md mx-auto mb-6 rounded-xl p-6 border-2 shadow-lg ${
                                        petPresence
                                            ? 'bg-green-50 border-green-300 text-green-800' 
                                            : 'bg-gray-50 border-gray-300 text-gray-700'
                                    }`}>
                                        <div className="flex items-center justify-center space-x-3">
                                            <div className="text-center">
                                                <p className="font-bold text-xl">
                                                    {petPresence ? "Pet Found" : "No Pet Detected"}
                                                </p>
                                                <p className="text-sm mt-1 opacity-80">
                                                    Classification: {responseData.classification}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}

                            <AnalysisDetails
                                title="Analysis Finished"
                                analysisTimeString={new Date().toLocaleString()}
                                processingTime={responseData.processingTime}
                                images={images}
                                classification={responseData.classification}
                                detection={responseData.detection}
                                segmentation_classes={responseData.segmentation_classes}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AnalyzePage;
