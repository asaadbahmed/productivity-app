import HeartIcon from "@/assets/HeartIcon";

const BuiltWithLove = () => (
  <p
    style={{
      fontWeight: "bold",
      fontSize: "0.8rem",
      paddingBottom: "10px",
    }}
  >
    Built with love{" "}
    <HeartIcon styleProps={{ display: "inline", verticalAlign: "middle" }} />
  </p>
);
export default BuiltWithLove;
