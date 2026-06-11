import type { SkillModule } from "@/lib/types";

export const buildingYourFuture: SkillModule = {
  id: "building-your-future",
  title: "Building Your Future",
  icon: "🌱",
  category: "Growth",
  description:
    "Set a direction for your life and take steps toward who you want to be.",
  intro:
    "You cannot change the past. But you can shape what comes next. This module helps you get clear on what matters to you, set meaningful goals, build resilience for setbacks, and celebrate how far you have already come.",
  lessons: [
    {
      id: "values-compass",
      title: "Your Values Compass",
      summary: "Discover what matters most to you and let it guide your choices.",
      durationMinutes: 6,
      content: [
        {
          type: "text",
          body: "Values are your inner compass. They point toward the life you want to build. When choices feel confusing, your values show the way.",
        },
        {
          type: "text",
          body: "Values are not goals. A goal has an end point. A value is a direction you keep walking in, like honesty, family, or growth.",
        },
        {
          type: "example",
          title: "Choosing Between Options",
          body: "You get offered overtime on a Saturday. It pays well, but your kid has a soccer game. If family is a top value, the answer becomes clearer — even if the money would help.",
        },
        {
          type: "tip",
          body: "Ask yourself: \"If I could be remembered for one thing, what would it be?\" Your answer points to a core value.",
        },
        {
          type: "exercise",
          exercise: {
            type: "sorting",
            instruction: "Sort these into values that feel important to you vs. values that feel less central right now.",
            categories: ["Important to Me", "Less Central Right Now"],
            items: [
              { id: "v1", text: "Family and connection", category: "Important to Me" },
              { id: "v2", text: "Independence and freedom", category: "Important to Me" },
              { id: "v3", text: "Honesty and integrity", category: "Important to Me" },
              { id: "v4", text: "Adventure and excitement", category: "Less Central Right Now" },
              { id: "v5", text: "Security and stability", category: "Important to Me" },
              { id: "v6", text: "Recognition and status", category: "Less Central Right Now" },
            ],
          },
        },
        {
          type: "exercise",
          exercise: {
            type: "reflection",
            prompt: "Name your top three values. For each one, describe one small way you live it out already.",
            placeholder: "1) Value — I show this by... 2) Value — I show this by...",
            minLength: 15,
          },
        },
        {
          type: "key-point",
          body: "You do not need to be perfect to live your values. You just need to keep pointing in their direction.",
        },
      ],
    },
    {
      id: "goal-setting-basics",
      title: "Goal Setting Basics",
      summary: "Turn your values into concrete, achievable goals.",
      durationMinutes: 5,
      content: [
        {
          type: "text",
          body: "A goal is a value in action. If you value stability, a goal might be: \"Find a steady job within 60 days.\" It makes your value real and measurable.",
        },
        {
          type: "text",
          body: "Good goals are specific, realistic, and broken into steps. Vague goals like \"get my life together\" feel heavy. Clear goals feel possible.",
        },
        {
          type: "example",
          title: "From Value to Goal",
          body: "Value: Independence. Goal: Save enough for my own place in six months. First step: Open a savings account this week and set up a $25 weekly deposit.",
        },
        {
          type: "tip",
          body: "Start with goals you can control. \"Get hired\" depends on others. \"Apply to five jobs this week\" depends only on you.",
        },
        {
          type: "exercise",
          exercise: {
            type: "multiple-choice",
            question: "Which is the strongest goal statement?",
            options: [
              {
                id: "a",
                text: "Be healthier",
                feedback:
                  "This is a value direction, not a goal. It needs a specific target and timeline.",
              },
              {
                id: "b",
                text: "Walk for 20 minutes three times a week for one month",
                feedback:
                  "This is clear, specific, and has a timeframe. You can track it and know when you have succeeded.",
              },
              {
                id: "c",
                text: "Exercise more",
                feedback:
                  "More than what? Without a clear measure, you will not know if you achieved it.",
              },
            ],
          },
        },
        {
          type: "exercise",
          exercise: {
            type: "fill-in",
            prompt: "My goal is to [blank] by [blank]. My first step is [blank].",
            hint: "Be specific about what, when, and how you will start",
          },
        },
        {
          type: "key-point",
          body: "A goal without a first step stays a wish. A goal with a clear first step becomes a plan.",
        },
      ],
    },
    {
      id: "resilience-mindset",
      title: "Resilience Mindset",
      summary: "Bounce back from setbacks without losing your way.",
      durationMinutes: 5,
      content: [
        {
          type: "text",
          body: "Setbacks are part of every journey. A resilient mindset does not expect perfection. It expects bumps and plans for them.",
        },
        {
          type: "text",
          body: "Resilience is not toughness. It is flexibility. It means bending without breaking, then getting back on track.",
        },
        {
          type: "example",
          title: "After a Job Loss",
          body: "You lose a job after two months. The old voice says, \"See, nothing works out.\" The resilient voice says, \"This hurts, but I lasted two months longer than last time. What can I learn from this?\"",
        },
        {
          type: "tip",
          body: "After a setback, ask: \"What can I learn?\" and \"What is my next smallest step?\" Those two questions keep you moving.",
        },
        {
          type: "exercise",
          exercise: {
            type: "scenario",
            scenario:
              "You were doing well with your goals for three weeks. Then you had a rough week and stopped doing your daily check-ins. Now you feel guilty and want to give up.",
            question: "How would a resilient mindset respond to this setback?",
            guidedSteps: [
              "Name the thinking trap: Is this all-or-nothing thinking?",
              "Acknowledge what you achieved: Three good weeks is real progress.",
              "Identify what tripped you up without blame.",
              "Choose one small step you can take today to restart.",
            ],
          },
        },
        {
          type: "exercise",
          exercise: {
            type: "reflection",
            prompt: "Describe a time you bounced back from something hard. What helped you keep going?",
            placeholder: "When I faced... I got through it by...",
            minLength: 10,
          },
        },
        {
          type: "key-point",
          body: "A setback is a chapter, not the whole story. Your ability to start again is proof of your resilience.",
        },
      ],
    },
    {
      id: "celebrating-progress",
      title: "Celebrating Progress",
      summary: "Recognize how far you have come and fuel your motivation.",
      durationMinutes: 4,
      content: [
        {
          type: "text",
          body: "Most people focus on what they have not done yet. They forget to notice what they have already accomplished. That is a mistake.",
        },
        {
          type: "text",
          body: "Celebrating progress is not bragging. It is fuel. It reminds your brain that effort leads to results.",
        },
        {
          type: "example",
          title: "Looking Back at Six Months",
          body: "Six months ago you had nothing lined up. Today you have a room, a part-time job, and two people you can call. That is massive progress, even if it does not feel flashy.",
        },
        {
          type: "tip",
          body: "Keep a \"wins\" list on your phone. Add to it every time something goes right, no matter how small. Read it on hard days.",
        },
        {
          type: "exercise",
          exercise: {
            type: "checklist",
            instruction: "Check every win that applies to you, no matter how small:",
            items: [
              { id: "w1", text: "I showed up for myself today by opening this app" },
              { id: "w2", text: "I have kept at least one commitment this week" },
              { id: "w3", text: "I handled a hard moment without falling into old patterns" },
              { id: "w4", text: "I asked for help when I needed it" },
              { id: "w5", text: "I made progress on at least one goal" },
              { id: "w6", text: "I am still here, still trying" },
            ],
          },
        },
        {
          type: "exercise",
          exercise: {
            type: "reflection",
            prompt: "What are three things you have accomplished in the last month that you are proud of?",
            placeholder: "1) I... 2) I... 3) I...",
            minLength: 15,
          },
        },
        {
          type: "key-point",
          body: "Progress is not always visible to others. But you know how far you have come. Honor that.",
        },
      ],
    },
  ],
};
