import Flashcard from "@/components/Flashcard";
import KanjiFilter from "@/components/KanjiFilter";

export default function Home() {
  return (
    <div className={`p-[32px] bg-[#F6F0F0] w-screen h-screen`}>
      <main className="flex flex-col gap-[32px] items-center justify-center h-full relative">
        <div className="absolute bottom-[64dvh] left-[34dvw] w-full">
          <KanjiFilter />
        </div>

        <section className="relative">
          <Flashcard />

          {/* background card */}
          <div className="w-[540px] h-[236px] bg-[#F2E2B1] flex flex-col items-center justify-center p-[32px] gap-[32px] rounded-md absolute z-0 top-[10px] right-[10px]"></div>
        </section>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
