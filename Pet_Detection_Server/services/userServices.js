import PictureModel from "../Models/PictureModel.js";

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
        const start_time = Date.now();

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

        const processing_time = Date.now() - start_time;

        console.log(`Processing time: ${processing_time} ms`); 

        console.log(`classification: ${data.classification}`)
        data.detection.forEach((detection, index) => { console.log(`detection: ${detection.label} (${detection.confidence})`) });
        console.log(`segmentation_classes: ${data.segmentation_classes}`)

        // Save the analysis result to the database
        const picture = new PictureModel({
            userId: req.user._id,
            inputImage: image_base64,
            classification: data.classification,
            detection: data.detection,
            segmentation_classes: data.segmentation_classes,
            classificationImage: data.classification_image_base64,
            detectionImage: data.detection_image_base64,
            segmentationImage: data.segmentation_image_base64,
            processingTime: processing_time,
        });

        await picture.save();


        return res.status(200).json({
            status: 1,
            result: {
                classification: data.classification,
                detection: data.detection,
                segmentation_classes: data.segmentation_classes,

                classificationImage: data.classification_image_base64,
                detectionImage: data.detection_image_base64,
                segmentationImage: data.segmentation_image_base64,
                
                processingTime: processing_time,
            },
        });
    } catch (error) {
        console.error("Error analyzing image:", error);
        return res.status(500).json({ status: 0, message: "Internal Server Error" });
    }
};

export const getAnalysisHistory = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const history = await PictureModel.find({ userId }).sort({ createdAt: -1 });

        return res.status(200).json({
            status: 1,
            history: history.map(picture => ({
                _id: picture._id,
                inputImage: picture.inputImage,
                classification: picture.classification,
                detection: picture.detection,
                segmentation_classes: picture.segmentation_classes,
                classificationImage: picture.classificationImage,
                detectionImage: picture.detectionImage,
                segmentationImage: picture.segmentationImage,
                processingTime: picture.processingTime,
                createdAt: picture.createdAt,
            })),
        });
    } catch (error) {
        next(error);
    }
};
