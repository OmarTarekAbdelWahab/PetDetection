import { formatDate, formatProcessingTime } from "../utils/utility";

function AnalysisDetails({
    title = "Analysis Details",
    analysisTimeString, 
    images,
    processingTime, 
    classification,
    detection,
    segmentation_classes,
}) {
    return (
        <div>
            <div className="bg-white rounded-xl p-6 shadow-lg mb-8 border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
                        <p className="text-gray-600">Analyzed on {formatDate(analysisTimeString)}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <div className="flex items-center justify-center space-x-2">
                                <div className="bg-green-100 p-2 rounded-full">
                                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <span className="text-green-700 font-medium">
                                    Processed in {formatProcessingTime(processingTime)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Original Image */}
            {images.input && <div className="bg-white rounded-xl p-6 shadow-lg mb-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Original Image</h2>
                <div className="flex justify-center">
                    <img
                        src={images.input}
                        alt="Original"
                        className="max-w-md max-h-64 rounded-lg shadow-md border border-gray-200"
                    />
                </div>
            </div>}

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Classification */}
                <div className="flex flex-col items-center bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-primary pb-2">
                        Classification
                    </h3>
                    <img
                        src={images.class}
                        alt="Classification"
                        className="w-full h-auto rounded-lg border border-gray-200 mb-6 shadow-sm"
                    />
                    <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                                Detected Animal:
                            </span>
                            <span className="text-lg font-bold text-primary bg-white px-3 py-1 rounded-full shadow-sm">
                                {classification}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-primary pb-2">Detection</h3>
                    <img
                        src={images.detect}
                        alt="Detection"
                        className="w-full h-auto rounded-lg border border-gray-200 mb-6 shadow-sm"
                    />

                    <div className="w-full overflow-hidden rounded-lg border border-gray-200">
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-b border-gray-200">
                            <div className="grid grid-cols-3 gap-4">
                                <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Object</span>
                                <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                                    Confidence
                                </span>
                                <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                                    Bounding Box
                                </span>
                            </div>
                        </div>

                        <div className="max-h-32 overflow-y-auto">
                            {Array.isArray(detection) && detection.length > 0 ? (
                                detection.map((det, idx) => (
                                    <div
                                        key={idx}
                                        className={`px-4 py-3 border-b border-gray-100 last:border-b-0 ${
                                            idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        } hover:bg-blue-50 transition-colors`}
                                    >
                                        <div className="grid grid-cols-3 gap-4 items-center">
                                            <span className="text-sm font-medium text-gray-800 capitalize">
                                                {det.label}
                                            </span>
                                            <div className="flex items-center">
                                                <div className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
                                                    {(det.confidence * 100).toFixed(1)}%
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded">
                                                {det.bbox.join(", ")}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-8 text-center">
                                    <div className="text-gray-400">
                                        <svg
                                            className="mx-auto h-12 w-12 mb-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1}
                                                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.824-2.562M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                            />
                                        </svg>
                                        <p className="text-sm font-medium">No objects detected</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-primary pb-2">
                        Segmentation
                    </h3>
                    <img
                        src={images.segment}
                        alt="Segmentation"
                        className="w-full h-auto rounded-lg border border-gray-200 mb-6 shadow-sm"
                    />
                    <div className="w-full bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                        <div className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                                Segmented Classes:
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {Array.isArray(segmentation_classes) ? (
                                    segmentation_classes.map((className, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-white text-purple-700 text-sm font-medium px-3 py-1 rounded-full shadow-sm border border-purple-200 capitalize"
                                        >
                                            {className}
                                        </span>
                                    ))
                                ) : (
                                    <span className="bg-white text-purple-700 text-sm font-medium px-3 py-1 rounded-full shadow-sm border border-purple-200 capitalize">
                                        {segmentation_classes}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnalysisDetails;
