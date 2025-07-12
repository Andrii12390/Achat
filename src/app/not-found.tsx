import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { PRIVATE_ROUTES } from '@/constants';

function NotFoundPage() {
  return (
    <div className="bg-secondary/30 flex h-dvh justify-center pt-[25dvh]">
      <section className="relative space-y-8">
        <div className="text-muted-foreground/50 animate-pulse text-9xl font-bold select-none sm:text-[10rem] md:text-[12rem] lg:text-[14rem] xl:text-[16rem]">
          404
        </div>
        <div className="bg-primary absolute inset-0 animate-bounce bg-clip-text text-9xl font-bold text-transparent sm:text-[10rem] md:text-[12rem] lg:text-[14rem] xl:text-[16rem]">
          404
        </div>

        <Link
          className="group hover:border-foreground mx-auto flex w-fit items-center gap-2 border-b border-transparent text-xl"
          href={PRIVATE_ROUTES.CHATS}
        >
          <span>Go home</span>
          <ArrowRight
            size={20}
            strokeWidth={1.7}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </section>
    </div>
  );
}

export default NotFoundPage;
