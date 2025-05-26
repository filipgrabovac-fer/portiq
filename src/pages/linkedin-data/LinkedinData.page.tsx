import { useGetLinkedinData } from "./hooks/useGetLinkedinData.hook";

export const LinkedinData = () => {
  const { data: linkedinData } = useGetLinkedinData();
  console.log(linkedinData);
  
  return <div>LinkedinData</div>;
};
