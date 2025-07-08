# Image Crop Modal - Snapshot Edition

A modern Next.js application for image cropping and management with a beautiful snapshot gallery interface. This project demonstrates advanced image manipulation capabilities using React Easy Crop and provides an intuitive user experience for uploading, cropping, and managing images.

## 🚀 Features

- **Advanced Image Cropping**: Interactive crop area with zoom and rotation controls
- **Drag & Drop Upload**: Seamless file upload with drag and drop support
- **Snapshot Gallery**: Beautiful grid layout to display all cropped images
- **Real-time Preview**: Live preview of crop adjustments
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark/Light Theme**: Built-in theme support with next-themes
- **TypeScript**: Full type safety throughout the application

## 📸 Snapshots

### Main Gallery Interface

![Image Gallery Interface](./public/snapshot/截圖%202025-07-07%20下午5.23.21.png)

### Cropping Modal

![Cropping Modal](./public/snapshot/截圖%202025-07-07%20下午5.23.29.png)

### Image Management

![Image Management](./public/snapshot/截圖%202025-07-07%20下午5.23.56.png)

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Image Cropping**: React Easy Crop
- **File Upload**: React Dropzone
- **Theme**: Next Themes
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd practice-image-crop-modal
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [https://localhost:3000](https://localhost:3000) with your browser to see the result.

## ⚠️ Important Production Notice

**This application is designed for development environment only.**

### Development vs Production

- ✅ **Development (`npm run dev`)**: Works perfectly with local file system
- ❌ **Production (`npm start`)**: Will have issues reading images from local folders

### Production Deployment

For production deployment, you should:

1. **Use Cloud Storage Services**:

   - AWS S3
   - Google Cloud Storage
   - Azure Blob Storage
   - Cloudinary
   - Vercel Blob Storage

2. **Update Image Storage Logic**:

   - Replace local file system operations with cloud storage APIs
   - Implement proper image upload endpoints
   - Configure CORS and security policies

3. **Environment Configuration**:
   - Set up environment variables for cloud storage credentials
   - Configure proper image URLs and CDN settings

### Why This Limitation?

The current implementation uses local file system operations that are not available in production environments due to:

- Runtime file system restrictions
- Security limitations
- Stateless deployment requirements

## 📁 Project Structure

```
src/
├── app/
│   ├── api/           # API routes for image handling
│   ├── imageController/ # Main image management page
│   └── layout.tsx     # Root layout
├── components/
│   ├── composite/     # Complex UI components
│   ├── provider/      # Context providers
│   └── ui/           # Reusable UI components
├── entities/          # TypeScript interfaces
├── lib/              # Utility functions
├── store/            # Data storage
└── utils/            # Helper functions
```

## 🎯 Key Components

- **UploadCropper**: Handles image upload and cropping functionality
- **ImageBoard**: Displays the gallery of cropped images
- **TriggerDialog**: Modal dialog for cropping interface
- **ImageBoardDeleteButton**: Delete functionality for images

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

The application uses Tailwind CSS for styling and includes:

- Custom color schemes
- Responsive breakpoints
- Dark/light theme support
- Smooth animations and transitions

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Next.js and modern web technologies.
