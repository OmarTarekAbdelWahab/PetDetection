function History() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-primary/5 to-primaryDark/5 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center mb-6">History</h1>
                <p className="text-gray-600 text-center mb-4">Your past analyses will be displayed here.</p>
                {/* Future implementation for displaying history */}
                <div className="text-center text-gray-500">No history available yet.</div>
            </div>
        </div>
    );
};

export default History;
