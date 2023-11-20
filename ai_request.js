const fs = require('fs');
const path = require('path');
require('dotenv').config();
const openai = require('openai');

const apiKeyPath = process.env.OPENAI_API_KEY_PATH;

class Recipe {
    constructor(name, ingredients, directions) {
        this.name = name;
        this.ingredients = ingredients;
        this.directions = directions;
    }

    addIngredient(ingredient) {
        this.ingredients.push(ingredient);
    }

    removeIngredient(ingredient) {
        const index = this.ingredients.indexOf(ingredient);
        if (index !== -1) {
            this.ingredients.splice(index, 1);
        }
    }

    addDirection(direction) {
        this.directions.push(direction);
    }

    removeDirection(direction) {
        const index = this.directions.indexOf(direction);
        if (index !== -1) {
            this.directions.splice(index, 1);
        }
    }

    getIngredients() {
        return this.ingredients;
    }

    getDirections() {
        return this.directions;
    }
}

function createRecipe(response) {
    try {
        const responseString = response.choices[0].message.content;

        // Check if the response appears to be in JSON format
        if (responseString.startsWith("{")) {
            const assistantResponse = JSON.parse(responseString);
            const name = assistantResponse.Name || "Unknown Recipe";
            const ingredients = assistantResponse.Ingredients || [];
            const directions = assistantResponse.Directions || [];
            return new Recipe(name, ingredients, directions);
        } else {
            console.error("Assistant's response is not in the expected JSON format.");
            return new Recipe("Unknown Recipe", [], []);
        }
    } catch (error) {
        console.error("Error parsing the Assistant's response:", error);
        return new Recipe("Unknown Recipe", [], []);
    }
}

async function fetchAssistantResponse(client, foodName) {
    try {
        const conversation = [
            { role: 'user', content: `Give me the ingredients and directions to make ${foodName}. I want it in JSON format with Name (String), Ingredients (String array), and Directions (String array), to be the fields.` },
        ];

        const response = await client.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: conversation,
        });

        const recipe = createRecipe(response);

        return recipe;
    } catch (error) {
        console.error(error);
        return null;
    }
}

function handleGPT(recipeName) {
    if (fs.existsSync(apiKeyPath)) {
        const apiKey = fs.readFileSync(path.resolve(apiKeyPath), 'utf8').trim();
        console.log(apiKey);

        const client = new openai({ apiKey });
        const foodName = recipeName;

        return fetchAssistantResponse(client, foodName);
    } else {
        console.error('API Key not found\n');
        return null;
    }
}

exports.setApp = function (app, client) {
    app.post('/api/gpt_recipe', async (req, res) => {
        const { recipeName } = req.body;

        try {
            const recipe = await handleGPT(recipeName);
            res.status(200).json({ RecipeName: recipe.name, Ingredients: recipe.getIngredients(), Directions: recipe.getDirections() });
        } catch (error) {
            console.error('Error', error);
            res.status(400).json({ error: 'Internal error' });
        }
    });
};
