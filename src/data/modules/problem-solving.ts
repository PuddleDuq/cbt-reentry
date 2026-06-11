import type { SkillModule } from "@/lib/types";

export const problemSolving: SkillModule = {
  id: "problem-solving",
  title: "Problem Solving",
  icon: "🧩",
  category: "Skills",
  description:
    "Break big problems into small, manageable steps you can act on.",
  intro:
    "When you face a problem, it can feel like a wall. But every wall has cracks you can work with. This module teaches you a step-by-step method to define problems clearly, brainstorm options, and choose the best path forward. You have solved hard problems before. Let's sharpen that skill.",
  lessons: [
    {
      id: "define-the-problem",
      title: "Define the Problem",
      summary: "Get clear on what the real problem is before trying to fix it.",
      durationMinutes: 5,
      content: [
        {
          type: "text",
          body: "The biggest mistake in problem solving is jumping to a fix before you truly understand the problem.",
        },
        {
          type: "text",
          body: "A well-defined problem is half solved. Get specific about what is happening, who is involved, and what you actually need.",
        },
        {
          type: "example",
          title: "Housing Stress",
          body: "\"I have nowhere to live\" feels impossible. But the real problem might be: \"I need to find an affordable room by the end of the month.\" That is something you can work with.",
        },
        {
          type: "tip",
          body: "Write the problem as one clear sentence. If you cannot fit it in one sentence, it might be multiple problems stacked together.",
        },
        {
          type: "exercise",
          exercise: {
            type: "scenario",
            scenario:
              "You feel overwhelmed because \"everything is falling apart.\" Your housing is unstable, your boss reduced your hours, and you missed a meeting with your PO.",
            question: "How would you separate this into clear, specific problems?",
            guidedSteps: [
              "List each issue as its own separate sentence.",
              "For each one, describe what specifically needs to change.",
              "Pick the most urgent one to focus on first.",
            ],
          },
        },
        {
          type: "exercise",
          exercise: {
            type: "fill-in",
            prompt: "The problem I want to solve is: I need to [blank] by [blank].",
            hint: "Be specific about what you need and when you need it",
          },
        },
        {
          type: "key-point",
          body: "A vague problem feels impossible. A specific problem becomes a puzzle you can solve.",
        },
      ],
    },
    {
      id: "brainstorm-solutions",
      title: "Brainstorm Solutions",
      summary: "Generate options without judging them — quantity over quality.",
      durationMinutes: 5,
      content: [
        {
          type: "text",
          body: "Once your problem is clear, the next step is brainstorming. This means listing every possible solution — even wild ones.",
        },
        {
          type: "text",
          body: "The rule of brainstorming: no judging yet. Write down every idea that comes to mind. You will sort them later.",
        },
        {
          type: "example",
          title: "Finding Work",
          body: "Problem: You need income within two weeks. Brainstorm: temp agency, day labor, ask at the restaurant down the street, dog walking app, community job board, ask your mentor for leads.",
        },
        {
          type: "tip",
          body: "Aim for at least five options. The first two ideas are usually obvious. The creative solutions come after you push past them.",
        },
        {
          type: "exercise",
          exercise: {
            type: "reflection",
            prompt: "Pick a problem you are facing. List at least four possible solutions, without judging any of them.",
            placeholder: "My problem is... Options: 1) ... 2) ... 3) ... 4) ...",
            minLength: 20,
          },
        },
        {
          type: "exercise",
          exercise: {
            type: "multiple-choice",
            question: "During brainstorming, which approach works best?",
            options: [
              {
                id: "a",
                text: "Only write down realistic ideas",
                feedback:
                  "Actually, limiting yourself too early cuts off creative solutions. Write everything first.",
              },
              {
                id: "b",
                text: "List all ideas, even imperfect ones",
                feedback:
                  "Yes! Quantity first, quality later. Even a wild idea can spark a practical solution.",
              },
              {
                id: "c",
                text: "Pick the first idea that seems good",
                feedback:
                  "The first idea is not always the best. Brainstorming helps you find options you did not expect.",
              },
            ],
          },
        },
        {
          type: "key-point",
          body: "You always have more options than you think. Brainstorming reveals them. Do not edit while you create.",
        },
      ],
    },
    {
      id: "evaluate-and-choose",
      title: "Evaluate and Choose",
      summary: "Weigh your options and pick the path that fits your situation.",
      durationMinutes: 5,
      content: [
        {
          type: "text",
          body: "Now that you have options, it is time to evaluate them. Not every idea is equal. You need to find the one that works for your real life.",
        },
        {
          type: "text",
          body: "Ask three questions about each option: Can I actually do this? What are the likely results? Does this fit my values?",
        },
        {
          type: "example",
          title: "Choosing Between Jobs",
          body: "You have two options: a night shift at a warehouse or a day shift at a store for less pay. The warehouse pays more but conflicts with your classes. Evaluating both helps you see the full picture.",
        },
        {
          type: "tip",
          body: "If you are stuck between two options, ask: \"Which one moves me closer to the life I am building?\"",
        },
        {
          type: "exercise",
          exercise: {
            type: "sorting",
            instruction: "Sort these evaluation questions into helpful vs. unhelpful.",
            categories: ["Helpful Questions", "Unhelpful Questions"],
            items: [
              { id: "e1", text: "What is the most likely outcome?", category: "Helpful Questions" },
              { id: "e2", text: "What would others think of me?", category: "Unhelpful Questions" },
              { id: "e3", text: "Can I actually do this with my resources?", category: "Helpful Questions" },
              { id: "e4", text: "What if everything goes wrong?", category: "Unhelpful Questions" },
              { id: "e5", text: "Does this match my values and goals?", category: "Helpful Questions" },
            ],
          },
        },
        {
          type: "exercise",
          exercise: {
            type: "reflection",
            prompt: "Think about an option you are considering. What is the most likely outcome if you try it?",
            placeholder: "If I try this option, what will probably happen is...",
            minLength: 10,
          },
        },
        {
          type: "key-point",
          body: "There is rarely a perfect choice. Pick the best available option and adjust as you go.",
        },
      ],
    },
    {
      id: "make-a-plan",
      title: "Make a Plan",
      summary: "Turn your decision into a concrete action plan with steps.",
      durationMinutes: 5,
      content: [
        {
          type: "text",
          body: "Choosing a solution is not enough. You need a plan — clear steps you can follow, starting with what you can do today.",
        },
        {
          type: "text",
          body: "Good plans are small and specific. \"Get my life together\" is not a plan. \"Call two temp agencies before noon\" is.",
        },
        {
          type: "example",
          title: "Getting an ID",
          body: "Goal: Get a state ID. Step 1: Find what documents I need online. Step 2: Gather my birth certificate and proof of address. Step 3: Go to the DMV on Tuesday before 10am. Step 4: Bring bus fare and cash for the fee.",
        },
        {
          type: "tip",
          body: "Each step should start with a verb. That makes it an action you can actually take.",
        },
        {
          type: "exercise",
          exercise: {
            type: "scenario",
            scenario:
              "You decided to apply for three jobs this week. You need to turn this decision into a concrete plan.",
            question: "Break this down into daily steps you can follow.",
            guidedSteps: [
              "List what you need before you can apply (resume, references, etc.).",
              "Choose a specific time each day to work on applications.",
              "Identify where you will apply (websites, in-person, contacts).",
              "Set a reward for yourself when you complete all three.",
            ],
          },
        },
        {
          type: "exercise",
          exercise: {
            type: "checklist",
            instruction: "For your next plan, check which elements you will include:",
            items: [
              { id: "p1", text: "A clear first step I can do today" },
              { id: "p2", text: "A deadline or timeline for each step" },
              { id: "p3", text: "A backup plan if the first step doesn't work" },
              { id: "p4", text: "Someone I can ask for help if I get stuck" },
            ],
          },
        },
        {
          type: "key-point",
          body: "A plan does not need to be perfect. It needs to be clear enough to start. You can adjust along the way.",
        },
      ],
    },
  ],
};
