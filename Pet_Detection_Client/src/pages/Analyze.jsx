import { useState } from "react";

import { userService } from "../services/userService";
import Button from "../components/Button";

function AnalyzePage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [responseData, setResponseData] = useState({});
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

                setResponseData({
                    classification: response.result.classification,
                    detection: response.result.detection,
                    segmentation_classes: response.result.segmentation_classes,
                    processingTime: response.result.processingTime,
                });
                setResults({
                    class: `data:image/png;base64,${response.result.classificationImage}`,
                    detect: `data:image/png;base64,${response.result.detectionImage}`,
                    segment: `data:image/png;base64,${response.result.segmentationImage}`,
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
            <div className="max-w-4xl mx-auto">
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
                                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    <div className="text-left">
                                        <p className="text-sm text-blue-800 font-medium">Important Notes:</p>
                                        <ul className="text-xs text-blue-700 mt-1 space-y-1">
                                            <li>• Analysis may take 2-3 minutes</li>
                                            <li>• Keep image size under 500KB for best results</li>
                                            <li>• Supported formats: JPG, PNG, WebP</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <label className="block w-full cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <div className="border-2 border-dashed border-primary bg-primary/5 rounded-lg p-6 text-center hover:from-primary/10 hover:bg-primaryDark/10 transition-all duration-200">
                                <div className="flex flex-col items-center space-y-2">
                                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <span className="text-primary font-medium">
                                        {selectedFile ? selectedFile.name : "Click to upload image"}
                                    </span>
                                </div>
                            </div>
                        </label>
                    </div>

                    {/* Image Preview */}
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

                    {/* Analyze Button */}
                    <div className="w-full max-w-sm">
                        <Button 
                            text={loading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Analyzing...</span>
                                </div>
                            ) : "🔍 Analyze Image"} 
                            onClick={handleAnalyze}
                            disabled={!selectedFile || loading}
                        />
                    </div>

                {responseData.processingTime && (
                    <div className="bg-green-50  border border-green-200 rounded-xl p-4 mt-8 shadow-sm">
                        <div className="flex items-center justify-center space-x-3">
                            <div className="bg-green-100 p-2 rounded-full">
                                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-medium text-gray-600">Processing completed in</p>
                                <p className="text-2xl font-bold text-green-700">
                                    {(responseData.processingTime / 1000).toFixed(2)} seconds
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {results.class && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full max-w-6xl">
                        {/* Classification */}
                        <div className="flex flex-col items-center bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-primary pb-2">Classification</h3>
                            <img
                                src={results.class}
                                alt="Classification"
                                className="w-full h-auto rounded-lg border border-gray-200 mb-6 shadow-sm"
                            />
                            <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Detected Animal:</span>
                                    <span className="text-lg font-bold text-primary bg-white px-3 py-1 rounded-full shadow-sm">
                                        {responseData.classification}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Detection */}
                        <div className="flex flex-col items-center bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-primary pb-2">Detection</h3>
                            <img src={results.detect} alt="Detection" className="w-full h-auto rounded-lg border border-gray-200 mb-6 shadow-sm" />
                            
                            <div className="w-full overflow-hidden rounded-lg border border-gray-200">
                                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-b border-gray-200">
                                    <div className="grid grid-cols-3 gap-4">
                                        <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Object</span>
                                        <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Confidence</span>
                                        <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Bounding Box</span>
                                    </div>
                                </div>
                                
                                <div className="max-h-32 overflow-y-auto">
                                    {Array.isArray(responseData.detection) && responseData.detection.length > 0 ? (
                                        responseData.detection.map((det, idx) => (
                                            <div key={idx} className={`px-4 py-3 border-b border-gray-100 last:border-b-0 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                                                <div className="grid grid-cols-3 gap-4 items-center">
                                                    <span className="text-sm font-medium text-gray-800 capitalize">{det.label}</span>
                                                    <div className="flex items-center">
                                                        <div className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
                                                            {(det.confidence * 100).toFixed(1)}%
                                                        </div>
                                                    </div>
                                                    <span className="text-xs text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded">{det.bbox.join(", ")}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="px-4 py-8 text-center">
                                            <div className="text-gray-400">
                                                <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.824-2.562M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                                </svg>
                                                <p className="text-sm font-medium">No objects detected</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Segmentation */}
                        <div className="flex flex-col items-center bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-primary pb-2">Segmentation</h3>
                            <img
                                src={results.segment}
                                alt="Segmentation"
                                className="w-full h-auto rounded-lg border border-gray-200 mb-6 shadow-sm"
                            />
                            <div className="w-full bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                                <div className="flex flex-col space-y-2">
                                    <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Segmented Classes:</span>
                                    <div className="flex flex-wrap gap-2">
                                        {Array.isArray(responseData.segmentation_classes) ? 
                                            responseData.segmentation_classes.map((className, idx) => (
                                                <span key={idx} className="bg-white text-purple-700 text-sm font-medium px-3 py-1 rounded-full shadow-sm border border-purple-200 capitalize">
                                                    {className}
                                                </span>
                                            )) : 
                                            <span className="bg-white text-purple-700 text-sm font-medium px-3 py-1 rounded-full shadow-sm border border-purple-200 capitalize">
                                                {responseData.segmentation_classes}
                                            </span>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </div>
    );
}

export default AnalyzePage;
