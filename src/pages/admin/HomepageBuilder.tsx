import { useState } from "react";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Eye, EyeOff, Trash2, Plus, Save } from "lucide-react";
import { defaultHomeSections, type HomeSection, type SectionType } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BLOCKS: { type: SectionType; label: string; emoji: string }[] = [
  { type: "hero-slider", label: "Hero Slider", emoji: "🎬" },
  { type: "category-slider", label: "Category Slider", emoji: "🗂️" },
  { type: "featured-products", label: "Product Grid", emoji: "🛍️" },
  { type: "trending-products", label: "Trending", emoji: "🔥" },
  { type: "new-arrivals", label: "New Arrivals", emoji: "✨" },
  { type: "promo-banner", label: "Banner", emoji: "📣" },
  { type: "video-banner", label: "Video Banner", emoji: "🎥" },
  { type: "testimonials", label: "Testimonials", emoji: "⭐" },
  { type: "blog-section", label: "Blog Section", emoji: "📰" },
  { type: "newsletter", label: "Newsletter", emoji: "✉️" },
];

function SortableRow({ s, onToggle, onRemove }: { s: HomeSection; onToggle: () => void; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: s.id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  const block = BLOCKS.find((b) => b.type === s.type);
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("flex items-center gap-3 bg-card border border-border rounded-xl p-3 group",
        isDragging && "opacity-50 shadow-luxe border-gold")}
    >
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 text-muted-foreground hover:text-foreground">
        <GripVertical className="h-4 w-4" />
      </button>
      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-lg">{block?.emoji}</div>
      <div className="flex-1 min-w-0">
        <p className="font-display font-semibold text-sm">{s.title}</p>
        <p className="text-xs text-muted-foreground">{s.type}</p>
      </div>
      <Button variant="ghost" size="icon" onClick={onToggle}>
        {s.enabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
      </Button>
      <Button variant="ghost" size="icon" onClick={onRemove}><Trash2 className="h-4 w-4 text-destructive" /></Button>
    </div>
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
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Homepage Builder</h1>
          <p className="text-sm text-muted-foreground mt-1">Drag, reorder, and toggle sections. Changes preview live on storefront.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Preview</Button>
          <Button><Save className="h-3.5 w-3.5 mr-1.5" /> Publish</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div>
          <h2 className="font-display font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">Active sections ({sections.filter(s=>s.enabled).length})</h2>
          <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {sections.map((s) => (
                  <SortableRow
                    key={s.id}
                    s={s}
                    onToggle={() => setSections(sections.map((x) => x.id === s.id ? { ...x, enabled: !x.enabled } : x))}
                    onRemove={() => setSections(sections.filter((x) => x.id !== s.id))}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        <aside className="bg-card border border-border rounded-xl p-4 h-fit lg:sticky lg:top-24">
          <h2 className="font-display font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">Add block</h2>
          <div className="grid grid-cols-2 gap-2">
            {BLOCKS.map((b) => (
              <button key={b.type} onClick={() => addBlock(b.type)}
                className="flex flex-col items-center gap-1 p-3 rounded-lg border border-border hover:border-gold hover:bg-gold/5 transition-colors">
                <span className="text-2xl">{b.emoji}</span>
                <span className="text-[11px] font-medium text-center leading-tight">{b.label}</span>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
