# Image Generation with ImageRouter

All image generation capabilities in Chat Thang will be powered by the ImageRouter.io API.

## API Integration

When a user selects a model designated for image generation, the application will send requests to the ImageRouter API instead of OpenRouter.

### API Endpoint

- **URL:** `https://api.imagerouter.io/v1/openai/images/generations`
- **Method:** `POST`

### Authentication

- The API key for ImageRouter must be included in the `Authorization` header as a Bearer token.

### Request Body

The request body will be a JSON object with the following parameters:

- `prompt` (string): The text prompt for generating the image.
- `model` (string): The specific image generation model to use (e.g., `dall-e-3`).
- `quality` (string, optional): The desired quality of the generated image (e.g., `low`, `medium`, `high`). Defaults to `auto`.
- `response_format` (string, optional): The format of the response. Defaults to `url`.

## Model Discovery

The application can fetch a list of available image generation models from the following endpoint:

- **URL:** `https://api.imagerouter.io/v1/models`
- **Method:** `GET`

This can be used to dynamically update the list of available image generation models in the UI.
