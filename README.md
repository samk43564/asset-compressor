
# Compress Image API

A simple image compression API built using Express.js. This API allows you to upload images and compress them to reduce file size, making them easier to store and transfer. This project is part of the Hacktoberfest 2024 event, and we welcome open-source contributions!

## Features

- Upload an image via POST request
- Compresses images to a smaller size while maintaining quality
- Supports multiple image formats (JPEG, PNG, etc.)
- Returns the compressed image as a response

## Tech Stack

- Node.js
- Express.js
- Multer for file uploads
- Sharp for image processing

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine.

```bash
node -v
npm -v
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/compress-image-api.git
cd compress-image-api
```

2. Install dependencies:

```bash
npm install
```

### Running the API

To start the server, run:

```bash
npm start
```

The API will be running on `http://localhost:3000`.

### API Endpoints

#### POST /compress

Uploads and compresses an image.

**Request:**

- `Content-Type: multipart/form-data`
- Image file should be sent in the `image` field.

**Response:**

- Returns the compressed image file.

## Contributing

We welcome contributions from everyone! To participate in Hacktoberfest, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add feature'`).
4. Push to your fork (`git push origin feature-branch`).
5. Submit a pull request.

Make sure to read the [CONTRIBUTING.md](CONTRIBUTING.md) file for more details on how to contribute.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Hacktoberfest

This repository is participating in [Hacktoberfest 2024](https://hacktoberfest.com). Feel free to make your first contributions by checking out the open issues!

Happy coding! 🎉
