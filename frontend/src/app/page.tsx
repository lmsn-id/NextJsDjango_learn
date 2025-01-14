import HomePage from "./Home/page";
import Layanan from "./Home/View/Layanan";
import Informasi from "./Home/View/Informasi";
import Gallary from "./Home/View/Gallary";
import ChatBoot from "@/Components/ChatBoot";

export const metadata = {
  title: "SMKN 5 || Home",
  description: "SMKN 5 Kabupaten Tangerang",
};
export default function Home() {
  return (
    <>
      <div className="">
        <HomePage />
        <Layanan />
        <Informasi />
        <Gallary />

        <ChatBoot />
      </div>
    </>
  );
}
