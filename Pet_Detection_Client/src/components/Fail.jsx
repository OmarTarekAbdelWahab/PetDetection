function Fail({ text, tryAgainHandler, errorMessage="Try Again"}) {
    return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-8 flex items-center justify-center">
                <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{text}</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button 
                        onClick={tryAgainHandler}
                        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primaryDark transition"
                    >
                        {errorMessage}
                    </button>
                </div>
            </div>
        );
};

export default Fail;