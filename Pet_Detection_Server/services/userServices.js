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
        console.log(`Image analysis completed in ${processing_time}ms`);

        console.log(`classification: ${data.classification}`)
        data.detection.forEach((detection, index) => { console.log(`detection: ${detection.label} (${detection.confidence})`) });
        console.log(`segmentation_classes: ${data.segmentation_classes}`)

        console.log(`input_image_base64 size: ${image_base64 ? Buffer.byteLength(image_base64, 'base64') : 0} bytes`);
        console.log(`classification_image_base64 size: ${data.classification_image_base64 ? Buffer.byteLength(data.classification_image_base64, 'base64') : 0} bytes`);
        console.log(`detection_image_base64 size: ${data.detection_image_base64 ? Buffer.byteLength(data.detection_image_base64, 'base64') : 0} bytes`);
        console.log(`segmentation_image_base64 size: ${data.segmentation_image_base64 ? Buffer.byteLength(data.segmentation_image_base64, 'base64') : 0} bytes`);

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
        const startTime = Date.now();
        const history = await PictureModel.find({ userId }, {
            classificationImage: 0,
            detectionImage: 0,
            segmentationImage: 0,
        }).sort({ createdAt: -1 });
        console.log(`Fetched ${history.length} analysis records in ${Date.now() - startTime}ms`);

        return res.status(200).json({
            status: 1,
            history: history.map(picture => ({
                _id: picture._id,
                inputImage: picture.inputImage,
                classification: picture.classification,
                detection: picture.detection,
                segmentation_classes: picture.segmentation_classes,
                processingTime: picture.processingTime,
                createdAt: picture.createdAt,
            })),
        });
    } catch (error) {
        next(error);
    }
};

export const getAnalysisDetails = async (req, res, next) => {
    try {
        const { analysisId } = req.params;
        const userId = req.user._id;

        const startTime = Date.now();
        const analysis = await PictureModel.findOne({ _id: analysisId, userId }, {
            inputImage: 0,
            classification: 0,
            detection: 0,
            segmentation_classes: 0,
            processingTime: 0,
            createdAt: 0,
        });

        console.log(`Fetched analysis details in ${Date.now() - startTime}ms`);

        if (!analysis) {
            return res.status(404).json({ status: 0, message: "Analysis not found" });
        }

        return res.status(200).json({
            status: 1,
            analysis: {
                _id: analysis._id,
                classificationImage: analysis.classificationImage,
                detectionImage: analysis.detectionImage,
                segmentationImage: analysis.segmentationImage,
            },
        });
    } catch (error) {
        next(error);
    }
};



