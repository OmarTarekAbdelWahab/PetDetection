# Pet Detection

A comprehensive deep learning application for pet detection and analysis using advanced computer vision techniques including classification, detection, and semantic segmentation.

## Overview

Pet Detection is a full-stack web application that leverages state-of-the-art deep learning models to identify, locate, and segment pets in images. The application combines three powerful computer vision tasks:

- **Classification**: Identifies the main object/pet in an image using ResNet50
- **Detection**: Locates and highlights pets using YOLOv5
- **Segmentation**: Performs semantic segmentation to identify object boundaries using DeepLabv3

## Features

✨ **Multi-task Computer Vision Pipeline**
- Image classification with ImageNet labels
- Real-time object detection with bounding boxes
- Semantic segmentation with pixel-level accuracy

🚀 **FastAPI Backend**
- RESTful API endpoints for image analysis
- Base64 image encoding support
- CORS enabled for cross-origin requests

🎨 **Visual Feedback**
- Annotated detection images with confidence scores
- Color-coded segmentation masks
- Classification labels overlaid on images

📦 **Containerized Deployment**
- Docker support for easy deployment
- Reproducible environment setup
- Ready for production deployment

## Screenshots
<img width="1205" height="686" alt="image" src="https://github.com/user-attachments/assets/bff6bf86-763b-4257-af63-2a59d50ca870" />

<img width="996" height="668" alt="image" src="https://github.com/user-attachments/assets/a1ba4475-841d-406c-9a33-049e1b7b9339" />

<img width="1103" height="615" alt="image" src="https://github.com/user-attachments/assets/618dee59-93e3-465c-8a4d-844482536ea6" />
<img width="1131" height="614" alt="image" src="https://github.com/user-attachments/assets/a45b6439-59d9-4e9b-bfa8-ce3b20127349" />


## Architecture

### Backend (Pet-Detection-Fast-API)
Built with **FastAPI**, providing:
- `/analyze` endpoint for comprehensive image analysis
- Integration with pre-trained deep learning models
- Response includes classification, detection, and segmentation results

### Models Used
- **ResNet50**: For image classification (pretrained on ImageNet)
- **YOLOv5**: For object detection with real-time performance
- **DeepLabv3 + ResNet50**: For semantic segmentation

### Frontend
- Modern web interface (JavaScript-based)
- Image upload and preview
- Real-time results visualization
- History tracking of analyzed images

## Tech Stack

- **Backend**: FastAPI, PyTorch, TorchVision, Node.js
- **Frontend**: JavaScript, HTML, CSS
- **ML Models**: YOLOv5, ResNet50, DeepLabv3
- **Deployment**: Docker
- **Python**: 3.8+

## Installation

### Prerequisites
- Python 3.8 or higher
- Docker (optional, for containerized deployment)
- CUDA-capable GPU (optional, for faster processing)

### Local Setup

1. **Clone the repository**
```bash
git clone https://github.com/OmarTarekAbdelWahab/PetDetection.git
cd PetDetection
```

## Model Details

### Classification (ResNet50)
- Pretrained on ImageNet1K
- 1000 object classes
- Input: 224×224 RGB images
- Output: Class label with confidence

### Detection (YOLOv5)
- Pretrained YOLOv5 Small
- Detects 80 object classes including pets
- Real-time performance
- Output: Bounding boxes with confidence scores

### Segmentation (DeepLabv3)
- ResNet50 backbone with DeepLabv3 decoder
- 21 object classes
- Pixel-level semantic segmentation
- Output: Segmentation mask with class IDs

## Features & Enhancements

- ✅ Multi-task learning pipeline
- ✅ Base64 image encoding support
- ✅ CORS enabled for web requests
- ✅ Annotated output images
- ✅ Docker containerization
- ✅ RESTful API design
- ✨ History tracking
- ✨ File size validation
- ✨ Enhanced UI with settings


## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## License

This project is open source. Please check the repository for license information.

## Author

**Omar Tarek Abdel Wahab**

- GitHub: [@OmarTarekAbdelWahab](https://github.com/OmarTarekAbdelWahab)
- Repository: [PetDetection](https://github.com/OmarTarekAbdelWahab/PetDetection)

## Support

For issues, questions, or suggestions, please open an issue on the [GitHub repository](https://github.com/OmarTarekAbdelWahab/PetDetection/issues).
