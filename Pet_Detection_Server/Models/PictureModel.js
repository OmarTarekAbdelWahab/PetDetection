import mongoose from "mongoose";

const PictureModelSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        inputImage: {
            type: String, // Base64 string
            required: true,
        },
        classification: {
            type: String,
        },
        detection: [{
            label: String,
            confidence: Number,
            bbox: [Number],
        }],
        segmentation_classes: [String],
        // Output images
        classificationImage: {
            type: String, // Base64 string
        },
        detectionImage: {
            type: String, // Base64 string
        },
        segmentationImage: {
            type: String, // Base64 string
        },
        processingTime: {
            type: Number, // Time in milliseconds
        },
    },
    { timestamps: true }
);

PictureModelSchema.index({ userId: 1, createdAt: -1 });

const PictureModel = mongoose.model("Picture", PictureModelSchema);

export default PictureModel;
