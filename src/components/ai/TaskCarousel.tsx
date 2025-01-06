import { FileEdit, Target, Rocket, MessagesSquare } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { TaskCard } from "./TaskCard";

const TASKS = [
  {
    icon: FileEdit,
    title: "Create PRD",
    description: "Get help writing requirements",
  },
  {
    icon: Target,
    title: "Validate Work",
    description: "Review deliverables",
  },
  {
    icon: Rocket,
    title: "Plan Features",
    description: "Brainstorm and prioritize",
  },
  {
    icon: MessagesSquare,
    title: "Get Feedback",
    description: "Improve decisions",
  },
];

export const TaskCarousel = () => {
  const autoplayOptions = {
    delay: 3000,
    rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement,
  };

  return (
    <div className="w-40">
      <Carousel
        opts={{
          align: "start",
          loop: true,
          axis: "y"
        }}
        plugins={[
          Autoplay(autoplayOptions)
        ]}
        className="w-full"
      >
        <CarouselContent className="-mt-1 h-[180px]">
          {TASKS.map((task, index) => (
            <CarouselItem key={index} className="pt-1 basis-full">
              <TaskCard {...task} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};