import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, Clock, MapPin, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export interface Tryout {
  id: string;
  club_name: string;
  club_logo_url: string | null;
  tryout_date: string;
  tryout_time: string | null;
  categories: string[];
  positions: string[];
  address: string;
  city: string;
  state: string;
  latitude: number | null;
  longitude: number | null;
  requirements: string | null;
}

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join("")
    .toUpperCase();

export const TryoutCard = ({ tryout }: { tryout: Tryout }) => {
  const date = new Date(`${tryout.tryout_date}T00:00:00`);
  const dateLabel = format(date, "dd 'de' MMM", { locale: ptBR });
  const weekday = format(date, "EEE", { locale: ptBR });

  const mapsQuery = encodeURIComponent(
    tryout.latitude && tryout.longitude
      ? `${tryout.latitude},${tryout.longitude}`
      : `${tryout.address}, ${tryout.city}, ${tryout.state}`
  );
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  return (
    <Card className="card-elevated group relative overflow-hidden border-border/60 transition-all hover:border-primary/50 hover:shadow-[0_0_40px_-8px_hsl(var(--primary)/0.4)]">
      {/* Date ribbon */}
      <div className="absolute right-4 top-4 flex flex-col items-center rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 backdrop-blur">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
          {weekday}
        </span>
        <span className="text-sm font-bold leading-none text-foreground">
          {dateLabel}
        </span>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          {tryout.club_logo_url ? (
            <img
              src={tryout.club_logo_url}
              alt={tryout.club_name}
              className="h-12 w-12 rounded-lg object-cover"
              loading="lazy"
              width={48}
              height={48}
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-secondary/30 to-primary/20 font-display text-base font-bold text-foreground ring-1 ring-border">
              {initials(tryout.club_name)}
            </div>
          )}
          <div className="min-w-0 pr-16">
            <h3 className="truncate font-display text-lg font-bold leading-tight">
              {tryout.club_name}
            </h3>
            <p className="truncate text-xs text-muted-foreground">{tryout.city} · {tryout.state}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pb-4">
        <div className="flex flex-wrap gap-1.5">
          {tryout.categories.map((c) => (
            <Badge key={c} variant="secondary" className="bg-secondary/15 text-secondary hover:bg-secondary/25">
              {c}
            </Badge>
          ))}
        </div>

        {tryout.positions.length > 0 && (
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
            <span className="leading-relaxed">{tryout.positions.join(" · ")}</span>
          </div>
        )}

        {tryout.tryout_time && (
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span>{tryout.tryout_time.slice(0, 5)}</span>
          </div>
        )}

        <div className="flex items-start gap-2 text-sm">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span className="text-muted-foreground">{tryout.address}</span>
        </div>

        {tryout.requirements && (
          <p className="border-l-2 border-primary/40 pl-3 text-xs italic text-muted-foreground">
            {tryout.requirements}
          </p>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <Button asChild variant="outline" className="w-full border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground">
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
            <MapPin className="mr-2 h-4 w-4" />
            Ver no Mapa
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
