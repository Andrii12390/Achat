import { PRIVATE_ROUTES } from '@/constants';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

function NotFoundPage() {
  return (
    <div className="h-dvh flex justify-center pt-[25dvh] bg-secondary/30">
      <section className="relative space-y-8">
        <div className="text-9xl sm:text-[10rem] md:text-[12rem] lg:text-[14rem] xl:text-[16rem] font-bold text-muted-foreground/50 select-none animate-pulse">
          404
        </div>
        <div className="absolute inset-0 text-9xl sm:text-[10rem] md:text-[12rem] lg:text-[14rem] xl:text-[16rem] font-bold bg-primary bg-clip-text text-transparent animate-bounce">
          404
        </div>

        <Link
          className="w-fit mx-auto text-xl group flex gap-2 items-center border-b border-transparent hover:border-foreground"
          href={PRIVATE_ROUTES.CHATS}
        >
          <span>Go home</span>
          <ArrowRight
            size={20}
            strokeWidth={1.7}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </Link>
      </section>
    </div>
  );
}

export default NotFoundPage;
