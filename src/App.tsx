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
  { name: "Protein Bowl at Local Point", type: "high-protein", restriction: "none", location: "HUB", calories: 550 },
  { name: "Grilled Chicken & Veggies at District Market", type: "high-protein", restriction: "gluten-free", location: "West Campus", calories: 520 },
  { name: "Turkey Sandwich at Husky Den", type: "high-protein", restriction: "none", location: "HUB", calories: 480 },
  { name: "Salmon Rice Bowl at Just Poke", type: "high-protein", restriction: "gluten-free", location: "U District", calories: 540 },
  { name: "Sushi Combo at Sushi Tokyo", type: "high-protein", restriction: "none", location: "U District", calories: 590 },
  { name: "Chicken Shawarma Plate at Aladdin’s", type: "high-protein", restriction: "none", location: "U District", calories: 610 },
  { name: "Egg White Wrap at Starbucks (on campus)", type: "high-protein", restriction: "vegetarian", location: "UW Campus", calories: 350 },
  { name: "Tofu Teriyaki Bowl", type: "high-protein", restriction: "vegan", location: "West Campus", calories: 470 },
  { name: "Lentil Soup with Toast", type: "high-protein", restriction: "vegetarian", location: "HUB", calories: 400 },
  { name: "Gyro Plate at Mr. Greek", type: "high-protein", restriction: "none", location: "U District", calories: 650 },
  { name: "Bibimbap with Egg at Seoul Tofu House", type: "high-protein", restriction: "vegetarian", location: "University Way", calories: 530 },
  { name: "Chicken Caesar Wrap at Morsel", type: "high-protein", restriction: "none", location: "University Ave", calories: 560 },
  { name: "Hummus Power Bowl at District Market", type: "high-protein", restriction: "vegetarian", location: "HUB", calories: 420 },
  { name: "Vegan Burrito at Chipotle", type: "high-protein", restriction: "vegan", location: "U Village", calories: 520 },
  { name: "Spicy Chicken Pita at Togo’s", type: "high-protein", restriction: "none", location: "U District", calories: 500 },
  { name: "Side Salad with Balsamic", type: "low-calorie", restriction: "vegan", location: "District Market", calories: 180 },
  { name: "Tofu Salad Bowl at District Market", type: "low-calorie", restriction: "vegan", location: "West Campus", calories: 350 },
  { name: "Veggie Pho at Pho Shizzle", type: "low-calorie", restriction: "vegetarian", location: "University Ave", calories: 370 },
  { name: "Smoothie Bowl at HeartBeet", type: "low-calorie", restriction: "vegan", location: "U District", calories: 300 },
  { name: "Chickpea Salad at Local Point", type: "low-calorie", restriction: "vegetarian", location: "HUB", calories: 320 },
  { name: "Spring Rolls at Thai Tom", type: "low-calorie", restriction: "gluten-free", location: "University Way", calories: 280 },
  { name: "Miso Soup & Side Rice", type: "low-calorie", restriction: "vegetarian", location: "Sushi Tokyo", calories: 250 },
  { name: "Egg White Omelet", type: "low-calorie", restriction: "vegetarian", location: "U District", calories: 400 },
  { name: "Garden Wrap at Husky Grind", type: "low-calorie", restriction: "vegetarian", location: "West Campus", calories: 330 },
  { name: "Falafel Wrap at Aladdin’s", type: "low-calorie", restriction: "vegetarian", location: "U District", calories: 360 },
  { name: "Cucumber Avocado Roll", type: "low-calorie", restriction: "vegan", location: "U District", calories: 280 },
  { name: "Grilled Veggie Bowl at Chaco Canyon", type: "low-calorie", restriction: "vegan", location: "U District", calories: 390 },
  { name: "Soup of the Day at Local Point", type: "low-calorie", restriction: "vegetarian", location: "HUB", calories: 310 },
  { name: "Kale Quinoa Salad", type: "low-calorie", restriction: "vegan", location: "District Market", calories: 350 },
  { name: "Avocado Toast (light)", type: "low-calorie", restriction: "vegan", location: "U District", calories: 330 },
  { name: "Buffalo Chicken Sandwich at Sweet Alchemy", type: "cheat-day", restriction: "none", location: "U District", calories: 730 },
  { name: "Cheesesteak Sandwich at Big Time Brewery", type: "cheat-day", restriction: "none", location: "University Ave", calories: 750 },
  { name: "Domino’s Pepperoni Pizza (2 slices)", type: "cheat-day", restriction: "none", location: "U District", calories: 640 },
  { name: "Taco Bell Crunchwrap", type: "cheat-day", restriction: "none", location: "University Way", calories: 620 },
  { name: "McDonald’s Big Mac", type: "cheat-day", restriction: "none", location: "University Ave", calories: 560 },
  { name: "Korean Corn Dog", type: "cheat-day", restriction: "none", location: "The Ave", calories: 500 },
  { name: "Donuts from Husky Grind", type: "cheat-day", restriction: "vegetarian", location: "West Campus", calories: 450 },
  { name: "Mozzarella Sticks at Earl's", type: "cheat-day", restriction: "vegetarian", location: "U District", calories: 470 },
  { name: "Nachos from Qdoba", type: "cheat-day", restriction: "vegetarian", location: "The Ave", calories: 680 },
  { name: "Chicken Tenders & Fries", type: "cheat-day", restriction: "none", location: "Local Point", calories: 720 },
  { name: "Vegan Mac n Cheese", type: "cheat-day", restriction: "vegan", location: "Chaco Canyon", calories: 600 },
  { name: "Loaded Fries at HUB Street Food", type: "cheat-day", restriction: "none", location: "HUB", calories: 690 },
  { name: "Beyond Burger at Earl’s", type: "cheat-day", restriction: "vegan", location: "Earl's U District", calories: 700 },
  { name: "Lentil Soup + Grilled Cheese", type: "cheat-day", restriction: "vegetarian", location: "Local Point", calories: 610 },
  { name: "Ice Cream Sundae at Sweet Alchemy", type: "cheat-day", restriction: "vegetarian", location: "U District", calories: 500 },
  { name: "Double Chicken Bowl at Just Poke", type: "high-calorie-and-protein", restriction: "gluten-free", location: "U District", calories: 730 },
  { name: "Beef Burrito at Chipotle", type: "high-calorie-and-protein", restriction: "none", location: "U Village", calories: 760 },
  { name: "Katsu Chicken Plate at Togo’s", type: "high-calorie-and-protein", restriction: "none", location: "U District", calories: 800 },
  { name: "BBQ Chicken Pizza (2 slices)", type: "high-calorie-and-protein", restriction: "none", location: "Local Point", calories: 670 },
  { name: "Breakfast Wrap with Bacon & Eggs", type: "high-calorie-and-protein", restriction: "none", location: "HUB", calories: 680 },
  { name: "Mongolian Beef Bowl", type: "high-calorie-and-protein", restriction: "none", location: "HUB", calories: 750 },
  { name: "Teriyaki Chicken Plate", type: "high-calorie-and-protein", restriction: "none", location: "University Way", calories: 730 },
  { name: "Curry Chicken & Rice", type: "high-calorie-and-protein", restriction: "none", location: "U District", calories: 700 },
  { name: "Protein Shake with Peanut Butter", type: "high-calorie-and-protein", restriction: "vegetarian", location: "District Market", calories: 620 },
  { name: "Korean BBQ Beef Bowl", type: "high-calorie-and-protein", restriction: "none", location: "Seoul Tofu House", calories: 760 },
  { name: "Meatball Sub", type: "high-calorie-and-protein", restriction: "none", location: "The Ave", calories: 750 },
  { name: "Buffalo Chicken Wrap", type: "high-calorie-and-protein", restriction: "none", location: "Local Point", calories: 710 },
  { name: "Loaded Steak Burrito", type: "high-calorie-and-protein", restriction: "none", location: "Qdoba", calories: 770 },
  { name: "Ramen with Pork Belly", type: "high-calorie-and-protein", restriction: "none", location: "The Ave", calories: 790 },
  { name: "Grilled Chicken Alfredo", type: "high-calorie-and-protein", restriction: "none", location: "HUB", calories: 760 },
  { name: "Garden Salad with Tofu", type: "light-foods", restriction: "vegan", location: "District Market", calories: 250 },
  { name: "Fresh Fruit Bowl", type: "light-foods", restriction: "vegan", location: "West Campus", calories: 180 },
  { name: "Avocado Toast", type: "light-foods", restriction: "vegetarian", location: "U District", calories: 330 },
  { name: "Chia Pudding", type: "light-foods", restriction: "vegan", location: "HeartBeet", calories: 290 },
  { name: "Cucumber Roll", type: "light-foods", restriction: "vegan", location: "Sushi Tokyo", calories: 220 },
  { name: "Caprese Salad", type: "light-foods", restriction: "vegetarian", location: "Local Point", calories: 300 },
  { name: "Tofu & Greens Bowl", type: "light-foods", restriction: "vegan", location: "West Campus", calories: 310 },
  { name: "Mini Greek Yogurt Parfait", type: "light-foods", restriction: "vegetarian", location: "District Market", calories: 290 },
  { name: "Spinach & Egg White Muffin", type: "light-foods", restriction: "vegetarian", location: "Starbucks", calories: 270 },
  { name: "Veggie Soup", type: "light-foods", restriction: "vegan", location: "HUB", calories: 240 },
  { name: "Green Smoothie", type: "light-foods", restriction: "vegan", location: "District Market", calories: 280 },
  { name: "Kale Salad with Lemon Dressing", type: "light-foods", restriction: "vegan", location: "U District", calories: 320 },
  { name: "Rice Paper Veggie Rolls", type: "light-foods", restriction: "vegan", location: "Thai Tom", calories: 290 },
  { name: "Zucchini Noodles", type: "light-foods", restriction: "vegan", location: "HUB", calories: 270 },
  { name: "Edamame Cup", type: "light-foods", restriction: "vegan", location: "District Market", calories: 230 }
];

const ImaGymStatus = () => {
  const [status, setStatus] = useState({ label: "Loading...", emoji: "⏳", color: "gray" });

  useEffect(() => {
    const hour = new Date().getHours();
    let label = "Moderate", emoji = "🟡", color = "yellow";
    if (hour >= 6 && hour <= 8) [label, emoji, color] = ["Busy", "🟠", "orange"];
    else if (hour >= 9 && hour <= 12) [label, emoji, color] = ["Light", "🟢", "green"];
    else if (hour >= 18 && hour <= 21) [label, emoji, color] = ["Very Busy", "🔴", "red"];
    setStatus({ label, emoji, color });
  }, []);

  return (
    <div className="flex items-center space-x-2 text-sm font-medium">
      <span className={`rounded-full px-2 py-1 bg-${status.color}-100 text-${status.color}-700`}>
        {status.emoji} {status.label}
      </span>
      <span className="text-purple-700">IMA Gym Status</span>
    </div>
  );
};

const WeeklyPlanner = ({ goal, restriction, split, workoutEnabled, userName }) => {
  const today = new Date().getDay();
  const rotatedDays = [...Array(7).keys()].map(i => (today + i) % 7);
  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayName = weekDays[today];
  const gymSplits = {
    PPL: ["Push", "Pull", "Legs", "Push", "Pull", "Legs", "Rest"],
    Arnold: ["Chest/Back", "Shoulders/Arms", "Legs", "Chest/Back", "Shoulders/Arms", "Legs", "Rest"],
    "Bro Split": ["Chest", "Back", "Shoulders", "Arms", "Legs", "Abs", "Rest"],
    "Upper/Lower": ["Upper", "Lower", "Rest", "Upper", "Lower", "Rest", "Rest"],
    "Full Body": ["Full Body", "Full Body", "Rest", "Full Body", "Full Body", "Rest", "Rest"]
  };

  const meals = mockFoodOptions.filter(m => m.type === goal && (restriction === "none" || m.restriction === restriction));
  const getRandomMeal = () => meals[Math.floor(Math.random() * meals.length)];

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-purple-600 mb-2">📚 {userName}'s {currentDayName} Schedule</h2>
      <ul className="mb-6 text-sm list-disc ml-5">
        <li>English 288 – 8:00 AM</li>
        <li>ENTRE 370 – 1:20 PM</li>
        <li>ECON 300 – 4:00 PM</li>
      </ul>

      <h2 className="text-2xl font-bold text-purple-700 mb-4">🗓️ 7-Day Planner</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rotatedDays.map((dayIndex, i) => {
          const meal = getRandomMeal();
          const workout = workoutEnabled && split ? gymSplits[split][dayIndex] : "—";
          return (
            <div key={i} className="border rounded-lg p-4 bg-white">
              <h3 className="text-lg font-semibold text-purple-700">{weekDays[dayIndex]}</h3>
              <p><strong>Workout:</strong> {workout}</p>
              <p><strong>Meal:</strong> {meal?.name || "No match"}</p>
              <p className="text-sm text-muted-foreground">Location: {meal?.location}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function MealMapApp() {
  const [goal, setGoal] = useState("high-protein");
  const [restriction, setRestriction] = useState("none");
  const [results, setResults] = useState<{
    name: string;
    type: string;
    restriction: string;
    location: string;
    calories: number;
  }[]>([]);
  const [calories, setCalories] = useState(0);
  const [weeklyMeals, setWeeklyMeals] = useState<{
    name: string;
    type: string;
    restriction: string;
    location: string;
    calories: number;
  }[]>([]);
  const [userName, setUserName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [language, setLanguage] = useState("English");
  const [workout, setWorkout] = useState("no");
  const [selectedSplit, setSelectedSplit] = useState("");

  useEffect(() => {
    const day = new Date().toLocaleDateString("en-US", { weekday: "long" });
    const base = new Date().getHours() < 12 ? "Good Morning" : new Date().getHours() < 18 ? "Good Afternoon" : "Good Evening";
    const gymSplits = {
    PPL: ["Push", "Pull", "Legs", "Push", "Pull", "Legs", "Rest"],
    Arnold: ["Chest/Back", "Shoulders/Arms", "Legs", "Chest/Back", "Shoulders/Arms", "Legs", "Rest"],
    "Bro Split": ["Chest", "Back", "Shoulders", "Arms", "Legs", "Abs", "Rest"],
    "Upper/Lower": ["Upper", "Lower", "Rest", "Upper", "Lower", "Rest", "Rest"],
    "Full Body": ["Full Body", "Full Body", "Rest", "Full Body", "Full Body", "Rest", "Rest"]
  };

  const today = new Date().getDay();
  const splitWorkout = selectedSplit && gymSplits[selectedSplit] ? gymSplits[selectedSplit][today] : null;
  const final = workout === "yes" && splitWorkout ? ` Let's have a great ${splitWorkout} workout!` : "";
    setGreeting(`${base}, ${userName}! Happy ${day}.${final}`);
  }, [userName, workout, selectedSplit]);

  const handleFilter = () => {
    const filtered = mockFoodOptions.filter(option => option.type === goal && (restriction === "none" || option.restriction === restriction));
    setResults(filtered);
    setCalories(filtered.reduce((acc, curr) => acc + curr.calories, 0));
  };

  const addToWeekly = (meal) => setWeeklyMeals(prev => [...prev, meal]);

  if (!submitted) {
    return (
      <div className="p-6 max-w-xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold text-center text-purple-700">Welcome to Meal Map 💪</h1>
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
          <Select onValueChange={setLanguage} defaultValue={language}>
            <SelectTrigger><SelectValue placeholder="Language" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Spanish">Spanish</SelectItem>
            </SelectContent>
          </Select>
          <Input value={userName} onChange={(e) => setUserName(e.target.value)} required placeholder="Enter your name" />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Do you have dietary restrictions?</label>
            <Select onValueChange={setRestriction} defaultValue="none">
              <SelectTrigger><SelectValue placeholder="Dietary restrictions?" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="vegan">Vegan</SelectItem>
                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                <SelectItem value="gluten-free">Gluten-Free</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Do you go to the gym?</label>
            <Select onValueChange={setWorkout} defaultValue="no">
              <SelectTrigger><SelectValue placeholder="Do you go to the gym?" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {workout === "yes" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">What is your workout split?</label>
              <Select onValueChange={setSelectedSplit}>
                <SelectTrigger><SelectValue placeholder="Choose your split" /></SelectTrigger>
                <SelectContent>
                  {["PPL", "Arnold", "Bro Split", "Upper/Lower", "Full Body"].map(split => (
                    <SelectItem key={split} value={split}>{split}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <Button type="submit" className="bg-purple-600 w-full text-white font-bold">Continue</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-purple-700">{greeting}</h1>
      <ImaGymStatus />
      <p className="text-muted-foreground">Find healthy food near your classes.</p>
      <div className="flex flex-col md:flex-row gap-4">
        <Select onValueChange={setGoal} defaultValue={goal}>
          <SelectTrigger className="w-full md:w-1/2"><SelectValue placeholder="Craving?" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="high-protein">High Protein</SelectItem>
            <SelectItem value="low-calorie">Low Calorie</SelectItem>
            <SelectItem value="cheat-day">Cheat Day</SelectItem>
            <SelectItem value="high-calorie-and-protein">High Cal + Protein</SelectItem>
            <SelectItem value="light-foods">Light Foods</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleFilter} className="bg-purple-600 text-white font-bold">Find Meals</Button>
      </div>
      <div className="grid gap-4">
        {results.map((meal, i) => (
          <Card key={i}><CardContent className="p-4">
            <h3 className="text-xl font-semibold">{meal.name}</h3>
            <p className="text-sm text-muted-foreground">Location: {meal.location}</p>
            <p className="text-sm">Calories: {meal.calories}</p>
            <div className="flex gap-4 mt-2">
              <Button size="sm" className="bg-purple-500 text-white" onClick={() => addToWeekly(meal)}>Add</Button>
              <Button size="sm" variant="outline" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(meal.location + ' University of Washington')}`)}>Map</Button>
            </div>
          </CardContent></Card>
        ))}
      </div>
      {calories > 0 && <div className="text-center font-semibold">Total Calories: {calories}</div>}
      {weeklyMeals.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Weekly Meal Tracker</h2>
          <ul className="list-disc ml-5 mt-2">{weeklyMeals.map((m, i) => (
            <li key={i}>{m.name} — {m.calories} cal</li>
          ))}</ul>
        </div>
      )}
      <WeeklyPlanner goal={goal} restriction={restriction} split={selectedSplit} workoutEnabled={workout === "yes"} userName={userName} />
    </div>
  );
}
