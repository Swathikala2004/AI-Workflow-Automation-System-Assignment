# 🚀 AI-Powered Workflow Automation System

## Overview

The AI-Powered Workflow Automation System is a full-stack web application that digitizes handwritten manufacturing production sheets and converts them into structured, reviewable operational records.

The system uses OCR (Optical Character Recognition) and Generative AI to automatically extract manufacturing data, validate records, provide a human review workflow, and generate operational insights through an analytics dashboard.

---

## Features

### 📄 Document Upload

* Upload manufacturing production sheet images
* Image preview before processing
* Supports OCR-based extraction workflow

### 🔍 OCR Processing

* Extracts text from handwritten and semi-structured documents
* Converts image data into machine-readable text

### 🤖 AI Data Extraction

Automatically extracts:

* Date
* Shift
* Employee Number
* Operation Code
* Machine Number
* Work Order Number
* Quantity Produced
* Time Taken

### ✅ Validation Engine

Automatically validates extracted data:

* Missing Date
* Missing Shift
* Invalid Shift Values
* Missing Machine Number
* Invalid Machine Number Format
* Missing Quantity

Documents with validation issues are marked as:

```text
review_required
```

Valid documents are marked as:

```text
completed
```

### ✏️ Human Review Workflow

Users can:

* Review extracted information
* Correct inaccurate values
* Save updates
* Complete document processing

### 📊 Dashboard Analytics

Displays:

* Total Uploads
* Validation Failures
* Completed Records
* Total Quantity Produced

### 📚 Document History

* View all processed documents
* Search documents by filename
* View validation errors
* Review flagged documents
* Delete documents

---

## System Workflow

```text
Document Upload
       │
       ▼
 OCR Processing
       │
       ▼
 AI Extraction
       │
       ▼
 Validation Engine
       │
 ┌─────┴─────┐
 │           │
 ▼           ▼
Completed   Review Required
 │           │
 ▼           ▼
Dashboard   Human Review
```

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* CSS3
* Recharts

### Backend

* Node.js
* Express.js
* Multer

### Database

* MongoDB
* Mongoose

### AI & OCR

* OCR Service
* OpenRouter API
* Generative AI Models

---

## Project Structure

```text
project-root
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── services
│   ├── uploads
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd project-folder
```

---

## Backend Setup

### Install Dependencies

```bash
cd backend
npm install
```

### Create Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

OPENROUTER_API_KEY=your_openrouter_api_key

OCR_API_KEY=your_ocr_api_key
```

### Start Backend Server

```bash
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

---

## Frontend Setup

### Install Dependencies

```bash
cd frontend
npm install
```

### Start Frontend

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## API Endpoints

### Upload Document

```http
POST /api/documents/upload
```

### Get All Documents

```http
GET /api/documents
```

### Get Single Document

```http
GET /api/documents/:id
```

### Update Document

```http
PUT /api/documents/:id
```

### Delete Document

```http
DELETE /api/documents/:id
```

### Dashboard Statistics

```http
GET /api/dashboard
```

---

## Sample Extracted Record

```json
{
  "date": "18/04/26",
  "shift": "II",
  "employeeNumber": "BT4005",
  "operationCode": "856432",
  "machineNumber": "MC-840",
  "workOrderNumber": "24686870",
  "quantityProduced": 10,
  "timeTaken": 6
}
```

---

## Future Enhancements

* PDF Support
* Batch Processing
* Confidence Scores
* Export to CSV/Excel
* User Authentication
* Role-Based Access Control
* Advanced Analytics Dashboard
* AI Feedback Learning System

---

## Author

**EDIGA SWATHIKALA**

AI-Powered Workflow Automation System

Built using React, Node.js, MongoDB, OCR, and Generative AI.
