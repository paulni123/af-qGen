import puppeteer from 'puppeteer';

export async function generatePdf(content, questions, subject) {
  const passageLines = content.split(/(?=\(\d+\))/);

  let htmlContent = `
    <style>
      @page {
        margin-top: 60px;
        margin-bottom: 40px;
        @top-center {
          content: "SAT ${subject} Test";
          font-family: 'Arial';
          font-size: 24px; 
          font-weight: bold;
        }
        @bottom-center {
          content: "Page " counter(page);
          font-family: 'Arial';
          font-size: 16px; 
          font-style: italic;
        }
      }
      body { font-family: 'Arial'; padding: 20px; }
      .passage { margin-bottom: 20px; }
      .passage p { margin: 0; }
      .passage p strong { font-weight: bold; }
      .question { margin-top: 30px; margin-bottom: 30px; page-break-inside: avoid; }
      .page-break { break-after: always; }
    </style>
    <div class="content">
      <div class="passage">
        ${passageLines.map(line => `<p>${line.replace(/(\(\d+\))/g, '<strong>$1</strong>')}</p>`).join('')}
      </div>
      <div class="page-break"></div>
  `;

  questions.forEach((question, index) => {
    let tableContent = '';
    if (question.includesVisual && question.visualData.html) {
      tableContent = `
      <div class="visual" style="margin-bottom: 20px;">
        ${question.visualData.html.replace('<table>', '<table style="width: 100%; border-collapse: collapse; border: 1px solid black;">')
          .replace(/<td>/g, '<td style="border: 1px solid black; padding: 8px; text-align: center;">')
          .replace(/<th>/g, '<th style="border: 1px solid black; padding: 8px; text-align: center; background-color: #f2f2f2;">')}
      </div>`;
    }

    htmlContent += `
      ${tableContent}
        <div class="question">
          <b>Q${index + 1}: ${question.question}</b>
          <ul>
            ${question.options.map(opt => `<li>${opt}</li>`).join('')}
          </ul>
          <p><b>Correct Answer:</b> ${question.correct_answer}</p>
          <p><b>Reason:</b> ${question.whyCorrectAnswer}</p>
        </div>
    `;
  });

  htmlContent += `</div>`;

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ]
  });
  const page = await browser.newPage();

  await page.setContent(htmlContent);

  const pdfBuffer = await page.pdf({
    format: 'A4',
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="font-size: 24px; font-weight: bold; text-align: center; width: 100%;">
        SAT ${subject} Test
      </div>
    `,
    footerTemplate: `
      <div style="font-size: 16px; font-style: italic; text-align: center; width: 100%;">
        Page <span class="pageNumber"></span>
      </div>
    `
  });

  await browser.close();

  return pdfBuffer;
};