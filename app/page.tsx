import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import Why from "@/components/Why";
import Install from "@/components/Install";
import ShapeGallery from "@/components/ShapeGallery";
import Composing from "@/components/Composing";
import ApiReference from "@/components/ApiReference";
import Lifecycle from "@/components/Lifecycle";
import Roadmap from "@/components/Roadmap";

export default function Home() {
  return (
    <>
      <Sidebar />
        <main className="md:ml-64">
        <Hero />
        <Why />
        <Install/>
        <ShapeGallery />
        <Composing />
        <ApiReference />
        <Lifecycle />
        <Roadmap />
      </main>
    </>
  );
}