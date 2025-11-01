import Link from 'next/link';
import Image from 'next/image';
import { Logo } from '@/components/site/logo';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';

const airlines = [
  { name: 'Air France', slug: 'air-france' },
  { name: 'KLM', slug: 'klm' },
  { name: 'Delta Air Lines', slug: 'delta' },
  { name: 'Aeroflot', slug: 'aeroflot' },
  { name: 'China Eastern', slug: 'china-eastern' },
  { name: 'China Southern', slug: 'china-southern' },
  { name: 'Czech Airlines', slug: 'czech-airlines' },
  { name: 'Korean Air', slug: 'korean-air' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-xl bg-background/80 h-[72px] min-h-[72px]">
      <div className="mx-auto max-w-6xl px-4 h-full min-h-[72px] flex items-center justify-between">
        <Logo />
        
        <div className="flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href={"/flights" as any} className="h-9 px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                    Flights
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className='bg-transparent'>Airlines</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-2 gap-2 p-4 w-[600px]">
                    {airlines.map((airline) => (
                      <Link
                        key={airline.slug}
                        href={`/airlines/${airline.slug}` as any}
                        className="group relative flex items-center gap-3 p-3 rounded-md hover:bg-accent transition-colors overflow-hidden"
                      >
                        {/* Faded graphic background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        
                        {/* Logo placeholder */}
                        <div className="relative w-10 h-10 bg-muted rounded flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                          {/* Logo will be placed here */}
                          <div className="w-8 h-8 border border-border/50 rounded" />
                        </div>
                        
                        <span className="relative text-sm font-medium">{airline.name}</span>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href={"/blog" as any} className="h-9 px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                    Blog
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Button asChild className="gap-2">
            <Link href={"/signin" as any}>
              <Image
                src="/ROBLOX.svg"
                alt="ROBLOX"
                width={16}
                height={16}
                className="w-4 h-4 brightness-0"
              />
              <span className="sm:hidden">Sign in</span>
              <span className="hidden sm:inline">Sign in with ROBLOX</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}


