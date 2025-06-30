import { useState, useEffect } from "react";
import { userService } from "../services/userService";
import Loading from "../components/Loading";
import Fail from "../components/Fail";
import { formatDate } from "../utils/utility";
import AnalysisDetails from "../components/AnalysisDetails";

function History() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAnalysis, setSelectedAnalysis] = useState(null);
    const [error, setError] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(false);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            setLoading(true);
            const historyData = await userService.getAnalysisHistory();
            setHistory(historyData);
        } catch (err) {
            console.error("Error fetching history:", err);
            setError("Failed to load analysis history");
        } finally {
            setLoading(false);
        }
    };

    

    const handleViewDetails = (analysis) => {
        // skip fetching if data already available
        if (analysis.classificationImage) {
            setSelectedAnalysis(analysis);
            return;
        }
        setLoadingDetails(true);
        userService.getAnalysisDetails(analysis._id)
            .then(details => {
                analysis.classificationImage = details.analysis.classificationImage;
                analysis.detectionImage = details.analysis.detectionImage;
                analysis.segmentationImage = details.analysis.segmentationImage;
                setSelectedAnalysis(analysis);
                setLoadingDetails(false);
            });
    };

    const handleBackToHistory = () => {
        setSelectedAnalysis(null);
    };

    // Loading state
    if (loading) {
        return (
            <Loading text="Loading your analysis history..."/>
        );
    }

    // Error state
    if (error) {
        return (
            <Fail text="Error Loading History" tryAgainHandler={fetchHistory} />
        );
    }

    // Detail view
    if (selectedAnalysis) {
        const images = {
            input: `data:image/jpeg;base64,${selectedAnalysis.inputImage}`,
            class: `data:image/jpeg;base64,${selectedAnalysis.classificationImage}`,
            detect: `data:image/jpeg;base64,${selectedAnalysis.detectionImage}`,
            segment: `data:image/jpeg;base64,${selectedAnalysis.segmentationImage}`,
        };

        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-8">
                <div className="max-w-6xl mx-auto">
                    {/* Back Button */}
                    <button
                        onClick={handleBackToHistory}
                        className="mb-6 flex items-center space-x-2 text-primary hover:text-primaryDark transition font-medium cursor-pointer"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>Back to History</span>
                    </button>

                    <AnalysisDetails 
                        analysisTimeString={selectedAnalysis.createdAt}
                        processingTime={selectedAnalysis.processingTime}
                        images={images}
                        classification={selectedAnalysis.classification}
                        detection={selectedAnalysis.detection}
                        segmentation_classes={selectedAnalysis.segmentation_classes}
                    />
                </div>
            </div>
        );
    }

    // History list view
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primaryDark bg-clip-text text-transparent mb-4">
                        📊 Analysis History
                    </h1>
                    <p className="text-lg text-gray-600">
                        View your past pet detection analyses
                    </p>
                </div>

                {history.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 shadow-lg text-center">
                        <div className="text-6xl mb-4">🐾</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Analysis History</h2>
                        <p className="text-gray-600 mb-6">You haven't analyzed any images yet. Start by uploading your first pet photo!</p>
                        <a 
                            href="/analyze"
                            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primaryDark transition font-medium"
                        >
                            🔍 Analyze Your First Image
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {history.map((analysis) => (
                            <div key={analysis._id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                
                                <div className="relative h-48 bg-gray-100">
                                    <img 
                                        src={`data:image/jpeg;base64,${analysis.inputImage}`}
                                        alt="Analysis thumbnail"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
                                        {analysis.classification}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-lg font-bold text-gray-800">
                                            Pet Analysis
                                        </h3>
                                        <span className="text-sm text-gray-500">
                                            {formatDate(analysis.createdAt)}
                                        </span>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Processing Time:</span>
                                            <span className="font-medium">{(analysis.processingTime / 1000).toFixed(2)}s</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Objects Detected:</span>
                                            <span className="font-medium">{analysis.detection?.length || 0}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Segmented Classes:</span>
                                            <span className="font-medium">
                                                {Array.isArray(analysis.segmentation_classes) 
                                                    ? analysis.segmentation_classes.length 
                                                    : 1}
                                            </span>
                                        </div>
                                    </div>
                                    {
                                        loadingDetails?
                                        <button
                                            disabled
                                            className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed"
                                        >
                                            <span>Loading Details...</span>
                                        </button>
                                        :
                                        <button
                                            onClick={() => handleViewDetails(analysis)}
                                            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primaryDark transition font-medium flex items-center justify-center space-x-2 cursor-pointer"
                                        >
                                            <span>View Details</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default History;
