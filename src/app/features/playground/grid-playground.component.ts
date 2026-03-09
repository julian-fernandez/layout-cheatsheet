import { Component, computed, signal } from '@angular/core';
import { ControlSliderComponent } from '../../shared/components/control-slider/control-slider.component';
import { ControlToggleComponent } from '../../shared/components/control-toggle/control-toggle.component';

type ColMode     = 'equal-fr' | 'auto-fit' | 'auto-fill' | 'fixed-px';
type RowMode     = 'auto' | 'fixed';
type FlowMode    = 'row' | 'column' | 'row dense' | 'column dense';
type ItemAlign   = 'start' | 'end' | 'center' | 'stretch';
type ContentAlign =
  | 'start' | 'end' | 'center' | 'stretch'
  | 'space-between' | 'space-around' | 'space-evenly';

const BOX_COLORS = [
  '#7c83ff', '#f472b6', '#4ade80', '#fbbf24',
  '#38bdf8', '#fb923c', '#a78bfa', '#34d399',
  '#f87171', '#facc15', '#60a5fa', '#e879f9',
];

@Component({
  selector: 'lc-grid-playground',
  standalone: true,
  imports: [ControlSliderComponent, ControlToggleComponent],
  template: `
    <div class="pg">
      <header class="pg__header">
        <h2 class="pg__title">Grid Playground</h2>
        <p class="pg__subtitle">
          All CSS Grid container properties applied to the same grid at once —
          see how they interact. <strong>Item 1</strong> (outlined in white) has
          independent column and row span controls.
        </p>
      </header>

      <div class="pg__body">

        <!-- ── Controls sidebar ───────────────────────────── -->
        <aside class="pg__controls">

          <div class="ctrl-group">
            <h4 class="ctrl-group__label">grid-template-columns</h4>
            <lc-control-toggle
              label="mode"
              [options]="['equal-fr', 'auto-fit', 'auto-fill', 'fixed-px']"
              [value]="colMode()"
              (valueChange)="setColMode($event)"
            />
            @if (colMode() === 'equal-fr') {
              <lc-control-slider
                label="column count"
                [value]="colCount()"
                [min]="1"
                [max]="6"
                (valueChange)="colCount.set($event)"
              />
            }
            @if (colMode() === 'fixed-px') {
              <lc-control-slider
                label="column width"
                [value]="colWidth()"
                [min]="50"
                [max]="240"
                [step]="10"
                unit="px"
                (valueChange)="colWidth.set($event)"
              />
            }
            @if (colMode() === 'auto-fit' || colMode() === 'auto-fill') {
              <lc-control-slider
                label="min width"
                [value]="autoMinWidth()"
                [min]="60"
                [max]="200"
                [step]="10"
                unit="px"
                (valueChange)="autoMinWidth.set($event)"
              />
            }
          </div>

          <div class="ctrl-group">
            <h4 class="ctrl-group__label">grid-auto-rows</h4>
            <lc-control-toggle
              label="mode"
              [options]="['auto', 'fixed']"
              [value]="rowMode()"
              (valueChange)="setRowMode($event)"
            />
            @if (rowMode() === 'fixed') {
              <lc-control-slider
                label="row height"
                [value]="rowHeight()"
                [min]="40"
                [max]="200"
                [step]="10"
                unit="px"
                (valueChange)="rowHeight.set($event)"
              />
            }
          </div>

          <div class="ctrl-group">
            <h4 class="ctrl-group__label">gap</h4>
            <lc-control-slider
              label="column-gap"
              [value]="colGap()"
              [min]="0"
              [max]="48"
              [step]="4"
              unit="px"
              (valueChange)="colGap.set($event)"
            />
            <lc-control-slider
              label="row-gap"
              [value]="rowGap()"
              [min]="0"
              [max]="48"
              [step]="4"
              unit="px"
              (valueChange)="rowGap.set($event)"
            />
          </div>

          <div class="ctrl-group">
            <h4 class="ctrl-group__label">grid-auto-flow</h4>
            <lc-control-toggle
              label="direction"
              [options]="['row', 'column', 'row dense', 'column dense']"
              [value]="autoFlow()"
              (valueChange)="setAutoFlow($event)"
            />
          </div>

          <div class="ctrl-group">
            <h4 class="ctrl-group__label">Item alignment</h4>
            <lc-control-toggle
              label="justify-items"
              [options]="['start', 'end', 'center', 'stretch']"
              [value]="justifyItems()"
              (valueChange)="setJustifyItems($event)"
            />
            <lc-control-toggle
              label="align-items"
              [options]="['start', 'end', 'center', 'stretch']"
              [value]="alignItems()"
              (valueChange)="setAlignItems($event)"
            />
          </div>

          <div class="ctrl-group">
            <h4 class="ctrl-group__label">Content alignment</h4>
            <p class="ctrl-group__hint">
              Only visible when the grid is smaller than its container.
              Try <strong>fixed-px</strong> columns with a narrow width.
            </p>
            <lc-control-toggle
              label="justify-content"
              [options]="contentOptions"
              [value]="justifyContent()"
              (valueChange)="setJustifyContent($event)"
            />
            <lc-control-toggle
              label="align-content"
              [options]="contentOptions"
              [value]="alignContent()"
              (valueChange)="setAlignContent($event)"
            />
          </div>

          <div class="ctrl-group">
            <h4 class="ctrl-group__label">Items</h4>
            <lc-control-slider
              label="item count"
              [value]="itemCount()"
              [min]="2"
              [max]="12"
              (valueChange)="itemCount.set($event)"
            />
          </div>

          <div class="ctrl-group">
            <h4 class="ctrl-group__label">Item 1 placement</h4>
            <lc-control-slider
              label="grid-column span"
              [value]="item1ColSpan()"
              [min]="1"
              [max]="4"
              (valueChange)="item1ColSpan.set($event)"
            />
            <lc-control-slider
              label="grid-row span"
              [value]="item1RowSpan()"
              [min]="1"
              [max]="3"
              (valueChange)="item1RowSpan.set($event)"
            />
          </div>

        </aside>

        <!-- ── Preview canvas ─────────────────────────────── -->
        <div class="pg__preview">
          <div class="preview-grid" [style]="containerStyle()">
            @for (style of itemStyles(); track $index) {
              <div
                class="preview-item"
                [class.preview-item--hero]="$index === 0"
                [style]="style"
              >
                {{ $index + 1 }}
              </div>
            }
          </div>
        </div>

      </div>

      <!-- ── CSS output ─────────────────────────────────────── -->
      <footer class="pg__code">
        <pre class="pg__pre"><code>{{ css() }}</code></pre>
      </footer>
    </div>
  `,
  styles: `
    @use 'styles/tokens' as t;

    // ── Playground shell ────────────────────────────────────────────────────────
    .pg {
      background: t.$color-surface;
      border: 1px solid t.$color-border;
      border-radius: t.$radius-lg;
      overflow: hidden;
    }

    .pg__header {
      padding: 1.5rem 1.5rem 1.25rem;
      border-bottom: 1px solid t.$color-border;
    }

    .pg__title {
      font-size: 1.5rem;
      color: t.$color-text-primary;
      margin-bottom: 0.375rem;
    }

    .pg__subtitle {
      font-size: 0.9375rem;
      color: t.$color-text-secondary;
      line-height: 1.6;
      max-width: 680px;

      strong { color: t.$color-text-primary; }
    }

    // ── Two-panel body ──────────────────────────────────────────────────────────
    .pg__body {
      display: grid;
      grid-template-columns: 1fr;
      min-height: 500px;

      @media (min-width: 768px) {
        grid-template-columns: 280px 1fr;
      }
    }

    // ── Controls sidebar ────────────────────────────────────────────────────────
    .pg__controls {
      padding: 1.25rem;
      border-bottom: 1px solid t.$color-border;
      display: flex;
      flex-direction: column;
      gap: 0; // ctrl-groups handle their own spacing
      overflow-y: auto;

      @media (min-width: 768px) {
        border-bottom: none;
        border-right: 1px solid t.$color-border;
        max-height: 600px;
      }
    }

    .ctrl-group {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      padding: 1rem 0;
      border-bottom: 1px solid t.$color-border;

      &:first-child { padding-top: 0; }
      &:last-child  { border-bottom: none; padding-bottom: 0; }
    }

    .ctrl-group__label {
      font-size: 0.7rem;
      font-family: t.$font-mono;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: t.$color-accent;
    }

    .ctrl-group__hint {
      font-size: 0.75rem;
      color: t.$color-text-muted;
      line-height: 1.5;

      strong { color: t.$color-text-secondary; }
    }

    // ── Preview canvas ──────────────────────────────────────────────────────────
    .pg__preview {
      background: t.$color-bg;
      padding: 1.25rem;
      overflow: auto;
    }

    .preview-grid {
      display: grid;
      width: 100%;
      min-height: 460px;
      transition: all 0.25s ease;
    }

    .preview-item {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 36px;
      min-height: 52px;
      border-radius: 6px;
      font-weight: 700;
      font-size: 0.875rem;
      color: rgba(0, 0, 0, 0.7);
      transition: all 0.25s ease;

      &--hero {
        outline: 3px solid rgba(255, 255, 255, 0.85);
        outline-offset: -3px;
      }
    }

    // ── CSS output ──────────────────────────────────────────────────────────────
    .pg__code {
      border-top: 1px solid t.$color-border;
      padding: 0.75rem 1.25rem;
      background: t.$color-surface-raised;
    }

    .pg__pre {
      margin: 0;
      font-family: t.$font-mono;
      font-size: 0.8125rem;
      color: t.$color-success;
      white-space: pre;
      overflow-x: auto;
      line-height: 1.6;
    }
  `,
})
/**
 * Single large playground for all CSS Grid container and item properties.
 *
 * Architecture: all knobs are signals; the live preview and CSS output are both
 * derived via computed(). Nothing is imperatively mutated — changing a signal
 * automatically re-derives both the preview styles and the code snippet.
 *
 * Three outputs share the same signal graph:
 *   containerStyle() → applied to .preview-grid via [style]
 *   itemStyles()     → applied per-item via @for loop
 *   css()            → displayed in the <pre> code footer
 */
export class GridPlaygroundComponent {
  // ── Column controls ──────────────────────────────────────────────────────────

  /** Active column sizing strategy — determines which secondary slider is shown. */
  protected readonly colMode      = signal<ColMode>('equal-fr');
  /** Number of equal 1fr columns (active in equal-fr mode only). */
  protected readonly colCount     = signal(3);
  /** Column width in px for fixed-px mode. */
  protected readonly colWidth     = signal(120);
  /** Min column width for auto-fit/auto-fill minmax() (active in those modes only). */
  protected readonly autoMinWidth = signal(100);

  /**
   * Type-cast wrapper — Angular's template parser rejects `$event as ColMode` inline,
   * so the narrowing from string → ColMode is done here.
   */
  protected setColMode(v: string): void { this.colMode.set(v as ColMode); }

  // ── Row controls ─────────────────────────────────────────────────────────────

  /** 'auto' lets rows size to content; 'fixed' applies a uniform px height to all rows. */
  protected readonly rowMode   = signal<RowMode>('auto');
  /** Row height in px, used when rowMode is 'fixed'. */
  protected readonly rowHeight = signal(80);
  protected setRowMode(v: string): void { this.rowMode.set(v as RowMode); }

  // ── Gap ──────────────────────────────────────────────────────────────────────

  /** Space between column tracks in px. */
  protected readonly colGap = signal(8);
  /** Space between row tracks in px. */
  protected readonly rowGap = signal(8);

  // ── Auto flow ────────────────────────────────────────────────────────────────

  /** Controls the direction items auto-place into the grid, and whether dense packing is enabled. */
  protected readonly autoFlow = signal<FlowMode>('row');
  protected setAutoFlow(v: string): void { this.autoFlow.set(v as FlowMode); }

  // ── Item alignment ───────────────────────────────────────────────────────────

  /** Horizontal alignment of each item within its cell. 'stretch' fills the full cell width. */
  protected readonly justifyItems = signal<ItemAlign>('stretch');
  protected setJustifyItems(v: string): void { this.justifyItems.set(v as ItemAlign); }

  /** Vertical alignment of each item within its cell. 'stretch' fills the full cell height. */
  protected readonly alignItems = signal<ItemAlign>('stretch');
  protected setAlignItems(v: string): void { this.alignItems.set(v as ItemAlign); }

  // ── Content alignment ────────────────────────────────────────────────────────

  /** Full set of valid justify-content/align-content values for the toggle component. */
  protected readonly contentOptions: ContentAlign[] = [
    'start', 'end', 'center', 'stretch',
    'space-between', 'space-around', 'space-evenly',
  ];

  /** Horizontal distribution of the whole grid within its container (visible when grid < container). */
  protected readonly justifyContent = signal<ContentAlign>('start');
  protected setJustifyContent(v: string): void { this.justifyContent.set(v as ContentAlign); }

  /** Vertical distribution of the whole grid within its container. */
  protected readonly alignContent = signal<ContentAlign>('start');
  protected setAlignContent(v: string): void { this.alignContent.set(v as ContentAlign); }

  // ── Items ────────────────────────────────────────────────────────────────────

  /** Number of boxes rendered in the preview. Drives the length of itemStyles(). */
  protected readonly itemCount    = signal(7);
  /** Column span for item 1 (the white-outlined "hero" box). */
  protected readonly item1ColSpan = signal(1);
  /** Row span for item 1. */
  protected readonly item1RowSpan = signal(1);

  // ── Derived ──────────────────────────────────────────────────────────────────

  /**
   * Intermediate computed — maps the ColMode enum to the actual CSS value string.
   * Extracted as its own computed so both containerStyle and css can share it
   * without duplicating the switch statement.
   * Private because no template or other class member needs to read it directly.
   */
  private readonly templateColumns = computed(() => {
    switch (this.colMode()) {
      case 'equal-fr':  return `repeat(${this.colCount()}, 1fr)`;
      case 'fixed-px':  return `repeat(auto-fill, ${this.colWidth()}px)`;
      case 'auto-fit':  return `repeat(auto-fit,  minmax(${this.autoMinWidth()}px, 1fr))`;
      case 'auto-fill': return `repeat(auto-fill, minmax(${this.autoMinWidth()}px, 1fr))`;
    }
  });

  /**
   * Full inline style object applied to the preview grid container via [style].
   * Angular's [style] binding accepts Record<string, string> and applies each
   * key as an individual inline style property, patching only what changed.
   */
  protected readonly containerStyle = computed<Record<string, string>>(() => ({
    'grid-template-columns': this.templateColumns(),
    'grid-auto-rows':        this.rowMode() === 'fixed' ? `${this.rowHeight()}px` : 'auto',
    'column-gap':            `${this.colGap()}px`,
    'row-gap':               `${this.rowGap()}px`,
    'grid-auto-flow':        this.autoFlow(),
    'justify-items':         this.justifyItems(),
    'align-items':           this.alignItems(),
    'justify-content':       this.justifyContent(),
    'align-content':         this.alignContent(),
  }));

  /**
   * Generates one style object per box based on itemCount().
   * Array.from({ length: N }, fn) creates N items without a pre-seeded array.
   * Only item 1 (index 0) gets span rules, and only when their values exceed 1 —
   * no point emitting `grid-column: span 1` since that's the default.
   */
  protected readonly itemStyles = computed(() =>
    Array.from({ length: this.itemCount() }, (_, i) => {
      const base: Record<string, string> = {
        background: BOX_COLORS[i % BOX_COLORS.length],
      };
      if (i === 0) {
        if (this.item1ColSpan() > 1) base['grid-column'] = `span ${this.item1ColSpan()}`;
        if (this.item1RowSpan() > 1) base['grid-row']    = `span ${this.item1RowSpan()}`;
      }
      return base;
    }),
  );

  /**
   * Builds the formatted CSS string shown in the <pre> code footer.
   *
   * Key design decisions:
   * - Only non-default values are emitted, modelling real-world CSS authoring.
   *   (e.g. grid-auto-flow:row is the default, so it's omitted when unchanged)
   * - gap is emitted as the shorthand when colGap === rowGap, otherwise longhands.
   * - Lines are pushed into an array and joined with \n so the <pre> tag renders
   *   them with correct indentation.
   * - item-1 rules are appended as a separate block only when span > 1.
   */
  protected readonly css = computed(() => {
    const lines: string[] = ['.grid {', '  display: grid;'];

    lines.push(`  grid-template-columns: ${this.templateColumns()};`);

    if (this.rowMode() === 'fixed') {
      lines.push(`  grid-auto-rows: ${this.rowHeight()}px;`);
    }

    if (this.colGap() === this.rowGap()) {
      lines.push(`  gap: ${this.colGap()}px;`);
    } else {
      if (this.colGap()) lines.push(`  column-gap: ${this.colGap()}px;`);
      if (this.rowGap()) lines.push(`  row-gap: ${this.rowGap()}px;`);
    }

    if (this.autoFlow() !== 'row') {
      lines.push(`  grid-auto-flow: ${this.autoFlow()};`);
    }

    if (this.justifyItems() !== 'stretch') {
      lines.push(`  justify-items: ${this.justifyItems()};`);
    }
    if (this.alignItems() !== 'stretch') {
      lines.push(`  align-items: ${this.alignItems()};`);
    }
    if (this.justifyContent() !== 'start') {
      lines.push(`  justify-content: ${this.justifyContent()};`);
    }
    if (this.alignContent() !== 'start') {
      lines.push(`  align-content: ${this.alignContent()};`);
    }

    lines.push('}');

    if (this.item1ColSpan() > 1 || this.item1RowSpan() > 1) {
      lines.push('', '.item-1 {');
      if (this.item1ColSpan() > 1) lines.push(`  grid-column: span ${this.item1ColSpan()};`);
      if (this.item1RowSpan() > 1) lines.push(`  grid-row: span ${this.item1RowSpan()};`);
      lines.push('}');
    }

    return lines.join('\n');
  });
}
