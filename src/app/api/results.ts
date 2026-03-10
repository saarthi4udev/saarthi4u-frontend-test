import { BoardResult } from "@/types/result";

export const boardResults: BoardResult[] = [
  {
    id: "cbse-10th",
    board: "CBSE",
    resultName: "SSC (Class 10) Result",
    description: "Official result portal for CBSE Class 10 board results.",
    officialResultLink: "https://results.cbse.nic.in/",
  },
  {
    id: "cbse-12th",
    board: "CBSE",
    resultName: "HSC (Class 12) Result",
    description: "Official result portal for CBSE Class 12 board results.",
    officialResultLink: "https://results.cbse.nic.in/",
  },
  {
    id: "ncert-10th",
    board: "NCERT",
    resultName: "SSC (Class 10) Result",
    description: "Reference board result listing for NCERT-aligned curriculum.",
    officialResultLink: "https://www.ncert.nic.in/",
  },
  {
    id: "state-board-ssc",
    board: "State Board",
    resultName: "SSC Result",
    description: "Find SSC results from the respective official state board portals.",
    officialResultLink: "https://results.gov.in/",
  },
  {
    id: "state-board-hsc",
    board: "State Board",
    resultName: "HSC Result",
    description: "Find HSC results from the respective official state board portals.",
    officialResultLink: "https://results.gov.in/",
  },
];

export async function getBoardResults(): Promise<BoardResult[]> {
  return boardResults.filter((item) => item.isActive !== false);
}
