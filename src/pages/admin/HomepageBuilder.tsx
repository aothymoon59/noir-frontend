import { useState, type ElementType } from "react";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical, Eye, EyeOff, Trash2, Save, GalleryHorizontalEnd,
  PanelsTopLeft, LayoutGrid, ImageIcon, Video, MessageSquareQuote,
  Newspaper, Mail, Flame, Sparkles,
} from "lucide-react";
import { defaultHomeSections, type HomeSection, type SectionType } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BLOCKS: { type: SectionType; label: string; icon: ElementType }[] = [
  { type: "hero-slider", label: "Hero Slider", icon: GalleryHorizontalEnd },
  { type: "category-slider", label: "Category Slider", icon: PanelsTopLeft },
  { type: "featured-products", label: "Product Grid", icon: LayoutGrid },
  { type: "trending-products", label: "Trending", icon: Flame },
  { type: "new-arrivals", label: "New Arrivals", icon: Sparkles },
  { type: "promo-banner", label: "Banner", icon: ImageIcon },
  { type: "video-banner", label: "Video Banner", icon: Video },
  { type: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { type: "blog-section", label: "Blog Section", icon: Newspaper },
  { type: "newsletter", label: "Newsletter", icon: Mail },
];

function SortableRow({ s, onToggle, onRemove }: { s: HomeSection; onToggle: () => void; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: s.id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  const block = BLOCKS.find((b) => b.type === s.type);
  const Icon = block?.icon ?? LayoutGrid;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group flex items-center gap-3 rounded-lg border border-border bg-card p-3",
        isDragging && "opacity-50 shadow-luxe border-gold",
      )}
    >
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 text-muted-foreground hover:text-foreground">
        <GripVertical className="h-4 w-4" />
      </button>
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-gold">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-display text-sm font-semibold">{s.title}</p>
        <p className="text-xs text-muted-foreground">{s.type}</p>
      </div>
      <Button variant="ghost" size="icon" onClick={onToggle}>
        {s.enabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
      </Button>
      <Button variant="ghost" size="icon" onClick={onRemove}>
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  );
}

function BlockButton({ block, onClick }: { block: (typeof BLOCKS)[number]; onClick: () => void }) {
  const Icon = block.icon;
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 rounded-lg border border-border p-3 transition-colors hover:border-gold hover:bg-gold/5"
    >
      <Icon className="h-5 w-5 text-gold" />
      <span className="text-center text-[11px] font-medium leading-tight">{block.label}</span>
    </button>
  );
}

export function HomepageBuilder() {
  const [sections, setSections] = useState<HomeSection[]>(defaultHomeSections);

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIdx = sections.findIndex((s) => s.id === active.id);
    const newIdx = sections.findIndex((s) => s.id === over.id);
    setSections(arrayMove(sections, oldIdx, newIdx));
  };

  const addBlock = (type: SectionType) => {
    const block = BLOCKS.find((b) => b.type === type);
    setSections([...sections, { id: `s${Date.now()}`, type, title: block?.label ?? type, enabled: true }]);
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Homepage Builder</h1>
          <p className="mt-1 text-sm text-muted-foreground">Drag, reorder, and toggle sections for mock storefront layouts.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Preview</Button>
          <Button><Save className="mr-1.5 h-3.5 w-3.5" /> Publish</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div>
          <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Active sections ({sections.filter((s) => s.enabled).length})
          </h2>
          <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {sections.map((s) => (
                  <SortableRow
                    key={s.id}
                    s={s}
                    onToggle={() => setSections(sections.map((x) => (x.id === s.id ? { ...x, enabled: !x.enabled } : x)))}
                    onRemove={() => setSections(sections.filter((x) => x.id !== s.id))}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        <aside className="h-fit rounded-lg border border-border bg-card p-4 lg:sticky lg:top-24">
          <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">Add block</h2>
          <div className="grid grid-cols-2 gap-2">
            {BLOCKS.map((b) => (
              <BlockButton key={b.type} block={b} onClick={() => addBlock(b.type)} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
