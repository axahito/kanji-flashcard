import Flashcard from "@/components/Flashcard";
import KanjiFilter from "@/components/KanjiFilter";

export default function Home() {
  return (
    <div
      className={`px-[16px] py-[32px] lg:p-[32px] bg-[#F6F0F0] w-screen h-screen`}
    >
      <main className="flex flex-col gap-[32px] items-center justify-start lg:justify-center w-full h-full">
        <div className="md:left-[10dvw] lg:left-[28dvw] w-full md:w-[540px]">
          <KanjiFilter />
        </div>

        <section className="relative w-full lg:w-[540px] lg:h-[236px] mt-0">
          <Flashcard />
        </section>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
