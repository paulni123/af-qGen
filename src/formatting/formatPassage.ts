import { split } from 'sentence-splitter';
import * as fs from 'fs';

let text: string = `
"For the first time in forty years, hon, I haven't got the shakes--look
at me!" "Cross your fingers," said Lou. "The lawyer's going to try to get us a
year." "Gee!" Em said dreamily. "I wonder what kind of wires you'd have to pull
to get put away in solitary?" "All right, pipe down," said the turnkey, "or I'll toss the whole kit
and caboodle of you right out. And first one who lets on to anybody
outside how good jail is ain't never getting back in!" The prisoners instantly fell silent. *       *       *       *       *

The living room of the apartment darkened for a moment as the riot
scenes faded on the television screen, and then the face of the
announcer appeared, like the Sun coming from behind a cloud. "And now,
friends," he said, "I have a special message from the makers of
anti-gerasone, a message for all you folks over 150. Are you hampered
socially by wrinkles, by stiffness of joints and discoloration or loss
of hair, all because these things came upon you before anti-gerasone was
developed? Well, if you are, you need no longer suffer, need no longer
feel different and out of things. "After years of research, medical science has now developed
_Super_-anti-gerasone! In weeks--yes, weeks--you can look, feel and act
as young as your great-great-grandchildren! Wouldn't you pay $5,000 to
be indistinguishable from everybody else? Well, you don't have to. Safe,
tested _Super_-anti-gerasone costs you only a few dollars a day. "Write now for your free trial carton. Just put your name and address on
a dollar postcard, and mail it to '_Super_,' Box 500,000, Schenectady,
N. Y. Have you got that? I'll repeat it. '_Super_,' Box 500,000 ..."

Underlining the announcer's words was the scratching of Gramps' pen, the
one Willy had given him the night before. He had come in, a few minutes
earlier, from the Idle Hour Tavern, which commanded a view of Building
257 from across the square of asphalt known as the Alden Village Green. He had called a cleaning woman to come straighten the place up, then had
hired the best lawyer in town to get his descendants a conviction, a
genius who had never gotten a client less than a year and a day. Gramps
had then moved the daybed before the television screen, so that he could
watch from a reclining position. It was something he'd dreamed of doing
for years. "Schen-_ec_-ta-dy," murmured Gramps. "Got it!" His face had changed
remarkably. His facial muscles seemed to have relaxed, revealing
kindness and equanimity under what had been taut lines of bad temper. It
was almost as though his trial package of _Super_-anti-gerasone had
already arrived. When something amused him on television, he smiled
easily, rather than barely managing to lengthen the thin line of his
mouth a millimeter. Life was good. He could hardly wait to see what was going to happen
next. --KURT VONNEGUT, JR.
`


function splitSentences(text: string): string[] {
    const honorifics = ['Mr.', 'Mrs.', 'Dr.', 'Ms.'];
    for (const honorific of honorifics) {
        const placeholder = honorific.replace('.', '__DOT__');
        text = text.split(honorific).join(placeholder);
    }

    let sentences = text
        .split(/(?<=[.!?])\s+/g)  // Split the text on sentence delimiters
        .map(sentence => sentence.replace(/\s+/g, ' ').replace(/__DOT__/g, '.'));  // Replace extra whitespace and tabs, then replace placeholder back to dot

    return sentences;
}

function numberSentences(text: string): string {
    let sentences = splitSentences(text);
    let numberedText = '';
    for (let i = 0, sentenceNumber = 1; i < sentences.length; i++) {
        // Ensure each sentence is on a new line with no extra whitespace
        let trimmedSentence = sentences[i].trim();
        if (trimmedSentence) {  // Check if the sentence is not empty
            let numberedSentence = `(${sentenceNumber}) ${trimmedSentence}\n`;
            numberedText += numberedSentence;
            sentenceNumber++;
        }
    }
    return numberedText;
}


let numberedText: string = numberSentences(text);
console.log(numberedText);
fs.writeFileSync('reformatted_text.txt', numberedText, 'utf8');
