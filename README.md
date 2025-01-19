# Personalized AI / Gemini Wrapper Website

## Prerequisites

### Setting up Environment Variables

#### To use the Gemini API and other services, you need to set up the following environment variables. Here's how you can do it:

1. **Create a `.env.local` file** in the root of your project directory.
2. Add the following variables to your `.env.local` file:

    ```bash
    # NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyBz1BJZOg_kdmz-....
    # NEXT_PUBLIC_API_ID=sf246c5-82c26c-46c5.....
    ```

    **Where to get the values:**
    - **Gemini API Key**: Get your API key from [AI Studio](https://aistudio.google.com/app/apikey).
    - **Mocki API ID**: Get your API ID from [Mocki](https://mocki.io/). You can also replace the Mocki URL with your own API endpoint if you prefer.

### Default API Request

The current code uses a mock API to fetch profile data:

    
    const response = await fetch(
        `https://mocki.io/v1/${process.env.NEXT_PUBLIC_API_ID}`
    );
    

To use your own API, replace the URL above with your actual API:

   
    const response = await fetch('your-api-endpoint-url');
    

### JSON response format:

    
    {
      "username": "John Doe",
      "image": "https://i.pinimg.com/736x/48/8c/06/488c06e3722a90bc2b093247bbf75322.jpg",
      "data": "John Doe offers daily advice and reflections to keep you motivated. His insights focus on personal growth, mindfulness, and productivity."
    }
   

