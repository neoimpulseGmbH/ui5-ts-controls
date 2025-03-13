# ui5-ts-controls

## Project Description

The **ui5-ts-controls** project provides a collection of custom UI5 controls written in TypeScript. These controls are designed to simplify and accelerate the development of UI5 applications by offering enhanced functionalities and improved type safety.

### Key Features

- **TypeScript Support**: All controls are written in TypeScript, enabling better type safety and development support through modern IDEs.
- **Extensibility**: The controls are designed to be easily extended and customized to meet specific requirements.
- **Compatibility**: The controls are fully compatible with the UI5 library and can be seamlessly integrated into existing UI5 applications.

### Available Components

- **NeoCamera**: A custom control for capturing images using the device's camera.
- **NeoSignature**: A custom control for capturing signatures.
- **NeoMultiComboBox**: A custom control that extends the MultiComboBox with additional functionalities.

### Installation

To install the library, run the following command:

```sh
npm install ui5-ts-controls
```

### Usage

Import the required controls into your UI5 application and use them as usual:

```typescript
import { NeoCamera, NeoSignature, NeoMultiComboBox } from 'ui5-ts-controls';

// Example of using the custom controls
const myCamera = new NeoCamera({
    width: "100%",
    height: "100%",
    takePicture: () => {
        alert("Picture taken!");
    }
});

const mySignature = new NeoSignature({
    width: "275px",
    height: "200px",
    capturedSignature: (event) => {
        console.log("Signature captured:", event.getParameter("signature"));
    }
});

const myMultiComboBox = new NeoMultiComboBox({
    entriesPath: "/path/to/entries",
    entriesKeyPath: "key",
    selectionChange: (event) => {
        console.log("Selection changed:", event.getParameter("selectedItems"));
    }
});
```

### Contribution

Contributions to this project are welcome! Please open an issue or a pull request on GitHub to report bugs or suggest new features.

### License

This project is licensed under the Apache License Version 2.0. For more information, see the LICENSE file.
