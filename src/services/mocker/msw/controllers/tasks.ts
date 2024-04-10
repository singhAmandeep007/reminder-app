import { HttpResponse, http } from "msw";

const tasks = [
  {
    id: "1001",
    category: "important",
    title: "task 1",
    summary: "hey do this task please 1",
  },
  {
    id: "1002",
    category: "low",
    title: "task 2",
    summary: "do it after a week",
  },
];

export const getTasks = http.get("/tasks", ({ request }) => {
  // Note that you DON'T have to stringify the JSON!
  return HttpResponse.json({ tasks }, { status: 200 });
});
