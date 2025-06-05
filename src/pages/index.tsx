import Flashcard from "@/components/Flashcard";
import KanjiFilter from "@/components/KanjiFilter";
import { KanjiHistoryProvider } from "@/contexts/KanjiHistoryProvider";

export default function Home() {
  return (
    <div
      className={`px-[16px] py-[32px] lg:p-[32px] bg-[#F6F0F0] w-screen h-screen overflow-x-hidden`}
    >
      <main className="flex flex-col gap-[32px] items-center justify-start lg:justify-center w-full h-full">
        <div className="md:left-[10dvw] lg:left-[28dvw] w-full md:w-[540px]">
          <KanjiFilter />
        </div>

        <section className="relative w-full lg:w-[540px] lg:h-[236px] mt-0">
          <KanjiHistoryProvider>
            <Flashcard />
          </KanjiHistoryProvider>
        </section>
      </main>

      <footer className="flex justify-center items-center bg-[#F6F0F0] text-[#504B38] text-sm">
        Crafted by Abiyyu Rohman | #100ProjectsForJapan
        {/* <span>
          <Link href={"https://github.com/axahito"}>GitHub</Link> |{" "}
          <Link href={"https://www.linkedin.com/in/abiyyu-rohman-227982181/"}>
            LinkedIn
          </Link>
        </span> */}
      </footer>

      {/* element to hide tour highlight */}
      <div className="welcome end w-0 h-0 hidden" />
    </div>
  );
}
