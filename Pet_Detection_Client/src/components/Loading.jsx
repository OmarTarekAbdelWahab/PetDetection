function Loading({ text }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-8 flex items-center justify-center">
            <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center space-x-3">
                    <svg className="animate-spin h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24">
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
                    <span className="text-lg font-medium text-gray-700">{text}</span>
                </div>
            </div>
        </div>
    );
};

export default Loading;