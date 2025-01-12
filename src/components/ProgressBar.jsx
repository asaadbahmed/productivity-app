import { Progress } from "@/components/ui/progress";
const ProgressBar = ({ percentage, animate }) => (
  <Progress
    value={percentage}
    animate={animate}
  />
);
export default ProgressBar;
