import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

const mockFoodOptions = [
  { name: "Protein Bowl at Local Point", type: "high-protein", restriction: "none", location: "HUB", calories: 550, img: "" },
  { name: "Chicken Breast & Quinoa", type: "high-protein", restriction: "gluten-free", location: "HUB", calories: 520, img: "" },
  { name: "Greek Yogurt Parfait", type: "high-protein", restriction: "vegetarian", location: "West Campus", calories: 390, img: "" },
  { name: "Turkey Wrap", type: "cheat-day", restriction: "none", location: "North Campus", calories: 450, img: "" },
  { name: "Egg White Omelet", type: "low-calorie", restriction: "vegetarian", location: "U District", calories: 400, img: "" },
  { name: "Salad Bar at District Market", type: "low-calorie", restriction: "vegan", location: "U District", calories: 350, img: "" },
  { name: "Tofu Stir Fry", type: "high-protein", restriction: "vegan", location: "West Campus", calories: 420, img: "" },
  { name: "Vegan Chili", type: "low-calorie", restriction: "vegan", location: "HUB", calories: 380, img: "" },
  { name: "Lentil Soup", type: "cheat-day", restriction: "vegan", location: "North Campus", calories: 310, img: "" },
  { name: "Avocado Toast", type: "cheat-day", restriction: "vegan", location: "U District", calories: 330, img: "" }
];

const gymSplits = {
  PPL: ["Push", "Pull", "Legs", "Push", "Pull", "Legs", "Rest"],
  Arnold: ["Chest/Back", "Shoulders/Arms", "Legs", "Chest/Back", "Shoulders/Arms", "Legs", "Rest"],
  "Bro Split": ["Chest", "Back", "Shoulders", "Arms", "Legs", "Abs", "Rest"],
  "Upper/Lower": ["Upper", "Lower", "Rest", "Upper", "Lower", "Rest", "Rest"],
  "Full Body": ["Full Body", "Full Body", "Rest", "Full Body", "Full Body", "Rest", "Rest"]
};

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function App() {
  const [goal, setGoal] = useState("high-protein");
  const [restriction, setRestriction] = useState("none");
  const [results, setResults] = useState<any[]>([]);
  const [calories, setCalories] = useState(0);
  const [weeklyMeals, setWeeklyMeals] = useState<any[]>([]);
  const [userName, setUserName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [language, setLanguage] = useState("English");
  const [workout, setWorkout] = useState("no");
  const [selectedSplit, setSelectedSplit] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    const dayIndex = new Date().getDay();
    const day = weekDays[dayIndex];
    const baseGreeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";
    let finalGreeting = `${baseGreeting}, ${userName}! Happy ${day}.`;
    if (workout === "yes" && selectedSplit && gymSplits[selectedSplit]) {
      const todayWorkout = gymSplits[selectedSplit][dayIndex];
      finalGreeting += ` Let's have a great ${todayWorkout.toLowerCase()} day today!`;
    }
    setGreeting(finalGreeting);
  }, [userName, workout, selectedSplit]);

  const handleFilter = () => {
    const filtered = mockFoodOptions.filter(option => option.type === goal && (restriction === "none" || option.restriction === restriction));
    setResults(filtered);
    const total = filtered.reduce((acc, curr) => acc + curr.calories, 0);
    setCalories(total);
  };

  const addToWeekly = (meal: any) => {
    setWeeklyMeals(prev => [...prev, meal]);
  };

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!submitted) {
    return (
      <div className="p-6 max-w-xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold text-center text-purple-700">Welcome to Meal Map 💪</h1>
        <form onSubmit={handleUserSubmit} className="space-y-4">
          <Select onValueChange={setLanguage} defaultValue={language}>
            <SelectTrigger>
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Spanish">Spanish</SelectItem>
              <SelectItem value="French">French</SelectItem>
              <SelectItem value="Chinese">Chinese</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />

          <div className="space-y-1">
            <label className="text-sm font-semibold">Do you have dietary restrictions?</label>
            <Select onValueChange={setRestriction} defaultValue="none">
              <SelectTrigger>
                <SelectValue placeholder="Any dietary restrictions?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="vegan">Vegan</SelectItem>
                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                <SelectItem value="gluten-free">Gluten-Free</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold">Do you go to the gym?</label>
            <Select onValueChange={setWorkout} defaultValue="no">
              <SelectTrigger>
                <SelectValue placeholder="Do you workout?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {workout === "yes" && (
            <div className="space-y-1">
              <label className="text-sm font-semibold">Select your split</label>
              <Select onValueChange={setSelectedSplit}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your gym split" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(gymSplits).map((split, idx) => (
                    <SelectItem key={idx} value={split}>{split}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Button type="submit" className="bg-purple-600 text-white hover:bg-purple-700 w-full font-semibold">
            Continue
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-purple-700">{greeting}</h1>
      <p className="text-muted-foreground">Find healthy food near your classes.</p>

      <div className="flex flex-col md:flex-row gap-4">
        <Select onValueChange={setGoal} defaultValue={goal}>
          <SelectTrigger className="w-full md:w-1/2">
            <SelectValue placeholder="What are you craving?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high-protein">High Protein</SelectItem>
            <SelectItem value="low-calorie">Low Calorie</SelectItem>
            <SelectItem value="cheat-day">Cheat Day</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleFilter} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold">
          Find Meals
        </Button>
      </div>

      <div className="grid gap-4">
        {results.map((meal, idx) => (
          <Card key={idx}>
            <CardContent className="p-4">
              {meal.img && <img src={meal.img} alt={meal.name} className="rounded-xl mb-2 w-full h-48 object-cover" />}
              <h3 className="text-xl font-semibold">{meal.name}</h3>
              <p className="text-sm text-muted-foreground">Location: {meal.location}</p>
              <p className="text-sm">Calories: {meal.calories}</p>
              <div className="flex flex-row gap-4 mt-2">
                <Button size="sm" className="bg-purple-500 text-white hover:bg-purple-600" onClick={() => addToWeekly(meal)}>
                  Add to Weekly Tracker
                </Button>
                <Button size="sm" variant="outline" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(meal.location + ' University of Washington')}`, '_blank')}>
                  Open in Maps
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {calories > 0 && (
        <div className="mt-2 text-center font-semibold">
          Total Calories from Selected Meals: {calories}
        </div>
      )}

      {weeklyMeals.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Weekly Meal Tracker</h2>
          <ul className="list-disc ml-5 mt-2">
            {weeklyMeals.map((meal, idx) => (
              <li key={idx}>{meal.name} — {meal.calories} cal</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
