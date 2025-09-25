import * as React from "react";
import useEmblaCarousel, { type EmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

type CarouselContextValue = {
    api: EmblaCarouselType | undefined;
};

const CarouselContext = React.createContext<CarouselContextValue>({ api: undefined });

type CarouselProps = React.PropsWithChildren<{
    className?: string;
    orientation?: "horizontal" | "vertical";
    opts?: Parameters<typeof useEmblaCarousel>[0];
    plugins?: ReturnType<typeof Autoplay>[];
    setApi?: (api: EmblaCarouselType) => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    viewportClassName?: string;
}>;

export function Carousel({
    className,
    children,
    orientation = "horizontal",
    opts,
    plugins,
    setApi,
    onMouseEnter,
    onMouseLeave,
    viewportClassName,
}: CarouselProps) {
    const [emblaRef, api] = useEmblaCarousel(
        {
            axis: orientation === "horizontal" ? "x" : "y",
            ...opts,
        },
        plugins,
    );

    React.useEffect(() => {
        if (api && setApi) setApi(api);
    }, [api, setApi]);

    return (
        <div className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div ref={emblaRef} className={`overflow-hidden ${viewportClassName ?? ""}`}>
                <CarouselContext.Provider value={{ api }}>{children}</CarouselContext.Provider>
            </div>
        </div>
    );
}

type CarouselContentProps = React.PropsWithChildren<{
    className?: string;
}>;

export function CarouselContent({ className, children }: CarouselContentProps) {
    return <div className={`flex ${className ?? ""}`}>{children}</div>;
}

type CarouselItemProps = React.PropsWithChildren<{
    className?: string;
}>;

export function CarouselItem({ className, children }: CarouselItemProps) {
    return (
        <div className={`min-w-0 shrink-0 grow-0 basis-full ${className ?? ""}`}>
            {children}
        </div>
    );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string };

export function CarouselPrevious(props: ButtonProps) {
    const { api } = React.useContext(CarouselContext);
    return (
        <button
            type="button"
            aria-label="Previous slide"
            onClick={() => api?.scrollPrev()}
            {...props}
        >
            Prev
        </button>
    );
}

export function CarouselNext(props: ButtonProps) {
    const { api } = React.useContext(CarouselContext);
    return (
        <button
            type="button"
            aria-label="Next slide"
            onClick={() => api?.scrollNext()}
            {...props}
        >
            Next
        </button>
    );
}

export type { EmblaCarouselType as CarouselApi };


