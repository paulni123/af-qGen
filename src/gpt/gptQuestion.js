import OpenAI from 'openai';
import fs from 'fs/promises';

const openai = new OpenAI({
    apiKey: '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',
});

async function generateReadingQuestions(formattedPassage) {
    // Reading the contents from the files
    const content = await fs.readFile("promptPassage1.txt", "utf8");
    const finalContent = await fs.readFile("promptPassage2.txt", "utf8"); // Pass content in here after 
    const assistantContent = await fs.readFile("sampleQuestions.json", "utf8");

    const system_msg = `You are an AI agent designed to generate SAT level difficulty reading comprehension questions for a given passage. (11 questions). 
Ensure that these questions cover the breadth of the passage and that they can help augment SAT test taker's reading comprehension ability.
Ensure that the questions vary in difficulty, from 1 to 5, where 1 is easy and 5 is very difficult, and help challenge prospective test takers.`;

    const user_content1 = `Given the passage below, generate a suite of 11 SAT reading questions as well as 4-5 answer choices for each question. Return the questions,
their answer choices, the correct answer choice, a brief rationale for the correct answer, and an estimated difficulty score for each question. 
There are line numbers in the passage in the form of (x), indicating that line up until the next (x + 1) is the line number x. 
The following represents the entire text of the passage. Passage: ${content}`;

    const user_content2 = `Given the passage below, generate a suite of 11 SAT reading questions as well as 4-5 answer choices for each question. I want a mixture of medium to hard questions that are somewhat similar to the previous questions.
Return the questions, their answer choices, the correct answer choice, a brief rationale for the correct answer, and an estimated difficulty score for each question. 
There are line numbers in the passage in the form of (x), indicating that line up until the next (x + 1) is the line number x. 
If you are referring to line numbers in a question/answer, make sure to use the line number given in the passage. The following represents the entire text of the passage. Passage: ${finalContent}`;

    console.log("Calling OpenAI API")

    // Calling OpenAI API
    const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            { role: "system", content: system_msg },
            { role: "user", content: user_content1 },
            { role: "assistant", content: assistantContent },
            { role: "user", content: user_content2 }
        ]
    });

    console.log("Done calling OpenAI API")

    // Getting the message from the response
    const response_content = completion.choices[0].message.content;

    await fs.writeFile("final.json", JSON.stringify(response_content, null, 4));

    return response_content;
}

// Call the function
const content = await generateReadingQuestions();
console.log(content)
