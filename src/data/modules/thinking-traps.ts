import type { SkillModule } from "@/lib/types";

export const thinkingTraps: SkillModule = {
  id: "thinking-traps",
  title: "Thinking Traps",
  icon: "🪤",
  category: "Awareness",
  description:
    "Learn to spot unhelpful thought patterns that keep you stuck.",
  intro:
    "Your mind can play tricks on you. These tricks are called thinking traps. They twist the way you see things. Once you can name them, you can start to break free. This module will help you spot common traps and practice new ways of seeing.",
  lessons: [
    {
      id: "what-are-thinking-traps",
      title: "What Are Thinking Traps?",
      summary: "Discover how your brain takes shortcuts that lead you astray.",
      durationMinutes: 5,
      content: [
        {
          type: "text",
          body: "Everyone has an inner voice. It talks to you all day long. Sometimes it helps you stay safe. Other times, it lies to you.",
        },
        {
          type: "text",
          body: "Thinking traps are patterns your mind falls into. They feel true in the moment. But they twist reality in ways that hold you back.",
        },
        {
          type: "example",
          title: "After a Job Interview",
          body: "You leave an interview and think, \"I messed that up completely.\" But really, you answered most questions well. Your mind focused only on one stumble.",
        },
        {
          type: "text",
          body: "The good news? You can learn to catch these traps. Once you see them, they lose their power over you.",
        },
        {
          type: "tip",
          body: "Think of your inner voice like a radio station. You can notice what it says without believing every word.",
        },
        {
          type: "exercise",
          exercise: {
            type: "reflection",
            prompt: "Think of a recent time your mind told you something harsh. What did it say?",
            placeholder: "For example: I thought I'd never find a job...",
            minLength: 10,
          },
        },
        {
          type: "exercise",
          exercise: {
            type: "multiple-choice",
            question: "Which of these is a thinking trap?",
            options: [
              {
                id: "a",
                text: "Believing one mistake means total failure",
                feedback:
                  "Yes! This is called all-or-nothing thinking. One mistake does not erase everything you did right.",
              },
              {
                id: "b",
                text: "Planning your day in advance",
                feedback:
                  "Planning ahead is actually a healthy skill. It helps you stay on track.",
              },
              {
                id: "c",
                text: "Feeling nervous before a big meeting",
                feedback:
                  "Feeling nervous is normal. It becomes a trap only if you decide nervousness means something bad will happen.",
              },
            ],
          },
        },
        {
          type: "key-point",
          body: "Thinking traps are automatic. They feel real, but they are not facts. Noticing them is the first step to freedom.",
        },
      ],
    },
    {
      id: "all-or-nothing",
      title: "All-or-Nothing Thinking",
      summary: "See the shades of gray between success and failure.",
      durationMinutes: 5,
      content: [
        {
          type: "text",
          body: "All-or-nothing thinking splits the world into two boxes. Perfect or terrible. Success or failure. There is no middle ground.",
        },
        {
          type: "text",
          body: "Life is rarely that simple. Most things live in the space between extremes.",
        },
        {
          type: "example",
          title: "Meeting Your Parole Officer",
          body: "You missed one appointment and think, \"I always mess up.\" But you made it to the last three meetings on time. One miss does not erase three wins.",
        },
        {
          type: "tip",
          body: "When you catch an \"always\" or \"never\" thought, ask yourself: Is this truly 100% of the time?",
        },
        {
          type: "exercise",
          exercise: {
            type: "fill-in",
            prompt: "Instead of thinking \"I completely failed,\" I could say: \"I [blank], but I also did some things well.\"",
            hint: "Try using a word like \"struggled\" or \"stumbled\"",
          },
        },
        {
          type: "exercise",
          exercise: {
            type: "scenario",
            scenario:
              "You applied for five jobs this week. Four didn't respond. One sent a rejection.",
            question: "Your mind says, \"No one will ever hire me.\" How could you reframe this?",
            guidedSteps: [
              "Notice the all-or-nothing words (\"no one,\" \"ever\").",
              "Look for evidence that challenges this thought.",
              "Write a more balanced view of the situation.",
            ],
          },
        },
        {
          type: "key-point",
          body: "Watch for words like \"always,\" \"never,\" \"completely,\" and \"totally.\" They often signal all-or-nothing thinking.",
        },
      ],
    },
    {
      id: "catastrophizing",
      title: "Catastrophizing",
      summary: "Stop your mind from jumping to the worst-case scenario.",
      durationMinutes: 5,
      content: [
        {
          type: "text",
          body: "Catastrophizing means your mind jumps to the worst possible outcome. It takes a small worry and turns it into a disaster.",
        },
        {
          type: "text",
          body: "This trap is common when you face new situations. Your brain tries to protect you by imagining danger everywhere.",
        },
        {
          type: "example",
          title: "Navigating Housing",
          body: "Your landlord leaves a voicemail. You think, \"They're going to kick me out.\" But maybe they just need to schedule a repair. Your mind jumped to the worst case.",
        },
        {
          type: "tip",
          body: "Ask yourself three questions: What is the worst that could happen? What is the best that could happen? What is most likely to happen?",
        },
        {
          type: "exercise",
          exercise: {
            type: "multiple-choice",
            question: "Your boss asks to meet with you tomorrow. What thought is catastrophizing?",
            options: [
              {
                id: "a",
                text: "I wonder what the meeting is about.",
                feedback:
                  "This is a neutral thought. It shows curiosity without jumping to conclusions.",
              },
              {
                id: "b",
                text: "I'm definitely getting fired.",
                feedback:
                  "This is catastrophizing. You jumped to the worst outcome without any evidence.",
              },
              {
                id: "c",
                text: "Maybe they want to discuss the new project.",
                feedback:
                  "This is a balanced thought. You considered a positive possibility.",
              },
            ],
          },
        },
        {
          type: "exercise",
          exercise: {
            type: "reflection",
            prompt: "Describe a time you feared the worst but things turned out okay. What actually happened?",
            placeholder: "I was worried about... but then...",
            minLength: 15,
          },
        },
        {
          type: "key-point",
          body: "Your brain is wired to spot danger. But not every worry becomes reality. Check the evidence before you believe the story.",
        },
      ],
    },
    {
      id: "should-statements",
      title: "Should Statements",
      summary: "Release the pressure of rigid rules you set for yourself.",
      durationMinutes: 5,
      content: [
        {
          type: "text",
          body: "\"Should\" statements set strict rules for how you or others must behave. When reality doesn't match, you feel guilty or angry.",
        },
        {
          type: "text",
          body: "Words like \"should,\" \"must,\" and \"have to\" create pressure. They leave no room for being human.",
        },
        {
          type: "example",
          title: "Family Tension",
          body: "You think, \"I should have my life together by now.\" But rebuilding takes time. Comparing your timeline to others sets an unfair standard.",
        },
        {
          type: "tip",
          body: "Try replacing \"should\" with \"I'd like to\" or \"It would help if.\" This softens the rule without losing the goal.",
        },
        {
          type: "exercise",
          exercise: {
            type: "sorting",
            instruction: "Sort these thoughts into \"Should Statement\" or \"Flexible Thought.\"",
            categories: ["Should Statement", "Flexible Thought"],
            items: [
              {
                id: "s1",
                text: "I must never make a mistake at work.",
                category: "Should Statement",
              },
              {
                id: "s2",
                text: "I'd like to do my best today.",
                category: "Flexible Thought",
              },
              {
                id: "s3",
                text: "I should be over this by now.",
                category: "Should Statement",
              },
              {
                id: "s4",
                text: "Healing takes time, and I'm making progress.",
                category: "Flexible Thought",
              },
            ],
          },
        },
        {
          type: "exercise",
          exercise: {
            type: "fill-in",
            prompt: "Instead of \"I should have a job by now,\" I could say: \"I [blank] and I'm working toward it.\"",
            hint: "Try something like \"want stable income\" or \"value independence\"",
          },
        },
        {
          type: "key-point",
          body: "\"Should\" creates shame. \"I'd like to\" creates motivation. Same goal, different energy.",
        },
      ],
    },
    {
      id: "practice-spotting",
      title: "Practice Spotting Traps",
      summary: "Put your new skills to work with real-world examples.",
      durationMinutes: 6,
      content: [
        {
          type: "text",
          body: "You have learned about several thinking traps. Now it is time to practice spotting them in everyday life.",
        },
        {
          type: "text",
          body: "The more you practice, the faster you will catch traps before they pull you down.",
        },
        {
          type: "example",
          title: "Dealing with Stigma",
          body: "Someone at work makes a comment about your past. You think, \"Everyone is judging me.\" That is mind reading — assuming you know what others think.",
        },
        {
          type: "exercise",
          exercise: {
            type: "scenario",
            scenario:
              "You text a friend and they don't reply for two days. You think, \"They don't want to talk to me anymore. I'm going to end up alone.\"",
            question: "Which thinking traps can you spot here?",
            guidedSteps: [
              "Identify the all-or-nothing thinking (\"end up alone\").",
              "Identify the catastrophizing (jumping to the worst case).",
              "Write a more balanced thought about why they might not have replied.",
            ],
          },
        },
        {
          type: "exercise",
          exercise: {
            type: "multiple-choice",
            question: "\"I burned dinner, so I'm a terrible cook.\" Which trap is this?",
            options: [
              {
                id: "a",
                text: "All-or-nothing thinking",
                feedback:
                  "Exactly! One burned meal does not define your cooking ability.",
              },
              {
                id: "b",
                text: "Catastrophizing",
                feedback:
                  "Close, but this is more about labeling yourself from one event. That is all-or-nothing thinking.",
              },
              {
                id: "c",
                text: "Should statements",
                feedback:
                  "Not quite. There is no \"should\" or \"must\" in this thought. It is all-or-nothing thinking.",
              },
            ],
          },
        },
        {
          type: "exercise",
          exercise: {
            type: "checklist",
            instruction: "Commit to practicing this week. Check the ones you'll try:",
            items: [
              { id: "c1", text: "Notice when I use \"always\" or \"never.\"" },
              { id: "c2", text: "Pause when I feel a strong negative emotion." },
              { id: "c3", text: "Ask myself: Is this a fact or a thinking trap?" },
              { id: "c4", text: "Write down one trap I catch each day." },
            ],
          },
        },
        {
          type: "key-point",
          body: "Spotting traps gets easier with practice. Be patient with yourself. Every trap you notice is progress.",
        },
      ],
    },
  ],
};
