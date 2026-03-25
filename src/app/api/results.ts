import { getAllExams } from "@/app/api/exam";
import { ResultItem } from "@/types/result";

export const boardResults: ResultItem[] = [
  { id: "cbse-10", section: "Board Results", board: "CBSE", category: "School Boards", resultName: "CBSE Class 10 Result", description: "Official CBSE secondary examination result portal.", officialResultLink: "https://results.cbse.nic.in/", source: "CBSE" },
  { id: "cbse-12", section: "Board Results", board: "CBSE", category: "School Boards", resultName: "CBSE Class 12 Result", description: "Official CBSE senior secondary examination result portal.", officialResultLink: "https://results.cbse.nic.in/", source: "CBSE" },
  { id: "cisce-icse", section: "Board Results", board: "CISCE", category: "School Boards", resultName: "ICSE (Class 10) Result", description: "Official CISCE ICSE result updates.", officialResultLink: "https://cisce.org/", source: "CISCE" },
  { id: "cisce-isc", section: "Board Results", board: "CISCE", category: "School Boards", resultName: "ISC (Class 12) Result", description: "Official CISCE ISC result updates.", officialResultLink: "https://cisce.org/", source: "CISCE" },
  { id: "nios-10", section: "Board Results", board: "NIOS", category: "Open Schooling", resultName: "NIOS Secondary (Class 10) Result", description: "Official NIOS secondary exam result portal.", officialResultLink: "https://results.nios.ac.in/", source: "NIOS" },
  { id: "nios-12", section: "Board Results", board: "NIOS", category: "Open Schooling", resultName: "NIOS Senior Secondary (Class 12) Result", description: "Official NIOS senior secondary exam result portal.", officialResultLink: "https://results.nios.ac.in/", source: "NIOS" },

  { id: "up-10", section: "Board Results", board: "UP Board", category: "State Boards", resultName: "UPMSP Class 10 Result", description: "Uttar Pradesh board class 10 result portal.", officialResultLink: "https://upresults.nic.in/", source: "UPMSP" },
  { id: "up-12", section: "Board Results", board: "UP Board", category: "State Boards", resultName: "UPMSP Class 12 Result", description: "Uttar Pradesh board class 12 result portal.", officialResultLink: "https://upresults.nic.in/", source: "UPMSP" },
  { id: "bihar-10", section: "Board Results", board: "Bihar Board", category: "State Boards", resultName: "BSEB Matric Result", description: "Bihar Board matric result updates.", officialResultLink: "https://results.biharboardonline.com/", source: "BSEB" },
  { id: "bihar-12", section: "Board Results", board: "Bihar Board", category: "State Boards", resultName: "BSEB Intermediate Result", description: "Bihar Board intermediate result updates.", officialResultLink: "https://results.biharboardonline.com/", source: "BSEB" },
  { id: "mh-ssc", section: "Board Results", board: "Maharashtra Board", category: "State Boards", resultName: "MSBSHSE SSC Result", description: "Maharashtra SSC result portal.", officialResultLink: "https://mahresult.nic.in/", source: "MSBSHSE" },
  { id: "mh-hsc", section: "Board Results", board: "Maharashtra Board", category: "State Boards", resultName: "MSBSHSE HSC Result", description: "Maharashtra HSC result portal.", officialResultLink: "https://mahresult.nic.in/", source: "MSBSHSE" },
  { id: "wb-10", section: "Board Results", board: "West Bengal Board", category: "State Boards", resultName: "WBBSE Madhyamik Result", description: "West Bengal Madhyamik result updates.", officialResultLink: "https://wbbse.wb.gov.in/", source: "WBBSE" },
  { id: "wb-12", section: "Board Results", board: "West Bengal Board", category: "State Boards", resultName: "WBCHSE HS Result", description: "West Bengal higher secondary result updates.", officialResultLink: "https://wbchse.wb.gov.in/", source: "WBCHSE" },
  { id: "rj-10", section: "Board Results", board: "RBSE", category: "State Boards", resultName: "RBSE Class 10 Result", description: "Rajasthan Board Class 10 results.", officialResultLink: "https://rajeduboard.rajasthan.gov.in/", source: "RBSE" },
  { id: "rj-12", section: "Board Results", board: "RBSE", category: "State Boards", resultName: "RBSE Class 12 Result", description: "Rajasthan Board Class 12 results.", officialResultLink: "https://rajeduboard.rajasthan.gov.in/", source: "RBSE" },
  { id: "mp-10", section: "Board Results", board: "MP Board", category: "State Boards", resultName: "MPBSE Class 10 Result", description: "Madhya Pradesh Class 10 results.", officialResultLink: "https://mpbse.nic.in/", source: "MPBSE" },
  { id: "mp-12", section: "Board Results", board: "MP Board", category: "State Boards", resultName: "MPBSE Class 12 Result", description: "Madhya Pradesh Class 12 results.", officialResultLink: "https://mpbse.nic.in/", source: "MPBSE" },
  { id: "gj-10", section: "Board Results", board: "GSEB", category: "State Boards", resultName: "GSEB SSC Result", description: "Gujarat SSC result updates.", officialResultLink: "https://www.gseb.org/", source: "GSEB" },
  { id: "gj-12", section: "Board Results", board: "GSEB", category: "State Boards", resultName: "GSEB HSC Result", description: "Gujarat HSC result updates.", officialResultLink: "https://www.gseb.org/", source: "GSEB" },
  { id: "ts-10", section: "Board Results", board: "Telangana Board", category: "State Boards", resultName: "TS SSC Result", description: "Telangana SSC result updates.", officialResultLink: "https://bse.telangana.gov.in/", source: "BSE Telangana" },
  { id: "ts-12", section: "Board Results", board: "Telangana Board", category: "State Boards", resultName: "TS Inter Result", description: "Telangana intermediate result updates.", officialResultLink: "https://tgbie.cgg.gov.in/", source: "TGBIE" },
  { id: "ap-10", section: "Board Results", board: "Andhra Pradesh Board", category: "State Boards", resultName: "AP SSC Result", description: "Andhra Pradesh SSC result updates.", officialResultLink: "https://bse.ap.gov.in/", source: "BSE AP" },
  { id: "ap-12", section: "Board Results", board: "Andhra Pradesh Board", category: "State Boards", resultName: "AP Inter Result", description: "Andhra Pradesh intermediate result updates.", officialResultLink: "https://bie.ap.gov.in/", source: "BIE AP" },
  { id: "ka-10", section: "Board Results", board: "Karnataka Board", category: "State Boards", resultName: "KSEAB SSLC Result", description: "Karnataka SSLC result updates.", officialResultLink: "https://kseab.karnataka.gov.in/", source: "KSEAB" },
  { id: "ka-12", section: "Board Results", board: "Karnataka Board", category: "State Boards", resultName: "KSEAB 2nd PUC Result", description: "Karnataka PUC result updates.", officialResultLink: "https://kseab.karnataka.gov.in/", source: "KSEAB" },
  { id: "tn-10", section: "Board Results", board: "Tamil Nadu Board", category: "State Boards", resultName: "TN SSLC Result", description: "Tamil Nadu SSLC result updates.", officialResultLink: "https://www.dge.tn.gov.in/", source: "DGE Tamil Nadu" },
  { id: "tn-12", section: "Board Results", board: "Tamil Nadu Board", category: "State Boards", resultName: "TN HSE +2 Result", description: "Tamil Nadu HSE result updates.", officialResultLink: "https://www.dge.tn.gov.in/", source: "DGE Tamil Nadu" },
  { id: "kl-10", section: "Board Results", board: "Kerala Board", category: "State Boards", resultName: "Kerala SSLC Result", description: "Kerala SSLC result updates.", officialResultLink: "https://keralaresults.nic.in/", source: "Kerala Pareeksha Bhavan" },
  { id: "kl-12", section: "Board Results", board: "Kerala Board", category: "State Boards", resultName: "Kerala DHSE Plus Two Result", description: "Kerala Plus Two result updates.", officialResultLink: "https://keralaresults.nic.in/", source: "DHSE Kerala" },
  { id: "od-10", section: "Board Results", board: "Odisha Board", category: "State Boards", resultName: "BSE Odisha Class 10 Result", description: "Odisha Class 10 result updates.", officialResultLink: "https://bseodisha.ac.in/", source: "BSE Odisha" },
  { id: "od-12", section: "Board Results", board: "Odisha Board", category: "State Boards", resultName: "CHSE Odisha Class 12 Result", description: "Odisha Class 12 result updates.", officialResultLink: "https://chseodisha.nic.in/", source: "CHSE Odisha" },
  { id: "pb-10", section: "Board Results", board: "Punjab Board", category: "State Boards", resultName: "PSEB Class 10 Result", description: "Punjab Class 10 result updates.", officialResultLink: "https://www.pseb.ac.in/", source: "PSEB" },
  { id: "pb-12", section: "Board Results", board: "Punjab Board", category: "State Boards", resultName: "PSEB Class 12 Result", description: "Punjab Class 12 result updates.", officialResultLink: "https://www.pseb.ac.in/", source: "PSEB" },
  { id: "hr-10", section: "Board Results", board: "HBSE", category: "State Boards", resultName: "HBSE Class 10 Result", description: "Haryana Class 10 result updates.", officialResultLink: "https://bseh.org.in/", source: "BSEH" },
  { id: "hr-12", section: "Board Results", board: "HBSE", category: "State Boards", resultName: "HBSE Class 12 Result", description: "Haryana Class 12 result updates.", officialResultLink: "https://bseh.org.in/", source: "BSEH" },
  { id: "as-10", section: "Board Results", board: "Assam Board", category: "State Boards", resultName: "SEBA HSLC Result", description: "Assam HSLC result updates.", officialResultLink: "https://site.sebaonline.org/", source: "SEBA" },
  { id: "as-12", section: "Board Results", board: "Assam Board", category: "State Boards", resultName: "AHSEC HS Result", description: "Assam higher secondary result updates.", officialResultLink: "https://ahsec.assam.gov.in/", source: "AHSEC" },
  { id: "jh-10", section: "Board Results", board: "Jharkhand Board", category: "State Boards", resultName: "JAC Class 10 Result", description: "Jharkhand Class 10 result updates.", officialResultLink: "https://jac.jharkhand.gov.in/", source: "JAC" },
  { id: "jh-12", section: "Board Results", board: "Jharkhand Board", category: "State Boards", resultName: "JAC Class 12 Result", description: "Jharkhand Class 12 result updates.", officialResultLink: "https://jac.jharkhand.gov.in/", source: "JAC" },
  { id: "cg-10", section: "Board Results", board: "CGBSE", category: "State Boards", resultName: "CGBSE Class 10 Result", description: "Chhattisgarh Class 10 result updates.", officialResultLink: "https://cgbse.nic.in/", source: "CGBSE" },
  { id: "cg-12", section: "Board Results", board: "CGBSE", category: "State Boards", resultName: "CGBSE Class 12 Result", description: "Chhattisgarh Class 12 result updates.", officialResultLink: "https://cgbse.nic.in/", source: "CGBSE" },
  { id: "uk-10", section: "Board Results", board: "UBSE", category: "State Boards", resultName: "UBSE Class 10 Result", description: "Uttarakhand Class 10 result updates.", officialResultLink: "https://ubse.uk.gov.in/", source: "UBSE" },
  { id: "uk-12", section: "Board Results", board: "UBSE", category: "State Boards", resultName: "UBSE Class 12 Result", description: "Uttarakhand Class 12 result updates.", officialResultLink: "https://ubse.uk.gov.in/", source: "UBSE" },
  { id: "hp-10", section: "Board Results", board: "HPBOSE", category: "State Boards", resultName: "HPBOSE Class 10 Result", description: "Himachal Pradesh Class 10 result updates.", officialResultLink: "https://hpbose.org/", source: "HPBOSE" },
  { id: "hp-12", section: "Board Results", board: "HPBOSE", category: "State Boards", resultName: "HPBOSE Class 12 Result", description: "Himachal Pradesh Class 12 result updates.", officialResultLink: "https://hpbose.org/", source: "HPBOSE" },
  { id: "jk-10", section: "Board Results", board: "JKBOSE", category: "State Boards", resultName: "JKBOSE Class 10 Result", description: "Jammu and Kashmir Class 10 result updates.", officialResultLink: "https://jkbose.nic.in/", source: "JKBOSE" },
  { id: "jk-12", section: "Board Results", board: "JKBOSE", category: "State Boards", resultName: "JKBOSE Class 12 Result", description: "Jammu and Kashmir Class 12 result updates.", officialResultLink: "https://jkbose.nic.in/", source: "JKBOSE" },
  { id: "goa-10", section: "Board Results", board: "Goa Board", category: "State Boards", resultName: "GBSHSE SSC Result", description: "Goa SSC result updates.", officialResultLink: "https://gbshse.in/", source: "GBSHSE" },
  { id: "goa-12", section: "Board Results", board: "Goa Board", category: "State Boards", resultName: "GBSHSE HSSC Result", description: "Goa HSSC result updates.", officialResultLink: "https://gbshse.in/", source: "GBSHSE" },
  { id: "delhi-open-10", section: "Board Results", board: "Delhi Open School", category: "Open Schooling", resultName: "NIOS/State Open School Secondary Results", description: "Open schooling result references for Delhi learners.", officialResultLink: "https://results.nios.ac.in/", source: "Open Schooling" },
  { id: "delhi-open-12", section: "Board Results", board: "Delhi Open School", category: "Open Schooling", resultName: "NIOS/State Open School Senior Secondary Results", description: "Open schooling senior secondary result references for Delhi learners.", officialResultLink: "https://results.nios.ac.in/", source: "Open Schooling" },
  { id: "tripura-10", section: "Board Results", board: "Tripura Board", category: "State Boards", resultName: "TBSE Madhyamik (Class 10) Result", description: "Tripura Class 10 result updates.", officialResultLink: "https://tbse.tripura.gov.in/", source: "TBSE" },
  { id: "tripura-12", section: "Board Results", board: "Tripura Board", category: "State Boards", resultName: "TBSE HS (Class 12) Result", description: "Tripura Class 12 result updates.", officialResultLink: "https://tbse.tripura.gov.in/", source: "TBSE" },
  { id: "meghalaya-10", section: "Board Results", board: "Meghalaya Board", category: "State Boards", resultName: "MBOSE SSLC Result", description: "Meghalaya SSLC result updates.", officialResultLink: "https://mbose.in/", source: "MBOSE" },
  { id: "meghalaya-12", section: "Board Results", board: "Meghalaya Board", category: "State Boards", resultName: "MBOSE HSSLC Result", description: "Meghalaya HSSLC result updates.", officialResultLink: "https://mbose.in/", source: "MBOSE" },
  { id: "manipur-10", section: "Board Results", board: "Manipur Board", category: "State Boards", resultName: "BOSEM HSLC Result", description: "Manipur HSLC result updates.", officialResultLink: "https://www.bosem.in/", source: "BOSEM" },
  { id: "manipur-12", section: "Board Results", board: "Manipur Board", category: "State Boards", resultName: "COHSEM HSE Result", description: "Manipur HSE result updates.", officialResultLink: "https://cohsem.nic.in/", source: "COHSEM" },
  { id: "mizoram-10", section: "Board Results", board: "Mizoram Board", category: "State Boards", resultName: "MBSE HSLC Result", description: "Mizoram HSLC result updates.", officialResultLink: "https://mbse.edu.in/", source: "MBSE" },
  { id: "mizoram-12", section: "Board Results", board: "Mizoram Board", category: "State Boards", resultName: "MBSE HSSLC Result", description: "Mizoram HSSLC result updates.", officialResultLink: "https://mbse.edu.in/", source: "MBSE" },
  { id: "nagaland-10", section: "Board Results", board: "Nagaland Board", category: "State Boards", resultName: "NBSE HSLC Result", description: "Nagaland HSLC result updates.", officialResultLink: "https://nbsenl.edu.in/", source: "NBSE" },
  { id: "nagaland-12", section: "Board Results", board: "Nagaland Board", category: "State Boards", resultName: "NBSE HSSLC Result", description: "Nagaland HSSLC result updates.", officialResultLink: "https://nbsenl.edu.in/", source: "NBSE" },
  { id: "arunachal-10", section: "Board Results", board: "Arunachal Pradesh", category: "State Boards", resultName: "APBSE Class 10 Result", description: "Arunachal Pradesh board result references.", officialResultLink: "https://results.gov.in/", source: "NIC Results" },
  { id: "arunachal-12", section: "Board Results", board: "Arunachal Pradesh", category: "State Boards", resultName: "APBSE Class 12 Result", description: "Arunachal Pradesh board result references.", officialResultLink: "https://results.gov.in/", source: "NIC Results" },
  { id: "sikkim-10", section: "Board Results", board: "Sikkim Board", category: "State Boards", resultName: "SBSE Class 10 Result", description: "Sikkim Class 10 result updates.", officialResultLink: "https://sikkimhrdd.org/", source: "SBSE" },
  { id: "sikkim-12", section: "Board Results", board: "Sikkim Board", category: "State Boards", resultName: "SBSE Class 12 Result", description: "Sikkim Class 12 result updates.", officialResultLink: "https://sikkimhrdd.org/", source: "SBSE" },
  { id: "delhi-cbse-10", section: "Board Results", board: "Delhi Region", category: "School Boards", resultName: "Delhi Region Class 10 (CBSE) Result", description: "Delhi region board result access through CBSE portal.", officialResultLink: "https://results.cbse.nic.in/", source: "CBSE" },
  { id: "delhi-cbse-12", section: "Board Results", board: "Delhi Region", category: "School Boards", resultName: "Delhi Region Class 12 (CBSE) Result", description: "Delhi region board result access through CBSE portal.", officialResultLink: "https://results.cbse.nic.in/", source: "CBSE" },
  { id: "chandigarh-10", section: "Board Results", board: "Chandigarh", category: "School Boards", resultName: "Chandigarh Class 10 Result", description: "Chandigarh board result references via central portals.", officialResultLink: "https://results.cbse.nic.in/", source: "CBSE/NIC" },
  { id: "chandigarh-12", section: "Board Results", board: "Chandigarh", category: "School Boards", resultName: "Chandigarh Class 12 Result", description: "Chandigarh board result references via central portals.", officialResultLink: "https://results.cbse.nic.in/", source: "CBSE/NIC" },
  { id: "andaman-10", section: "Board Results", board: "Andaman and Nicobar", category: "School Boards", resultName: "A&N Class 10 Result", description: "Andaman and Nicobar result references via central portals.", officialResultLink: "https://results.cbse.nic.in/", source: "CBSE/NIC" },
  { id: "andaman-12", section: "Board Results", board: "Andaman and Nicobar", category: "School Boards", resultName: "A&N Class 12 Result", description: "Andaman and Nicobar result references via central portals.", officialResultLink: "https://results.cbse.nic.in/", source: "CBSE/NIC" },
  { id: "lakshadweep-10", section: "Board Results", board: "Lakshadweep", category: "School Boards", resultName: "Lakshadweep Class 10 Result", description: "Lakshadweep board result references via central portals.", officialResultLink: "https://results.cbse.nic.in/", source: "CBSE/NIC" },
  { id: "lakshadweep-12", section: "Board Results", board: "Lakshadweep", category: "School Boards", resultName: "Lakshadweep Class 12 Result", description: "Lakshadweep board result references via central portals.", officialResultLink: "https://results.cbse.nic.in/", source: "CBSE/NIC" },
  { id: "puducherry-10", section: "Board Results", board: "Puducherry", category: "School Boards", resultName: "Puducherry Class 10 Result", description: "Puducherry board result references.", officialResultLink: "https://results.gov.in/", source: "NIC Results" },
  { id: "puducherry-12", section: "Board Results", board: "Puducherry", category: "School Boards", resultName: "Puducherry Class 12 Result", description: "Puducherry board result references.", officialResultLink: "https://results.gov.in/", source: "NIC Results" },
];

const examResultPortalBySlug: Record<string, string> = {
  "upsc-cse": "https://www.upsc.gov.in/examinations/active-examinations",
  "jee-main": "https://jeemain.nta.nic.in/",
  "neet-ug": "https://neet.nta.nic.in/",
  "cat": "https://iimcat.ac.in/",
  "gate": "https://gate2026.iitr.ac.in/",
  "cuet-ug": "https://cuet.nta.nic.in/",
  "clat": "https://consortiumofnlus.ac.in/clat-2026/",
  nda: "https://www.upsc.gov.in/examinations",
  "ssc-cgl": "https://ssc.gov.in/",
  "ibps-po": "https://www.ibps.in/",
  "ugc-net": "https://ugcnet.nta.ac.in/",
  "cuet-pg": "https://pgcuet.samarth.ac.in/",
  xat: "https://xatonline.in/",
  cmat: "https://cmat.nta.nic.in/",
};

async function getCompetitiveExamResults(): Promise<ResultItem[]> {
  const response = await getAllExams(1, 500);
  const exams = Array.isArray(response?.data) ? response.data : [];

  return exams
    .filter((exam: any) => exam?.slug && exam?.name)
    .map((exam: any) => ({
      id: `exam-result-${exam.slug}`,
      section: "Competitive Exams",
      board: exam.conductingBody || "Exam Authority",
      category: exam.category || "Competitive Exams",
      resultName: `${exam.name} Result`,
      description: `Official portal and updates for ${exam.name} scorecards, result notices, and counselling timelines.`,
      officialResultLink: examResultPortalBySlug[exam.slug] || `/exam/${exam.slug}`,
      source: exam.conductingBody || "Official Authority",
      isActive: true,
    }));
}

export const additionalCompetitiveExamResults: ResultItem[] = [
  { id: "exam-rrb-ntpc", section: "Competitive Exams", board: "Railway Recruitment Boards", category: "Government Jobs", resultName: "RRB NTPC Result", description: "Official result portal for RRB NTPC stages and scorecards.", officialResultLink: "https://www.rrbcdg.gov.in/", source: "RRB" },
  { id: "exam-rrb-group-d", section: "Competitive Exams", board: "Railway Recruitment Boards", category: "Government Jobs", resultName: "RRB Group D Result", description: "Official result portal for RRB Group D recruitment.", officialResultLink: "https://www.rrbcdg.gov.in/", source: "RRB" },
  { id: "exam-ssc-chsl", section: "Competitive Exams", board: "Staff Selection Commission", category: "Government Jobs", resultName: "SSC CHSL Result", description: "Official result updates for SSC CHSL tiers.", officialResultLink: "https://ssc.gov.in/", source: "SSC" },
  { id: "exam-ssc-mts", section: "Competitive Exams", board: "Staff Selection Commission", category: "Government Jobs", resultName: "SSC MTS Result", description: "Official SSC MTS result and merit list updates.", officialResultLink: "https://ssc.gov.in/", source: "SSC" },
  { id: "exam-ssc-gd", section: "Competitive Exams", board: "Staff Selection Commission", category: "Government Jobs", resultName: "SSC GD Constable Result", description: "Official SSC GD result and cutoff updates.", officialResultLink: "https://ssc.gov.in/", source: "SSC" },
  { id: "exam-sbi-po", section: "Competitive Exams", board: "State Bank of India", category: "Banking", resultName: "SBI PO Result", description: "Official SBI PO prelims/mains/final result updates.", officialResultLink: "https://sbi.co.in/web/careers", source: "SBI" },
  { id: "exam-sbi-clerk", section: "Competitive Exams", board: "State Bank of India", category: "Banking", resultName: "SBI Clerk Result", description: "Official SBI Junior Associate result updates.", officialResultLink: "https://sbi.co.in/web/careers", source: "SBI" },
  { id: "exam-rbi-grade-b", section: "Competitive Exams", board: "Reserve Bank of India", category: "Banking", resultName: "RBI Grade B Result", description: "Official RBI Grade B result updates.", officialResultLink: "https://www.rbi.org.in/", source: "RBI" },
  { id: "exam-rbi-assistant", section: "Competitive Exams", board: "Reserve Bank of India", category: "Banking", resultName: "RBI Assistant Result", description: "Official RBI Assistant result updates.", officialResultLink: "https://www.rbi.org.in/", source: "RBI" },
  { id: "exam-epfo-ssa", section: "Competitive Exams", board: "EPFO", category: "Government Jobs", resultName: "EPFO SSA Result", description: "Official EPFO SSA result updates.", officialResultLink: "https://www.epfindia.gov.in/", source: "EPFO" },
  { id: "exam-nda-na", section: "Competitive Exams", board: "UPSC", category: "Defence", resultName: "NDA/NA Result", description: "Official NDA and NA written result updates.", officialResultLink: "https://www.upsc.gov.in/examinations", source: "UPSC" },
  { id: "exam-cds", section: "Competitive Exams", board: "UPSC", category: "Defence", resultName: "CDS Result", description: "Official Combined Defence Services result updates.", officialResultLink: "https://www.upsc.gov.in/examinations", source: "UPSC" },
  { id: "exam-afcat", section: "Competitive Exams", board: "Indian Air Force", category: "Defence", resultName: "AFCAT Result", description: "Official AFCAT result updates and candidate login.", officialResultLink: "https://afcat.cdac.in/", source: "Indian Air Force" },
  { id: "exam-capf", section: "Competitive Exams", board: "UPSC", category: "Defence", resultName: "CAPF (AC) Result", description: "Official UPSC CAPF Assistant Commandant result updates.", officialResultLink: "https://www.upsc.gov.in/examinations", source: "UPSC" },
  { id: "exam-ctet", section: "Competitive Exams", board: "CBSE", category: "Teaching", resultName: "CTET Result", description: "Official CTET result and scorecard portal.", officialResultLink: "https://ctet.nic.in/", source: "CBSE" },
  { id: "exam-reet", section: "Competitive Exams", board: "RBSE", category: "Teaching", resultName: "REET Result", description: "Official REET result updates for Rajasthan teacher eligibility.", officialResultLink: "https://rajeduboard.rajasthan.gov.in/", source: "RBSE" },
  { id: "exam-uptet", section: "Competitive Exams", board: "UPBEB", category: "Teaching", resultName: "UPTET Result", description: "Official Uttar Pradesh teacher eligibility test result updates.", officialResultLink: "https://updeled.gov.in/", source: "UPBEB" },
  { id: "exam-kvs", section: "Competitive Exams", board: "Kendriya Vidyalaya Sangathan", category: "Teaching", resultName: "KVS Recruitment Result", description: "Official KVS recruitment exam result updates.", officialResultLink: "https://kvsangathan.nic.in/", source: "KVS" },
  { id: "exam-nvs", section: "Competitive Exams", board: "Navodaya Vidyalaya Samiti", category: "School Entrance", resultName: "Navodaya Selection Test Result", description: "Official Jawahar Navodaya Vidyalaya selection test result portal.", officialResultLink: "https://navodaya.gov.in/", source: "NVS" },
  { id: "exam-jam", section: "Competitive Exams", board: "IITs", category: "Engineering", resultName: "IIT JAM Result", description: "Official IIT JAM result updates and scorecards.", officialResultLink: "https://jam.iitm.ac.in/", source: "IIT JAM" },
  { id: "exam-ceed", section: "Competitive Exams", board: "IIT Bombay", category: "Design", resultName: "CEED Result", description: "Official CEED result updates for design admissions.", officialResultLink: "https://www.ceed.iitb.ac.in/", source: "IIT Bombay" },
  { id: "exam-uceed", section: "Competitive Exams", board: "IIT Bombay", category: "Design", resultName: "UCEED Result", description: "Official UCEED result updates for design admissions.", officialResultLink: "https://www.uceed.iitb.ac.in/", source: "IIT Bombay" },
  { id: "exam-nift", section: "Competitive Exams", board: "NTA/NIFT", category: "Design", resultName: "NIFT Entrance Result", description: "Official NIFT entrance result updates.", officialResultLink: "https://exams.nta.ac.in/NIFT/", source: "NTA/NIFT" },
  { id: "exam-nid-dat", section: "Competitive Exams", board: "NID", category: "Design", resultName: "NID DAT Result", description: "Official NID DAT prelims/mains result updates.", officialResultLink: "https://admissions.nid.edu/", source: "NID" },
  { id: "exam-aiims-norcet", section: "Competitive Exams", board: "AIIMS", category: "Medical", resultName: "AIIMS NORCET Result", description: "Official AIIMS nursing recruitment result updates.", officialResultLink: "https://www.aiimsexams.ac.in/", source: "AIIMS" },
  { id: "exam-ugc-csir-net", section: "Competitive Exams", board: "NTA", category: "Teaching", resultName: "CSIR UGC NET Result", description: "Official CSIR UGC NET result updates.", officialResultLink: "https://csirnet.nta.ac.in/", source: "NTA" },
];

export const globalResults: ResultItem[] = [
  { id: "global-sat", section: "Global Results", board: "College Board", category: "International Entrance", resultName: "SAT Result", description: "Official SAT score release and reporting portal.", officialResultLink: "https://studentscores.collegeboard.org/", source: "College Board" },
  { id: "global-act", section: "Global Results", board: "ACT", category: "International Entrance", resultName: "ACT Result", description: "Official ACT score portal for test takers.", officialResultLink: "https://www.act.org/", source: "ACT" },
  { id: "global-toefl", section: "Global Results", board: "ETS", category: "English Proficiency", resultName: "TOEFL iBT Result", description: "Official TOEFL score reporting portal.", officialResultLink: "https://www.ets.org/toefl/test-takers/ibt/scores/", source: "ETS" },
  { id: "global-ielts", section: "Global Results", board: "IELTS", category: "English Proficiency", resultName: "IELTS Result", description: "Official IELTS result and TRF access portal.", officialResultLink: "https://ielts.idp.com/results/check-your-result", source: "IELTS" },
  { id: "global-pte", section: "Global Results", board: "Pearson", category: "English Proficiency", resultName: "PTE Academic Result", description: "Official PTE score reporting portal.", officialResultLink: "https://www.pearsonpte.com/", source: "Pearson" },
  { id: "global-gre", section: "Global Results", board: "ETS", category: "International Entrance", resultName: "GRE Result", description: "Official GRE score release portal.", officialResultLink: "https://www.ets.org/gre/test-takers/general-test/scores/", source: "ETS" },
  { id: "global-gmat", section: "Global Results", board: "GMAC", category: "International Entrance", resultName: "GMAT Focus Result", description: "Official GMAT score reporting and sending portal.", officialResultLink: "https://www.mba.com/", source: "GMAC" },
  { id: "global-ap", section: "Global Results", board: "College Board", category: "Global School Boards", resultName: "AP Exam Score", description: "Official AP score release portal.", officialResultLink: "https://apstudents.collegeboard.org/view-scores", source: "College Board" },
  { id: "global-ibdp", section: "Global Results", board: "International Baccalaureate", category: "Global School Boards", resultName: "IB Diploma Programme Result", description: "Official IB candidate results access page.", officialResultLink: "https://www.ibo.org/programmes/diploma-programme/assessment-and-exams/getting-results/", source: "IBO" },
  { id: "global-cambridge-igcse", section: "Global Results", board: "Cambridge", category: "Global School Boards", resultName: "Cambridge IGCSE Result", description: "Official Cambridge exam results info and access.", officialResultLink: "https://www.cambridgeinternational.org/exam-administration/results/", source: "Cambridge" },
  { id: "global-cambridge-alevel", section: "Global Results", board: "Cambridge", category: "Global School Boards", resultName: "Cambridge A Level Result", description: "Official Cambridge A Level result portal.", officialResultLink: "https://www.cambridgeinternational.org/exam-administration/results/", source: "Cambridge" },
  { id: "global-edexcel", section: "Global Results", board: "Pearson Edexcel", category: "Global School Boards", resultName: "Edexcel IAL/IGCSE Result", description: "Official Pearson Edexcel results portal.", officialResultLink: "https://qualifications.pearson.com/", source: "Pearson Edexcel" },
  { id: "global-mcat", section: "Global Results", board: "AAMC", category: "International Entrance", resultName: "MCAT Result", description: "Official MCAT score reporting portal.", officialResultLink: "https://students-residents.aamc.org/taking-mcat-exam/get-your-test-scores", source: "AAMC" },
  { id: "global-usmle-step1", section: "Global Results", board: "USMLE", category: "Medical Licensure", resultName: "USMLE Step 1 Result", description: "Official USMLE score reporting information.", officialResultLink: "https://www.usmle.org/", source: "USMLE" },
  { id: "global-usmle-step2", section: "Global Results", board: "USMLE", category: "Medical Licensure", resultName: "USMLE Step 2 CK Result", description: "Official USMLE Step 2 CK score reporting information.", officialResultLink: "https://www.usmle.org/", source: "USMLE" },
  { id: "global-plab", section: "Global Results", board: "GMC UK", category: "Medical Licensure", resultName: "PLAB Result", description: "Official UK PLAB result information by GMC.", officialResultLink: "https://www.gmc-uk.org/registration-and-licensing/join-the-register/plab", source: "GMC UK" },
  { id: "global-cfa", section: "Global Results", board: "CFA Institute", category: "Professional Certification", resultName: "CFA Exam Result", description: "Official CFA result and candidate resources portal.", officialResultLink: "https://www.cfainstitute.org/", source: "CFA Institute" },
  { id: "global-acca", section: "Global Results", board: "ACCA", category: "Professional Certification", resultName: "ACCA Exam Result", description: "Official ACCA exam status and result portal.", officialResultLink: "https://www.accaglobal.com/", source: "ACCA" },
];

export async function getResultLinks(): Promise<ResultItem[]> {
  const competitiveExamResults = await getCompetitiveExamResults();

  return [...boardResults, ...competitiveExamResults, ...additionalCompetitiveExamResults, ...globalResults].filter((item) => item.isActive !== false);
}

export async function getBoardResults(): Promise<ResultItem[]> {
  return boardResults.filter((item) => item.isActive !== false);
}
