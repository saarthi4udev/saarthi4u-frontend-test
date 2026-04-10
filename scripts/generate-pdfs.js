const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'public', 'files');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const universities = [
  { name: 'Sikkim University', fileName: 'sikkim-university-fee-structure.pdf' },
  { name: 'Asian International University', fileName: 'asian-international-university-fee-structure.pdf' },
  { name: 'Vivekananda Global University (VGU)', fileName: 'vivekananda-global-university-fee-structure.pdf' },
  { name: 'GLA University', fileName: 'gla-university-fee-structure.pdf' },
  { name: 'Sikkim Manipal University (SMU)', fileName: 'sikkim-manipal-university-fee-structure.pdf' },
  { name: 'Online Manipal University', fileName: 'online-manipal-university-fee-structure.pdf' },
  { name: 'Lovely Professional University (LPU)', fileName: 'lovely-professional-university-fee-structure.pdf' },
  { name: 'Sharda University (Bangalore)', fileName: 'sharda-university-bangalore-fee-structure.pdf' },
  { name: 'Amity University', fileName: 'amity-university-fee-structure.pdf' },
  { name: 'Sharda University (Deemed-to-be University)', fileName: 'sharda-university-deemed-fee-structure.pdf' },
  { name: 'BOSSE Open Board (10th/12th)', fileName: 'bosse-open-board-fee-structure.pdf' },
  { name: 'Suresh Gyan Vihar University', fileName: 'suresh-gyan-vihar-university-fee-structure.pdf' },
];

function makePdf(text) {
  const lines = [
    '%PDF-1.3',
    '1 0 obj',
    '<< /Type /Catalog /Pages 2 0 R >>',
    'endobj',
    '2 0 obj',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    'endobj',
    '3 0 obj',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
    'endobj',
    '4 0 obj',
    '<< /Length 63 >>',
    'stream',
    'BT',
    '/F1 24 Tf',
    '72 720 Td',
    `(${text}) Tj`,
    'ET',
    'endstream',
    'endobj',
    '5 0 obj',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    'endobj',
  ];
  const body = lines.join('\n') + '\n';
  const xrefStart = Buffer.byteLength(body, 'utf8');
  const xrefLines = [
    'xref',
    '0 6',
    '0000000000 65535 f ',
    '0000000010 00000 n ',
    '0000000060 00000 n ',
    '0000000115 00000 n ',
    '0000000195 00000 n ',
    '0000000291 00000 n ',
    'trailer',
    '<< /Size 6 /Root 1 0 R >>',
    'startxref',
    String(xrefStart),
    '%%EOF',
  ].join('\n') + '\n';
  return body + xrefLines;
}

for (const uni of universities) {
  const pdf = makePdf(`Fee Structure for ${uni.name}`);
  fs.writeFileSync(path.join(dir, uni.fileName), pdf, 'utf8');
}
console.log('Created', universities.length, 'PDF files in public/files');
