'use client';
import { useState } from 'react';
import axios from 'axios';

export default function Questionnaire() {
  const [responses, setResponses] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questions = ["How much do you prefer sweet flavors?", "How much do you like hot drinks?", "How spicy do you like your food?"];

  // State for current slider value
  const [sliderValue, setSliderValue] = useState<number>(5);

  // Function to handle slider value change
  const handleSliderChange = (value: number) => {
    setSliderValue(value);
  };

  const handleSubmit = () => {
    // Add the current slider value to the responses array
    setResponses((prevResponses) => [...prevResponses, sliderValue]);

    // Move to the next question or send responses if it's the last question
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSliderValue(5); // Reset slider to a default middle value
    } else {
      sendResponses([...responses, sliderValue]); // Include the final slider value in the payload
    }
  };

  const sendResponses = async (finalResponses: number[]) => {
    try {
      // Prepare the payload without `localizations` and `RecommendedItemID`
      const payload = {
        data: {
          UserPreferences: JSON.stringify(finalResponses), // Convert the array to a JSON string
          locale: "en" // Default locale, adjust as needed
        }
      };
  
      const res = await axios.post(
        "https://strapi-backend-p33l.onrender.com/api/recommendations",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Recommended Item ID:", res.data.recommended_item_id);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div>
      <h1>Questionnaire</h1>
      <p>{questions[currentQuestion]}</p>

      {/* Slider input for the current question */}
      <input
        type="range"
        min="0"
        max="10"
        value={sliderValue}
        onChange={(e) => handleSliderChange(Number(e.target.value))}
      />
      <p>Selected value: {sliderValue}</p>

      {/* Submit button to go to the next question or finish */}
      <button onClick={handleSubmit}>
        {currentQuestion < questions.length - 1 ? "Next" : "Submit"}
      </button>
    </div>
  );
}
