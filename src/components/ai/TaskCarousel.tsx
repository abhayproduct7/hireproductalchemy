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
          align: "center",
          loop: true,
          axis: "y",
          slidesToScroll: 1,
          containScroll: "trimSnaps",
        }}
        plugins={[Autoplay(autoplayOptions)]}
        className="h-[160px]"
      >
        <CarouselContent className="-mt-2 flex flex-col">
          {TASKS.map((task, index) => (
            <CarouselItem key={index} className="basis-1/4 min-h-[40px] pt-2">
              <TaskCard {...task} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};