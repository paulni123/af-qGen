
import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'; // Replace this import with the appropriate SDK or library you're using.

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY
});

export const runtime = 'edge';

export async function generateQuestions(content) {

  const trainingContent = `
  (1) Sir Andrew's face had become almost transfigured.
  (2) His eyes shone with enthusiasm; hero-worship, love, admiration for his leader seemed literally to glow upon his face.
  (3) "The Scarlet Pimpernel, Mademoiselle," he said at last "is the name of a humble English wayside flower; but it is also the name chosen to hide the identity of the best and bravest man in all the world, so that he may better succeed in accomplishing the noble task he has set himself to do."
  (4) "Ah, yes," here interposed Comtesse's son, "I have heard speak of this Scarlet Pimpernel.
  (5) They say in Paris that every time a royalist escapes to England that devil, the Public Prosecutor, receives a paper with that little flower designated in red upon it.... Yes?"
  (6) "Yes, that is so," assented Lord Antony.
  (7) "Then he will have received one such paper today?"
  (8) "Undoubtedly."
  (9) "Oh! I wonder what he will say!" said Suzanne, merrily.
  (10) "I have heard that the picture of that little red flower is the only thing that frightens him."
  (11) "Ah, monsieur," sighed the Comtesse, "it all sounds like a romance, and I cannot understand it all."
  (12) "Why should you try, Madame?"
  (13) "But, tell me, why should you and your leader spend your money and risk your lives when you set foot in France, all for us French men and women, who are nothing to you?"
  (14) "Sport, Madame la Comtesse, sport," asserted Lord Antony, with his jovial, loud and pleasant voice; "we are a nation of sportsmen, you know, and just now it is the fashion to pull the hare from between the teeth of the hound."
  (15) "Ah, no, no, not sport only, Monsieur... you have a more noble motive, I am sure, for the good work you do."
  (16) "Faith, Madame, I would like you to find it then... as for me, I vow, I love the game, for this is the finest sport I have yet encountered.
  (17) -Hair-breadth escapes... the devil's own risks!
  (18) -Tally ho!
  (19) -and away we go!"
  (20) But the Comtesse shook her head, still incredulously.
  (21) To her it seemed preposterous that these young men and their great leader, all of them rich, probably wellborn, and young, should for no other motive than sport, run the terrible risks, which she knew they were constantly doing.
  (22) Their nationality, once they had set foot in France, would be no safeguard to them.
  (23) Anyone found harboring or assisting suspected royalists would be ruthlessly condemned and summarily executed, whatever his nationality.
  (24) And this band of young Englishmen had, to her own knowledge, bearded the implacable and bloodthirsty tribunal of the Revolution, within the very walls of Paris itself, and had snatched away condemned victims, almost from the very foot of the guillotine.
  (25) With a shudder, she recalled the events of the last few days, her escape from Paris with her two children, all three of them hidden beneath the hood of a rickety cart, and lying amidst a heap of turnips and cabbages, not daring to breathe, whilst the mob howled outside.
  (26) It had all occurred in such a miraculous way; she and her husband had been placed on the list of "suspected persons," which meant that their trial and death were but a matter of days-of hours, perhaps.
  (27) Then came the hope of salvation; the mysterious epistle, signed with the enigmatical scarlet device; the clear, peremptory directions; the parting from the Comte de Tournay, which had torn the poor wife's heart in two; the hope of reunion; the flight with her two children; the covered cart; that awful hag driving it, who looked like some horrible demon, with the ghastly trophy on her whip handle!
  (28) The Comtesse looked round at the quaint, old-fashioned English inn, the peace of this land of civil and religious liberty.
  (29) She closed her eyes to shut out the haunting vision of that West Barricade, and of the mob retreating panic-stricken when the old hag spoke of the plague.
  (30) Every moment under that cart she expected recognition, arrest, herself and her children tried and condemned, and these young Englishmen, under the guidance of their brave and mysterious leader, had risked their lives to save them all.
  (31) And all only for sport?
  (32) The Comtesse's eyes as she sought those of Sir Andrew plainly told him that she thought that he at any rate rescued his fellow men from terrible and unmerited death, through a higher and nobler motive than his friend would have her believe.
  `

  const dataDictTemplate = {
    "questions": [
        {
            "id": "1",
            "question": "The passage as a whole is primarily concerned with",
            "type": "multiple_choice",
            "options": [
                "A. considering the reasons behind a set of exploits.",
                "B. examining the causes of a revolution.",
                "C. comparing the self-confidence of two different men.",
                "D. questioning the ruthlessness of a government."
            ],
            "correct_answer": "A. considering the reasons behind a set of exploits.",
            "whyCorrectAnswer": "The main idea of the passage is that the Scarlet Pimpernel rescues French nobles because it is fun. Choice (A) is correct because that is the reason behind the Pimpernel's actions.",
            "difficulty": 2
        },
        {
            "id": "2",
            "question": "Based on the information in the passage, it can be inferred that when the Comtesse escaped, the people in the nearby crowd did not approach her cart because",
            "type": "multiple_choice",
            "options": [
                "A. the cart was moving too quickly.",
                "B. they feared arrest and death by guillotine.",
                "C. the woman driving the cart was known to be violent.",
                "D. they were afraid of contracting a disease."
            ],
            "correct_answer": "D. they were afraid of contracting a disease.",
            "whyCorrectAnswer": "In line 29, the driver causes the mob to retreat by mentioning the plague. Therefore, (D) is correct.",
            "difficulty": 2
        },
        {
            "id": "3",
            "question": "Which choice provides the best evidence for the answer to the previous question?",
            "type": "multiple_choice",
            "options": [
                "A. Lines 24 ('And this…guillotine')",
                "B. Lines 27 ('Then came…children')",
                "C. Lines 27 ('the covered…handle')",
                "D. Lines 29 ('She…plague')"
            ],
            "correct_answer": "D. Lines 29 ('She…plague')",
            "whyCorrectAnswer": "Choice (D) is correct because it is the only answer that mentions disease or plague.",
            "difficulty": 3
        },
        {
            "id": "4",
            "question": "As used in line 5, 'designated' most nearly means",
            "type": "multiple_choice",
            "options": [
                "A. budgeted.",
                "B. chosen.",
                "C. classed.",
                "D. illustrated."
            ],
            "correct_answer": "D. illustrated.",
            "whyCorrectAnswer": "In the sentence in question, the flower is drawn in red. Therefore, designated must mean something like drawn. Only illustrated means drawn. Therefore, (D) is correct.",
            "difficulty": 1
        },
        {
            "id": "5",
            "question": "In context, the phrase 'pull the hare from between the teeth of the hound' (lines 14) refers chiefly to",
            "type": "multiple_choice",
            "options": [
                "A. dangerous English hunting customs.",
                "B. plans to avenge the deaths of innocent Englishmen.",
                "C. delivering members of the French aristocracy from harm.",
                "D. the cruelty of French nobles toward revolutionaries."
            ],
            "correct_answer": "C. delivering members of the French aristocracy from harm.",
            "whyCorrectAnswer": "Choice (C) is an accurate characterization of Lord Antony's use of the phrase in question: In Lord Antony's metaphor, the French aristocracy is the hare, and the harm is the teeth of the hound.",
            "difficulty": 2
        },
        {
            "id": "6",
            "question": "Which choice provides the best evidence for the answer to the previous question?",
            "type": "multiple_choice",
            "options": [
                "A. Lines 14 ('Faith…go')",
                "B. Lines 22 ('Their nationality…them')",
                "C. Lines 23 ('Anyone…nationality')",
                "D. Lines 26 ('It had…perhaps')"
            ],
            "correct_answer": "C. Lines 23 ('Anyone…nationality')",
            "whyCorrectAnswer": "Choice (C) is correct because it describes the Pimpernel's men delivering French nobles from harm.",
            "difficulty": 3
        },
        {
            "id": "7",
            "question": "In lines 20-25, the Comtesse is best described as",
            "type": "multiple_choice",
            "options": [
                "A. critical.",
                "B. anxious.",
                "C. relieved.",
                "D. perplexed."
            ],
            "correct_answer": "D. perplexed.",
            "whyCorrectAnswer": "In the sentence in question, the Comtesse is described as incredulous, which means that she has trouble believing the reason given to explain why the Pimpernel and his companions have gone to France to rescue aristocrats.",
            "difficulty": 2
        },
        {
            "id": "8",
            "question": "As used in line 24, 'bearded' most nearly means",
            "type": "multiple_choice",
            "options": [
                "A. camouflaged.",
                "B. braved.",
                "C. embellished.",
                "D. masked."
            ],
            "correct_answer": "B. braved.",
            "whyCorrectAnswer": "Bearded describes the Pimpernel's men, who we know are courageous for rescuing the Comtesse. Therefore, bearded must mean something like 'faced with courage.'",
            "difficulty": 3
        },
        {
            "id": "9",
            "question": "Lines 28-29 provide a contrast between",
            "type": "multiple_choice",
            "options": [
                "A. tranquility and turmoil.",
                "B. traditionalism and modernity.",
                "C. freedom and ignorance.",
                "D. austerity and hysteria."
            ],
            "correct_answer": "A. tranquility and turmoil.",
            "whyCorrectAnswer": "The two sentences in question draw a contrast between the peace of England and the chaos of France. Tranquility means 'peace' and turmoil means 'chaos.' Therefore, (A) is correct.",
            "difficulty": 3
        },
        {
            "id": "10",
            "question": "The use of italics in line 32 primarily serves to emphasize a perceived distinction between",
            "type": "multiple_choice",
            "options": [
                "A. the reasons behind one man's actions and those behind his companions' actions.",
                "B. the effectiveness of two different methods of carrying out the same plan.",
                "C. honest, noble motivations for rescue and rescue for monetary gain.",
                "D. a desire for adventure and a desire for public admiration and praise."
            ],
            "correct_answer": "A. the reasons behind one man's actions and those behind his companions' actions.",
            "whyCorrectAnswer": "In the paragraph in question, the Comtesse compares her perception of Sir Antony's motives with those of Sir Andrew. Therefore, (A) is a good description of the distinction emphasized by the italics.",
            "difficulty": 4
        }
    ]
  };

  const newString = JSON.stringify(dataDictTemplate, null, 4);

  const system_msg = `You are an AI agent designed to generate SAT level difficulty reading comprehension questions for a given passage. (11 questions). 
  Ensure that these questions cover the breadth of the passage and that they can help augment SAT test taker's reading comprehension ability.
  Ensure that the questions vary in difficulty, from 1 to 5, where 1 is easy and 5 is very difficult, and help challenge prospective test takers.
  I want a format similar to ${newString} and make sure it has the right amount of questions as specified.`;

  const user_content1 = `Given the passage below, generate a suite of 11 SAT reading questions as well as 4 answer choices for each question. I want a mixture of medium to hard questions that are somewhat similar to the previous questions.
  Return the questions, their answer choices, the correct answer choice, a brief rationale for the correct answer, and an estimated difficulty score for each question. 
  There are line numbers in the passage in the form of (x), indicating that line up until the next (x + 1) is the line number x. 
  If you are referring to line numbers in a question/answer, make sure to use the line number given in the passage. Also make sure the JSON is properly formatted and doesn't have any missing commas.
  Only use lines from the given passage below please.
  The following represents the entire text of the passage. Passage: ${trainingContent}`;

  const assistant_content_1 = JSON.stringify(dataDictTemplate, null, 4);

  const user_content2 = `Given the passage below, generate a suite of 11 SAT reading questions as well as 4 answer choices for each question. I want a mixture of medium to hard questions that are somewhat similar to the previous questions.
  Return the questions, their answer choices, the correct answer choice, a brief rationale for the correct answer, and an estimated difficulty score for each question. 
  There are line numbers in the passage in the form of (x), indicating that line up until the next (x + 1) is the line number x. 
  If you are referring to line numbers in a question/answer, make sure to use the line number given in the passage. Also make sure the JSON is properly formatted and doesn't have any missing commas.
  Only use lines from the given passage below please.
  The following represents the entire text of the passage. Passage: ${content}`;
  

  try {
    console.log("Generating question...");

    const response = await openai.chat.completions.create({
        model: 'gpt-4',
        stream: true,
        messages: [
          { "role": "system", "content": system_msg },
          { "role": "user", "content": user_content1 },
          { "role": "assistant", "content": assistant_content_1 },
          { "role": "user", "content": user_content2 }
        ]
      });
  

      const stream = OpenAIStream(response);

      return new StreamingTextResponse(stream);

  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}
