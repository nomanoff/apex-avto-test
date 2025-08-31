import { shuffle } from "./shuffle";

export function sampleExamQuestions(all, count = 20) {
  return shuffle(all)
    .slice(0, count)
    .map((q) => ({ ...q, _choicesOrder: shuffle(q.choices) }));
}

export function sliceTicket(all, ticketNo, perTicket = 10) {
  const start = (ticketNo - 1) * perTicket;
  return all
    .slice(start, start + perTicket)
    .map((q) => ({ ...q, _choicesOrder: shuffle(q.choices) }));
}

export const PASS_MISTAKES = 2;
export const EXAM_SECONDS = 25 * 60;
