export default function MilestoneText({ percentage }) {
  const milestoneMessages = {
    0: "You haven't completed any notes yet. Let's get started! 🚦",
    10: "Good job, you've started! The first step is the hardest step! 🥳",
    25: "Great job, you're a quarter of the way there! 🎉",
    50: "Awesome job, you're halfway there! 🎉",
    75: "Fantastic job, you're so close! I'm rooting for you! 🎉",
    100: "Woohoo, I knew you could do it! Pat yourself on the back! 🥳 🎉",
  };
  const closestMilestone = Object.keys(milestoneMessages)
    .map(Number)
    .reverse()
    .find((milestone) => percentage >= milestone);
  return <h4>{milestoneMessages[closestMilestone]}</h4>;
}
