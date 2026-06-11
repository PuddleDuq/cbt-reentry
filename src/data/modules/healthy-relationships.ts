import type { SkillModule } from "@/lib/types";

export const healthyRelationships: SkillModule = {
  id: "healthy-relationships",
  title: "Healthy Relationships",
  icon: "🤝",
  category: "Connection",
  description:
    "Strengthen your connections and navigate relationships with care.",
  intro:
    "Relationships take work — especially during reentry. Old patterns may not serve you anymore. This module helps you set boundaries, communicate clearly, rebuild trust, handle conflict, and build a support network that lifts you up.",
  lessons: [
    {
      id: "boundaries",
      title: "Setting Boundaries",
      summary: "Learn to say yes and no in ways that protect your well-being.",
      durationMinutes: 5,
      content: [
        {
          type: "text",
          body: "A boundary is a line you draw to protect your peace and progress. It is not selfish. It is necessary.",
        },
        {
          type: "text",
          body: "Boundaries tell people how to treat you. Without them, others may push past your limits without realizing it.",
        },
        {
          type: "example",
          title: "An Old Friend Asks to Hang Out",
          body: "A friend from before invites you somewhere you know is risky. A boundary sounds like: \"I care about you, but I can't go there. Want to grab coffee instead?\"",
        },
        {
          type: "tip",
          body: "A boundary does not need a long explanation. Keep it short, kind, and firm.",
        },
        {
          type: "exercise",
          exercise: {
            type: "scenario",
            scenario:
              "A family member keeps bringing up your past in front of others. It makes you feel ashamed and angry.",
            question: "How could you set a boundary with them?",
            guidedSteps: [
              "Decide what specifically you need them to stop doing.",
              "Choose a calm moment to talk — not during a family event.",
              "Use an \"I\" statement: \"I feel hurt when my past is brought up in front of others.\"",
              "State what you need: \"I need those conversations to stay private between us.\"",
            ],
          },
        },
        {
          type: "exercise",
          exercise: {
            type: "fill-in",
            prompt: "One boundary I need to set is: \"I need you to [blank] because [blank].\"",
            hint: "Example: \"stop offering me drinks because I'm choosing to stay sober\"",
          },
        },
        {
          type: "key-point",
          body: "Boundaries are not walls. They are gates. You choose what comes in and what stays out.",
        },
      ],
    },
    {
      id: "communication-styles",
      title: "Communication Styles",
      summary: "Find the balance between aggressive, passive, and assertive.",
      durationMinutes: 5,
      content: [
        {
          type: "text",
          body: "There are three main ways people communicate: passive, aggressive, and assertive. Only one of them works well long-term.",
        },
        {
          type: "text",
          body: "Passive means hiding what you need. Aggressive means forcing what you want. Assertive means expressing your needs with respect for both yourself and the other person.",
        },
        {
          type: "example",
          title: "At Work",
          body: "Your coworker keeps leaving tasks for you. Passive: say nothing and do extra work. Aggressive: yell at them. Assertive: \"Hey, I noticed these tasks aren't getting split evenly. Can we talk about how to divide them?\"",
        },
        {
          type: "tip",
          body: "Assertive communication uses \"I\" statements: I feel, I need, I would like. It does not attack the other person.",
        },
        {
          type: "exercise",
          exercise: {
            type: "sorting",
            instruction: "Sort these responses into communication styles.",
            categories: ["Passive", "Aggressive", "Assertive"],
            items: [
              { id: "c1", text: "\"Whatever, it's fine.\" (while feeling angry)", category: "Passive" },
              { id: "c2", text: "\"You never think about anyone but yourself!\"", category: "Aggressive" },
              { id: "c3", text: "\"I feel frustrated. Can we find a solution together?\"", category: "Assertive" },
              { id: "c4", text: "\"Forget it, I'll just do it myself.\"", category: "Passive" },
              { id: "c5", text: "\"I need more time to finish this. Can we adjust the deadline?\"", category: "Assertive" },
            ],
          },
        },
        {
          type: "exercise",
          exercise: {
            type: "reflection",
            prompt: "Which communication style do you use most often? In what situations does it show up?",
            placeholder: "I tend to be... especially when...",
            minLength: 10,
          },
        },
        {
          type: "key-point",
          body: "Assertive communication protects both your needs and the relationship. It takes practice, and it gets easier.",
        },
      ],
    },
    {
      id: "trust-rebuilding",
      title: "Rebuilding Trust",
      summary: "Understand how trust is earned back, one action at a time.",
      durationMinutes: 6,
      content: [
        {
          type: "text",
          body: "Trust breaks fast and heals slow. That is frustrating, but it is honest. You cannot rush someone into trusting you again.",
        },
        {
          type: "text",
          body: "The good news: trust is built through small, consistent actions. Every promise you keep adds a brick to the bridge.",
        },
        {
          type: "example",
          title: "With Your Family",
          body: "Your sister is not ready to leave you alone with her kids. Instead of getting offended, you show up on time, keep your word on small things, and give it time. Trust grows from what you do, not what you say.",
        },
        {
          type: "tip",
          body: "Focus on what you can control: your actions today. You cannot control someone else's timeline for trusting you.",
        },
        {
          type: "exercise",
          exercise: {
            type: "multiple-choice",
            question: "Which action best rebuilds trust over time?",
            options: [
              {
                id: "a",
                text: "Making a big promise to prove yourself",
                feedback:
                  "Big promises can feel empty if trust is already broken. Small, kept promises work better.",
              },
              {
                id: "b",
                text: "Showing up consistently for small commitments",
                feedback:
                  "Yes! Consistency in small things builds trust more than grand gestures.",
              },
              {
                id: "c",
                text: "Explaining why they should trust you",
                feedback:
                  "Words alone rarely rebuild trust. Actions speak louder. Show them through what you do.",
              },
            ],
          },
        },
        {
          type: "exercise",
          exercise: {
            type: "checklist",
            instruction: "Choose trust-building actions you can start this week:",
            items: [
              { id: "tr1", text: "Show up on time for every commitment" },
              { id: "tr2", text: "Follow through on one small promise I made" },
              { id: "tr3", text: "Be honest, even about small things" },
              { id: "tr4", text: "Accept their pace without pushing" },
              { id: "tr5", text: "Apologize when I make a mistake" },
            ],
          },
        },
        {
          type: "key-point",
          body: "Trust is rebuilt through action, not words. Every kept promise is a deposit in the trust account.",
        },
      ],
    },
    {
      id: "handling-conflict",
      title: "Handling Conflict",
      summary: "Navigate disagreements without escalation or shutdown.",
      durationMinutes: 5,
      content: [
        {
          type: "text",
          body: "Conflict is normal in every relationship. The problem is not having conflict. The problem is handling it in ways that damage the relationship.",
        },
        {
          type: "text",
          body: "Healthy conflict means staying respectful, listening, and working toward a solution — even when you feel angry.",
        },
        {
          type: "example",
          title: "Disagreement with a Roommate",
          body: "Your roommate plays loud music at night. Instead of shouting or silently fuming, you say: \"I need quiet after 10pm for my early shift. Can we figure something out?\"",
        },
        {
          type: "tip",
          body: "If the conversation gets heated, it is okay to say: \"I need to cool down. Can we come back to this in an hour?\"",
        },
        {
          type: "exercise",
          exercise: {
            type: "scenario",
            scenario:
              "Your partner accuses you of not helping enough around the house. You feel defensive because you have been trying hard.",
            question: "How can you respond without escalating?",
            guidedSteps: [
              "Take a breath before responding. Notice the urge to defend.",
              "Acknowledge their feeling first: \"I hear that you feel unsupported.\"",
              "Share your perspective without blame: \"I have been trying to help with...\"",
              "Look for a solution: \"What would help you feel more supported?\"",
            ],
          },
        },
        {
          type: "exercise",
          exercise: {
            type: "multiple-choice",
            question: "During a heated argument, which response de-escalates best?",
            options: [
              {
                id: "a",
                text: "\"You always do this!\"",
                feedback:
                  "This escalates. \"Always\" is a thinking trap word and puts the other person on the defensive.",
              },
              {
                id: "b",
                text: "\"I need a few minutes to think before I respond.\"",
                feedback:
                  "Great choice. Taking space prevents words you might regret.",
              },
              {
                id: "c",
                text: "Walking away without saying anything",
                feedback:
                  "This can feel like abandonment to the other person. It helps to say you need space before stepping away.",
              },
            ],
          },
        },
        {
          type: "key-point",
          body: "Conflict handled well can actually strengthen a relationship. The goal is resolution, not winning.",
        },
      ],
    },
    {
      id: "support-network",
      title: "Building a Support Network",
      summary: "Identify people who support your growth and lean on them.",
      durationMinutes: 5,
      content: [
        {
          type: "text",
          body: "No one succeeds alone. A support network is your circle of people who want to see you thrive. It does not need to be big. It needs to be real.",
        },
        {
          type: "text",
          body: "Your network might include family, friends, mentors, counselors, faith leaders, or even people in a support group.",
        },
        {
          type: "example",
          title: "Building Your Circle",
          body: "You have your PO, a cousin who checks in weekly, and a guy from your program who texts you motivational quotes. That is three people in your corner. That is a network.",
        },
        {
          type: "tip",
          body: "Think of support as having different roles: someone to call in crisis, someone to celebrate with, someone who holds you accountable.",
        },
        {
          type: "exercise",
          exercise: {
            type: "reflection",
            prompt: "Who are two or three people you can count on right now? What role does each one play in your life?",
            placeholder: "1) Name — they help me by... 2) Name — they help me by...",
            minLength: 15,
          },
        },
        {
          type: "exercise",
          exercise: {
            type: "checklist",
            instruction: "Identify what support roles you want to fill or strengthen:",
            items: [
              { id: "n1", text: "Someone to call when I am struggling" },
              { id: "n2", text: "Someone who celebrates my wins with me" },
              { id: "n3", text: "Someone who holds me accountable" },
              { id: "n4", text: "Someone I can be fully honest with" },
              { id: "n5", text: "Someone who knows helpful resources" },
            ],
          },
        },
        {
          type: "key-point",
          body: "You do not need a crowd. You need a few people who truly have your back. Quality over quantity.",
        },
      ],
    },
  ],
};
