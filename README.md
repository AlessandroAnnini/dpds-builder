# DPDS Builder

<div align="center">

![Version](https://img.shields.io/badge/Version-1.0.1-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A dynamic editor for Data Product Descriptor Specifications with JSON Schema validation.

</div>

## 📋 Overview

DPDS Builder is a specialized tool designed to streamline the creation and editing of Data Product Descriptor Specifications. It provides an interactive interface to manipulate JSON data conforming to predefined schemas, with built-in validation and a user-friendly form interface.

## ✨ Key Features

- 🔄 **Dynamic Form Generation** - Automatically generates interactive forms from JSON schemas
- 📋 **Data Product Schema Support** - Built-in support for Data Product Descriptor Specifications
- 🔍 **Schema Validation** - Real-time validation of form data against the loaded schema
- 📤 **Data Import/Export** - Load existing JSON data and schemas from files
- 🎨 **Modern UI** - Clean, responsive interface built with React and Tailwind CSS
- 📝 **Custom UI Schemas** - Control the appearance and behavior of form fields

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14.18+ or 16+)
- npm, yarn, or pnpm

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/dpds-builder.git
   cd dpds-builder
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open your browser and visit `http://localhost:5173`

## 💻 Usage

### Loading a Schema

The application provides two ways to load a schema:

1. **Use Built-in DPDS Schema**: Click the "Data Product Descriptor Specs" button to load the built-in schema.
2. **Load Custom Schema**: Use the schema loader to upload your own JSON Schema file.

### Loading Form Data

Once a schema is loaded, you can:

1. Click on "Load Form Data" to import existing JSON data that conforms to the schema.
2. The imported data will be validated against the schema automatically.
3. Validation results will be displayed as toast notifications.

### Editing Form Data

The dynamic form interface allows you to:

1. Edit data through a user-friendly form that's generated based on the schema.
2. Reset the form to its initial state using the "Reset" button.
3. Validate data as you type (optional).

## 🧩 Core Components

### App Component

The main application container that:

- Manages application state
- Handles schema loading
- Orchestrates the interaction between different components

### DynamicForm Component

A powerful form generator that:

- Converts JSON schemas into interactive forms
- Provides validation against the schema
- Supports custom UI schemas for tailored appearances
- Handles form data changes and submissions

### SchemaLoader Component

Allows users to:

- Upload custom JSON Schema files
- Process and validate the schemas before use

### DataLoader Component

Enables users to:

- Import existing JSON data files
- Validate the data against the current schema
- Display feedback about validation results

## 🛠️ Technologies Used

- **React** - UI framework
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Styling
- **React JSON Schema Form** - Form generation
- **Ajv** - JSON Schema validation
- **Shadcn UI** - UI components
