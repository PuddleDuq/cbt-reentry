import type { SkillModule } from "@/lib/types";

export const managingTriggers: SkillModule = {
  id: "managing-triggers",
  title: "Managing Triggers",
  icon: "🛡️",
  category: "Prevention",
  description:
    "Identify what sets you off and build a plan to stay grounded.",
  intro:
    "Triggers are situations, people, or feelings that push you toward old habits. They are not your fault, but they are your responsibility to manage. This module helps you map your triggers and create distance before you react.",
  lessons: [
    {
      id: "understanding-triggers",
      title: "Understanding Triggers",
      summary: "Learn what triggers are and why they affect you.",
      durationMinutes: 5,
      content: [
        {
          type: "text",
          body: "A trigger is anything that sparks a strong urge or emotion. It might be a place, a person, a sound, or even a time of day.",
        },
        {
          type: "text",
          body: "Triggers are not weakness. They are your brain connecting the present to the past. Understanding them gives you power.",
        },
        {
          type: "example",
          title: "Walking Past a Familiar Corner",
          body: "You walk past a spot where you used to hang out. Suddenly you feel a pull. That is a trigger — your brain remembering old patterns.",
        },
        {
          type: "tip",
          body: "Triggers work best when they catch you off guard. Naming them ahead of time takes away their surprise power.",
        },
        {
          type: "exercise",
          exercise: {
            type: "reflection",
            prompt: "What is one trigger you've noticed since coming home? How does it show up in your body?",
            placeholder: "For example: When I drive past my old neighborhood, my chest gets tight...",
            minLength: 10,
          },
        },
        {
          type: "exercise",
          exercise: {
            type: "multiple-choice",
            question: "Which of these could be a trigger?",
            options: [
              {
                id: "a",
                text: "A song that reminds you of old times",
                feedback:
                  "Yes. Music can bring back strong memories and urges.",
              },
              {
                id: "b",
                text: "Getting enough sleep",
                feedback:
                  "Good sleep actually helps you cope better. It is protective, not a trigger.",
              },
              {
                id: "c",
                text: "Feeling bored on a Friday night",
                feedback:
                  "Absolutely. Boredom and idle time are common triggers.",
              },
            ],
            allowMultiple: true,
          },
        },
        {
          type: "key-point",
          body: "A trigger is not a choice. How you respond to it is. The first step is awareness.",
        },
      ],
    },
    {
      id: "mapping-triggers",
      title: "Mapping Your Triggers",
      summary: "Create a personal map of your high-risk situations.",
      durationMinutes: 6,
      content: [
        {
          type: "text",
          body: "Everyone has different triggers. What affects you might not affect someone else. That is why a personal trigger map matters.",
        },
        {
          type: "text",
          body: "Your map covers four areas: people, places, emotions, and times. Knowing all four helps you prepare.",
        },
        {
          type: "example",
          title: "Planning Your Week",
          body: "You notice that Friday evenings feel risky. You used to go out with a certain crowd. Now you can plan something different for that time slot.",
        },
        {
          type: "tip",
          body: "Keep your trigger map somewhere private. Update it as you learn more about yourself.",
        },
        {
          type: "exercise",
          exercise: {
            type: "sorting",
            instruction: "Sort these triggers into the right category.",
            categories: ["People", "Places", "Emotions", "Times"],
            items: [
              { id: "t1", text: "An old friend who still uses", category: "People" },
              { id: "t2", text: "The parking lot behind the store", category: "Places" },
              { id: "t3", text: "Feeling rejected after a conversation", category: "Emotions" },
              { id: "t4", text: "Late nights when everyone is asleep", category: "Times" },
              { id: "t5", text: "Payday when you have cash", category: "Times" },
              { id: "t6", text: "Loneliness after an argument", category: "Emotions" },
            ],
          },
        },
        {
          type: "exercise",
          exercise: {
            type: "checklist",
            instruction: "Check any trigger categories you want to map for yourself this week:",
            items: [
              { id: "m1", text: "People who increase my risk" },
              { id: "m2", text: "Places that bring up urges" },
              { id: "m3", text: "Emotions that make me vulnerable" },
              { id: "m4", text: "Times of day or week that feel hardest" },
            ],
          },
        },
        {
          type: "key-point",
          body: "A trigger map is not about avoiding life. It is about going in prepared instead of surprised.",
        },
      ],
    },
    {
      id: "creating-distance",
      title: "Creating Distance",
      summary: "Learn to put space between a trigger and your reaction.",
      durationMinutes: 5,
      content: [
        {
          type: "text",
          body: "Between a trigger and your reaction, there is a gap. It might feel tiny. But that gap is where your power lives.",
        },
        {
          type: "text",
          body: "Creating distance means stretching that gap. Even five seconds can change what happens next.",
        },
        {
          type: "example",
          title: "Conflict with a Family Member",
          body: "Your sibling says something hurtful at dinner. Instead of reacting right away, you take a breath and say, \"I need a minute.\" That pause is creating distance.",
        },
        {
          type: "tip",
          body: "The 5-4-3-2-1 technique works fast: Name 5 things you see, 4 you hear, 3 you can touch, 2 you smell, and 1 you taste.",
        },
        {
          type: "exercise",
          exercise: {
            type: "scenario",
            scenario:
              "You run into someone from your past at the grocery store. They invite you to hang out tonight. You feel the pull of old habits.",
            question: "How could you create distance before responding?",
            guidedSteps: [
              "Notice the physical feeling in your body right now.",
              "Take three slow breaths before you say anything.",
              "Think about what your future self would want you to do.",
              "Choose a response that protects your progress.",
            ],
          },
        },
        {
          type: "exercise",
          exercise: {
            type: "fill-in",
            prompt: "When I feel triggered, I can create distance by saying to myself: \"[blank]\"",
            hint: "Try something like \"I can choose how to respond\" or \"This feeling will pass\"",
          },
        },
        {
          type: "key-point",
          body: "You cannot always control what triggers you. You can always choose to pause before you react.",
        },
      ],
    },
    {
      id: "in-the-moment",
      title: "In the Moment",
      summary: "Quick tools for when a trigger hits you right now.",
      durationMinutes: 4,
      content: [
        {
          type: "text",
          body: "Sometimes triggers catch you off guard. You need tools that work fast, without much thought.",
        },
        {
          type: "text",
          body: "These are your emergency skills. Practice them when you are calm so they are ready when you need them.",
        },
        {
          type: "example",
          title: "Unexpected News",
          body: "Your housing application gets denied. Anger rises fast. You grip the counter and focus on the cold surface under your hands. That physical focus breaks the spiral.",
        },
        {
          type: "tip",
          body: "Cold water on your wrists or face can reset your nervous system in seconds. Keep this trick ready.",
        },
        {
          type: "exercise",
          exercise: {
            type: "checklist",
            instruction: "Build your emergency toolkit. Check the ones you will practice:",
            items: [
              { id: "e1", text: "Splash cold water on my face or wrists" },
              { id: "e2", text: "Hold an ice cube and focus on the sensation" },
              { id: "e3", text: "Walk outside and count my steps to 50" },
              { id: "e4", text: "Call my support person before I act" },
              { id: "e5", text: "Do 10 push-ups or jumping jacks" },
            ],
          },
        },
        {
          type: "exercise",
          exercise: {
            type: "reflection",
            prompt: "Which emergency tool feels most natural to you? Why?",
            placeholder: "I think I'd reach for... because...",
            minLength: 10,
          },
        },
        {
          type: "key-point",
          body: "Emergency tools do not solve the problem. They buy you time to make a choice you can be proud of.",
        },
      ],
    },
  ],
};
