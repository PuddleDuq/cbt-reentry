import type { SkillModule } from "@/lib/types";

export const emotionalRegulation: SkillModule = {
  id: "emotional-regulation",
  title: "Emotional Regulation",
  icon: "🌊",
  category: "Coping",
  description:
    "Build skills to ride out strong emotions without being swept away.",
  intro:
    "Emotions are like waves. They rise, they peak, and they fall. You do not need to fight them or drown in them. This module teaches you how to ride those waves with skill and patience. You will learn tools that help you stay steady even when feelings are intense.",
  lessons: [
    {
      id: "emotion-wave",
      title: "The Emotion Wave",
      summary: "Understand how emotions rise and fall naturally.",
      durationMinutes: 4,
      content: [
        {
          type: "text",
          body: "Every emotion has a lifespan. It rises, hits a peak, and then fades. No feeling lasts forever, even when it feels like it will.",
        },
        {
          type: "text",
          body: "Problems happen when we try to push emotions away or hold onto them too tightly. Both can make them stronger.",
        },
        {
          type: "example",
          title: "Waiting for a Callback",
          body: "You interview for a job and feel anxious waiting to hear back. The anxiety peaks around day two. By day four, it has softened. The wave passed on its own.",
        },
        {
          type: "tip",
          body: "When a strong emotion hits, remind yourself: \"This is a wave. It will peak and it will pass.\"",
        },
        {
          type: "exercise",
          exercise: {
            type: "reflection",
            prompt: "Think of a recent strong emotion. How long did it actually last before it started to fade?",
            placeholder: "I felt... and it lasted about...",
            minLength: 10,
          },
        },
        {
          type: "exercise",
          exercise: {
            type: "multiple-choice",
            question: "What usually happens if you try to suppress a strong emotion?",
            options: [
              {
                id: "a",
                text: "It goes away faster",
                feedback:
                  "Actually, pushing emotions down often makes them come back stronger later.",
              },
              {
                id: "b",
                text: "It tends to come back stronger",
                feedback:
                  "Right. Suppressed emotions often build pressure and return with more force.",
              },
              {
                id: "c",
                text: "Nothing changes",
                feedback:
                  "Suppression usually does have an effect — it often delays and intensifies the emotion.",
              },
            ],
          },
        },
        {
          type: "key-point",
          body: "Emotions are temporary visitors. You do not have to act on them. You just need to let them pass through.",
        },
      ],
    },
    {
      id: "grounding-techniques",
      title: "Grounding Techniques",
      summary: "Anchor yourself in the present when emotions feel overwhelming.",
      durationMinutes: 5,
      content: [
        {
          type: "text",
          body: "Grounding pulls you back to the present moment. When emotions take over, your mind often races to the past or future. Grounding says, \"Come back to right now.\"",
        },
        {
          type: "text",
          body: "These techniques use your five senses to reconnect you with your surroundings.",
        },
        {
          type: "example",
          title: "Before a Difficult Conversation",
          body: "You are about to meet with your parole officer and feel anxious. You press your feet into the floor and notice the texture of the chair. You count three sounds you hear. Your breathing slows.",
        },
        {
          type: "tip",
          body: "Carry a small textured object in your pocket — a smooth stone, a keychain. Touch it when you need to ground quickly.",
        },
        {
          type: "exercise",
          exercise: {
            type: "scenario",
            scenario:
              "You are in a waiting room feeling overwhelmed. Your heart is racing and your thoughts are spinning.",
            question: "Walk through a grounding exercise right now.",
            guidedSteps: [
              "Name 5 things you can see in the room around you.",
              "Name 4 things you can physically feel right now.",
              "Name 3 sounds you can hear.",
              "Take two slow, deep breaths.",
              "Notice one thing you are grateful for in this moment.",
            ],
          },
        },
        {
          type: "exercise",
          exercise: {
            type: "checklist",
            instruction: "Choose grounding tools you want to practice this week:",
            items: [
              { id: "g1", text: "5-4-3-2-1 senses exercise" },
              { id: "g2", text: "Press my feet firmly into the ground" },
              { id: "g3", text: "Hold something cold or textured" },
              { id: "g4", text: "Name the colors I see around me" },
              { id: "g5", text: "Describe my surroundings out loud" },
            ],
          },
        },
        {
          type: "key-point",
          body: "Grounding does not make the emotion disappear. It gives you a stable place to stand while the wave passes.",
        },
      ],
    },
    {
      id: "stop-skill",
      title: "The STOP Skill",
      summary: "A four-step method to pause before you react.",
      durationMinutes: 4,
      content: [
        {
          type: "text",
          body: "STOP is a simple skill for heated moments. It stands for: Stop, Take a breath, Observe, and Proceed mindfully.",
        },
        {
          type: "text",
          body: "It works because it interrupts your autopilot. Most regretted actions happen on autopilot.",
        },
        {
          type: "example",
          title: "Anger at Work",
          body: "A coworker takes credit for your idea. Anger flares. You STOP: freeze your body, take one breath, notice the anger in your chest, then choose to address it calmly after the meeting.",
        },
        {
          type: "tip",
          body: "Practice STOP in low-stakes moments first. Try it when you feel mildly annoyed, so it is ready for bigger moments.",
        },
        {
          type: "exercise",
          exercise: {
            type: "sorting",
            instruction: "Put the STOP steps in the correct order.",
            categories: ["Step 1", "Step 2", "Step 3", "Step 4"],
            items: [
              { id: "st1", text: "Stop — freeze and don't react", category: "Step 1" },
              { id: "st2", text: "Take a breath — slow inhale and exhale", category: "Step 2" },
              { id: "st3", text: "Observe — notice what you feel and think", category: "Step 3" },
              { id: "st4", text: "Proceed — choose your next action wisely", category: "Step 4" },
            ],
          },
        },
        {
          type: "exercise",
          exercise: {
            type: "reflection",
            prompt: "Think of a recent time you reacted on autopilot. How might STOP have helped?",
            placeholder: "I could have paused when...",
            minLength: 10,
          },
        },
        {
          type: "key-point",
          body: "STOP takes less than ten seconds. Those seconds can change the outcome of your entire day.",
        },
      ],
    },
    {
      id: "opposite-action",
      title: "Opposite Action",
      summary: "When emotions push you one way, try going the other.",
      durationMinutes: 5,
      content: [
        {
          type: "text",
          body: "Every emotion comes with an urge. Fear says run. Anger says fight. Shame says hide. These urges are not always helpful.",
        },
        {
          type: "text",
          body: "Opposite action means doing the reverse of what the unhelpful emotion pushes you toward. It changes the emotional cycle.",
        },
        {
          type: "example",
          title: "Shame After a Setback",
          body: "You relapse on a goal and feel deep shame. Shame says, \"Isolate. Don't tell anyone.\" The opposite action: reach out to your support person and be honest.",
        },
        {
          type: "tip",
          body: "Opposite action works best when the emotion does not fit the facts. Ask: Is this emotion helping me or hurting me right now?",
        },
        {
          type: "exercise",
          exercise: {
            type: "sorting",
            instruction: "Match each emotion's urge with its opposite action.",
            categories: ["Emotion Urge", "Opposite Action"],
            items: [
              { id: "o1", text: "Shame: hide from everyone", category: "Emotion Urge" },
              { id: "o2", text: "Share honestly with someone safe", category: "Opposite Action" },
              { id: "o3", text: "Anger: lash out or yell", category: "Emotion Urge" },
              { id: "o4", text: "Speak calmly or take space", category: "Opposite Action" },
              { id: "o5", text: "Fear: avoid the situation completely", category: "Emotion Urge" },
              { id: "o6", text: "Approach the situation in small steps", category: "Opposite Action" },
            ],
          },
        },
        {
          type: "exercise",
          exercise: {
            type: "fill-in",
            prompt: "When I feel the urge to isolate, one opposite action I could try is: [blank]",
            hint: "Think of a small step toward connection, like texting someone or going for a walk in public",
          },
        },
        {
          type: "key-point",
          body: "Opposite action is not about ignoring your feelings. It is about choosing a response that moves you forward instead of backward.",
        },
      ],
    },
    {
      id: "distress-tolerance",
      title: "Distress Tolerance",
      summary: "Survive painful moments without making things worse.",
      durationMinutes: 5,
      content: [
        {
          type: "text",
          body: "Some moments just hurt. You cannot fix them right away. Distress tolerance means surviving the pain without creating new problems.",
        },
        {
          type: "text",
          body: "This is not about being tough. It is about being smart with your suffering. Pain is unavoidable. Extra suffering is optional.",
        },
        {
          type: "example",
          title: "Missing Your Family",
          body: "The holidays come and you cannot be with your kids. The grief is real. Instead of numbing it, you write them a letter. You let yourself feel sad without spiraling.",
        },
        {
          type: "tip",
          body: "The TIPP method for intense distress: Temperature (cold water on face), Intense exercise, Paced breathing, Progressive muscle relaxation.",
        },
        {
          type: "exercise",
          exercise: {
            type: "checklist",
            instruction: "Build your distress tolerance toolkit. Pick at least three:",
            items: [
              { id: "d1", text: "Hold ice cubes in my hands" },
              { id: "d2", text: "Do intense exercise for 5 minutes" },
              { id: "d3", text: "Take a cold shower or splash cold water" },
              { id: "d4", text: "Breathe in for 4, hold for 4, out for 6" },
              { id: "d5", text: "Tense and release each muscle group" },
              { id: "d6", text: "Call someone on my support list" },
            ],
          },
        },
        {
          type: "exercise",
          exercise: {
            type: "scenario",
            scenario:
              "You get a letter with bad news about your case. You feel rage and despair rising at the same time.",
            question: "How can you tolerate this distress without acting on the urge to lash out?",
            guidedSteps: [
              "Name what you are feeling without judging it.",
              "Choose one physical tool from your toolkit (ice, exercise, cold water).",
              "Remind yourself: this feeling is temporary.",
              "After 10 minutes, check in with yourself again.",
            ],
          },
        },
        {
          type: "key-point",
          body: "Distress tolerance is not weakness. It takes real strength to sit with pain and choose not to make it worse.",
        },
      ],
    },
    {
      id: "emotional-vocabulary",
      title: "Building Emotional Vocabulary",
      summary: "Name your feelings with precision to understand them better.",
      durationMinutes: 4,
      content: [
        {
          type: "text",
          body: "Many of us grow up with a small emotional vocabulary. We know \"mad,\" \"sad,\" and \"fine.\" But there are hundreds of feelings between those.",
        },
        {
          type: "text",
          body: "When you can name a feeling precisely, it loses some of its power. \"I feel overwhelmed\" gives you more to work with than \"I feel bad.\"",
        },
        {
          type: "example",
          title: "After a Tough Day",
          body: "You come home and say, \"I'm angry.\" But when you look deeper, you realize you are actually feeling disrespected, which is different from angry. That clarity helps you respond better.",
        },
        {
          type: "tip",
          body: "Try this formula: \"I feel [specific emotion] because [situation].\" The more specific the emotion word, the better you understand yourself.",
        },
        {
          type: "exercise",
          exercise: {
            type: "multiple-choice",
            question: "You feel tense after a disagreement with your landlord. Which word best captures what you might be feeling?",
            options: [
              {
                id: "a",
                text: "Frustrated — blocked from what you need",
                feedback:
                  "Frustration fits when you feel stuck or unable to get what you need. That is a useful label.",
              },
              {
                id: "b",
                text: "Anxious — worried about what comes next",
                feedback:
                  "Anxiety points to fear about the future. If you are worried about losing housing, this might be the right word.",
              },
              {
                id: "c",
                text: "Disrespected — not treated fairly",
                feedback:
                  "Feeling disrespected points to your sense of dignity being violated. This is specific and powerful.",
              },
            ],
            allowMultiple: true,
          },
        },
        {
          type: "exercise",
          exercise: {
            type: "fill-in",
            prompt: "Right now, I feel [blank]. This feeling is telling me that [blank].",
            hint: "Try words like: restless, hopeful, drained, curious, guarded, grateful",
          },
        },
        {
          type: "key-point",
          body: "Naming an emotion is like turning on a light. You can see what you are dealing with and choose your next step.",
        },
      ],
    },
  ],
};
