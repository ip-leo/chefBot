# ChefBot
This document is a react app that helps users generate a recipe based on the ingredients they already have. Once entered at least three ingredients, ChefBot will provide a suggested recipe based on the current Ingredients. 

To run the app locally, follow these steps:

1. **Clone this repository**

```
git clone https://github.com/ip-leo/chefBot.git
cd chefBot

```
2. **Insert your API key** 

To get the website fully functional, you have prepare your own AI API key, ideally hugging face as the js file imports relevant functions for this model. Open Response.js and and replace the empty string with your actual Hugging Face Inference API key:
```
const hf = new HfInference("") // Replace with your Hugging Face API key

```
3. **Install dependencies**  
```
npm install
```
4. **Start the development server**
```
npm run dev
```
The website should then be rendered and launched at your local server

# How it works

- Enter ingredients one at a time.
- When at least 3 ingredients are present, a "Get Recipe" button appears.
- Click the button so it sends the ingredient list to Hugging Face’s AI model.
- The model returns a full recipe based on those ingredients.
- Click the ChefBot logo resets the app to its initial state.

