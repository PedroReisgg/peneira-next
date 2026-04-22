import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Search, Loader2, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";
import { TryoutCard, type Tryout } from "@/components/TryoutCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

const CITY_FILTERS = [
  { label: "Todas", value: "all" },
  { label: "São Paulo", value: "São Paulo" },
  { label: "Santo André", value: "Santo André" },
  { label: "S. B. do Campo", value: "São Bernardo do Campo" },
  { label: "Osasco", value: "Osasco" },
  { label: "Campinas", value: "Campinas" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const [tryouts, setTryouts] = useState<Tryout[]>([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth", { replace: true });
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("tryouts")
        .select("*")
        .order("tryout_date", { ascending: true });
      if (!error && data) setTryouts(data as Tryout[]);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tryouts.filter((t) => {
      if (city !== "all" && t.city !== city) return false;
      if (!q) return true;
      return (
        t.club_name.toLowerCase().includes(q) ||
        t.positions.some((p) => p.toLowerCase().includes(q)) ||
        t.categories.some((c) => c.toLowerCase().includes(q))
      );
    });
  }, [tryouts, city, query]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/", { replace: true });
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between py-4">
          <Logo />
          <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-muted-foreground">
            <LogOut className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Sair</span>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="container pb-6 pt-10 sm:pt-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <MapPin className="h-3 w-3" />
          São Paulo · SP
        </div>
        <h1 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-5xl">
          Peneiras em <span className="text-gradient-primary">São Paulo</span>
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
          {filtered.length} {filtered.length === 1 ? "peneira aberta" : "peneiras abertas"} agora.
          Escolha sua cidade, encontre seu clube.
        </p>
      </section>

      {/* Filters */}
      <section className="container space-y-4 pb-8">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por clube ou posição (ex: goleiro, Palmeiras)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-12 pl-11 text-base"
          />
        </div>

        <Tabs value={city} onValueChange={setCity} className="w-full">
          <TabsList className="h-auto w-full justify-start gap-1 overflow-x-auto bg-muted/40 p-1">
            {CITY_FILTERS.map((c) => (
              <TabsTrigger
                key={c.value}
                value={c.value}
                className="shrink-0 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {c.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </section>

      {/* List */}
      <section className="container pb-24">
        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-72 rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/60 bg-muted/20 py-16 text-center">
            <p className="font-display text-lg font-semibold">Nenhuma peneira encontrada</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Tente ajustar os filtros ou a busca.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t) => (
              <TryoutCard key={t.id} tryout={t} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
