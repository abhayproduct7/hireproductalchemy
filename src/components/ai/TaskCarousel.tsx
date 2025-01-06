import { LineChart, BarChart2, FlaskConical, MessagesSquare } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { TaskCard } from "./TaskCard";

const TASKS = [
  {
    icon: FlaskConical,
    title: "A/B Testing",
    description: "Test & validate hypotheses",
    color: "#1EAEDB", // Bright Blue
  },
  {
    icon: BarChart2,
    title: "Data Analytics",
    description: "Analyze user behavior",
    color: "#0EA5E9", // Ocean Blue
  },
  {
    icon: LineChart,
    title: "Market Research",
    description: "Identify opportunities",
    color: "#33C3F0", // Sky Blue
  },
  {
    icon: MessagesSquare,
    title: "Get Feedback",
    description: "Improve decisions",
    color: "#0FA0CE", // Bright Blue alternative
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
          axis: "y",
          slidesToScroll: 1,
        }}
        plugins={[Autoplay(autoplayOptions)]}
        className="h-[52px] overflow-hidden"
      >
        <CarouselContent className="-mt-1">
          {TASKS.map((task, index) => (
            <CarouselItem key={index} className="pt-1">
              <TaskCard {...task} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};