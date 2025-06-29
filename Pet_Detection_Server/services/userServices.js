export const getUser = async (req, res, next) => {
    try {
        const user = {
            username: req.user.username,
            email: req.user.email,
            loginCount: req.user.loginCount,
            createdAt: req.user.createdAt,
        };
        
        return res.status(200).json({ status: 1, user });
    } catch (error) {
        next(error);
    }
};

export const analyzeImage = async (req, res, next) => {
    const { image_base64 } = req.body;
    
    console.log("Analyzing image...");
    // send the image to the model 
    try {
        const response = await fetch(process.env.MODEL_URI, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image_base64 }),
            timeout: 1000 * 60 * 10, // 10 minutes timeout
        });

        if (!response.ok) {
            throw new Error('Failed to analyze image');
        }

        const data = await response.json();

        console.log(`classification: ${data.classification}`)
        console.log(`detection: ${data.detection}`)
        console.log(`segmentation_classes: ${data.segmentation_classes}`)

        return res.status(200).json({
            status: 1,
            photos: {
                classification_image_base64: data.classification_image_base64,
                detection_image_base64: data.detection_image_base64,
                segmentation_image_base64: data.segmentation_image_base64,
            }
        });
    } catch (error) {
        console.error("Error analyzing image:", error);
        return res.status(500).json({ status: 0, message: "Internal Server Error" });
    }
    return res.status(200).json({
        status: 1,
        output_photos: {

        }
    });
};