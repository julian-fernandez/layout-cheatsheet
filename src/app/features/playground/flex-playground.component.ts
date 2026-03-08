import { Component, computed, signal } from '@angular/core';
import { ControlSliderComponent } from '../../shared/components/control-slider/control-slider.component';
import { ControlToggleComponent } from '../../shared/components/control-toggle/control-toggle.component';

type Direction      = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type Wrap           = 'nowrap' | 'wrap' | 'wrap-reverse';
type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
type AlignItems     = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
type AlignContent   = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly';
type AlignSelf      = 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';

const BOX_COLORS = [
  '#7c83ff', '#f472b6', '#4ade80', '#fbbf24',
  '#38bdf8', '#fb923c', '#a78bfa', '#34d399',
  '#f87171', '#facc15', '#60a5fa', '#e879f9',
];

@Component({
  selector: 'lc-flex-playground',
  standalone: true,
  imports: [ControlSliderComponent, ControlToggleComponent],
  template: `
    <div class="pg">
      <header class="pg__header">
        <h2 class="pg__title">Flex Playground</h2>
        <p class="pg__subtitle">
          All Flexbox properties on one container. Items
          <span class="badge badge--1">1</span> and
          <span class="badge badge--2">2</span>
          have independent item-level controls — adjust their grow, shrink, basis,
          align-self and order independently to compare.
        </p>
      </header>

      <div class="pg__body">

        <!-- ── Controls ───────────────────────────────────── -->
        <aside class="pg__controls">

          <div class="ctrl-group">
            <h4 class="ctrl-group__label">flex-direction</h4>
            <lc-control-toggle
              label="axis"
              [options]="['row', 'row-reverse', 'column', 'column-reverse']"
              [value]="direction()"
              (valueChange)="setDirection($event)"
            />
          </div>

          <div class="ctrl-group">
            <h4 class="ctrl-group__label">flex-wrap</h4>
            <lc-control-toggle
              label="wrapping"
              [options]="['nowrap', 'wrap', 'wrap-reverse']"
              [value]="wrap()"
              (valueChange)="setWrap($event)"
            />
          </div>

          <div class="ctrl-group">
            <h4 class="ctrl-group__label">justify-content</h4>
            <lc-control-toggle
              label="main axis"
              [options]="justifyOptions"
              [value]="justifyContent()"
              (valueChange)="setJustifyContent($event)"
            />
          </div>

          <div class="ctrl-group">
            <h4 class="ctrl-group__label">align-items</h4>
            <lc-control-toggle
              label="cross axis (single line)"
              [options]="alignItemsOptions"
              [value]="alignItems()"
              (valueChange)="setAlignItems($event)"
            />
          </div>

          <div class="ctrl-group">
            <h4 class="ctrl-group__label">align-content</h4>
            <p class="ctrl-group__hint">
              Only active when <strong>flex-wrap</strong> is set.
              Controls spacing between wrapped rows/columns as a group.
            </p>
            <lc-control-toggle
              label="cross axis (multi-line)"
              [options]="alignContentOptions"
              [value]="alignContent()"
              (valueChange)="setAlignContent($event)"
            />
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
            <h4 class="ctrl-group__label">Items</h4>
            <lc-control-slider
              label="item count"
              [value]="itemCount()"
              [min]="2"
              [max]="10"
              (valueChange)="itemCount.set($event)"
            />
          </div>

          <!-- Item 1 -->
          <div class="ctrl-group ctrl-group--item ctrl-group--item-1">
            <h4 class="ctrl-group__label">Item 1</h4>
            <lc-control-slider
              label="flex-grow"
              [value]="i1Grow()"
              [min]="0"
              [max]="5"
              (valueChange)="i1Grow.set($event)"
            />
            <lc-control-slider
              label="flex-shrink"
              [value]="i1Shrink()"
              [min]="0"
              [max]="5"
              (valueChange)="i1Shrink.set($event)"
            />
            <lc-control-slider
              label="flex-basis"
              [value]="i1Basis()"
              [min]="0"
              [max]="300"
              [step]="10"
              unit="px"
              (valueChange)="i1Basis.set($event)"
            />
            <lc-control-toggle
              label="align-self"
              [options]="alignSelfOptions"
              [value]="i1AlignSelf()"
              (valueChange)="setI1AlignSelf($event)"
            />
            <lc-control-slider
              label="order"
              [value]="i1Order()"
              [min]="-3"
              [max]="3"
              (valueChange)="i1Order.set($event)"
            />
          </div>

          <!-- Item 2 -->
          <div class="ctrl-group ctrl-group--item ctrl-group--item-2">
            <h4 class="ctrl-group__label">Item 2</h4>
            <lc-control-slider
              label="flex-grow"
              [value]="i2Grow()"
              [min]="0"
              [max]="5"
              (valueChange)="i2Grow.set($event)"
            />
            <lc-control-slider
              label="flex-shrink"
              [value]="i2Shrink()"
              [min]="0"
              [max]="5"
              (valueChange)="i2Shrink.set($event)"
            />
            <lc-control-slider
              label="flex-basis"
              [value]="i2Basis()"
              [min]="0"
              [max]="300"
              [step]="10"
              unit="px"
              (valueChange)="i2Basis.set($event)"
            />
            <lc-control-toggle
              label="align-self"
              [options]="alignSelfOptions"
              [value]="i2AlignSelf()"
              (valueChange)="setI2AlignSelf($event)"
            />
            <lc-control-slider
              label="order"
              [value]="i2Order()"
              [min]="-3"
              [max]="3"
              (valueChange)="i2Order.set($event)"
            />
          </div>

        </aside>

        <!-- ── Preview canvas ─────────────────────────────── -->
        <div class="pg__preview">
          <div class="preview-flex" [style]="containerStyle()">
            @for (style of itemStyles(); track $index) {
              <div
                class="preview-item"
                [class.preview-item--1]="$index === 0"
                [class.preview-item--2]="$index === 1"
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

    // ── Shell ───────────────────────────────────────────────────────────────────
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
    }

    // Item badges in subtitle
    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 700;
      color: rgba(0, 0, 0, 0.75);
      vertical-align: middle;

      &--1 { background: #7c83ff; }
      &--2 { background: #f472b6; }
    }

    // ── Body ────────────────────────────────────────────────────────────────────
    .pg__body {
      display: grid;
      grid-template-columns: 1fr;
      min-height: 500px;

      @media (min-width: 768px) {
        grid-template-columns: 280px 1fr;
      }
    }

    // ── Controls ────────────────────────────────────────────────────────────────
    .pg__controls {
      padding: 1.25rem;
      border-bottom: 1px solid t.$color-border;
      display: flex;
      flex-direction: column;
      overflow-y: auto;

      @media (min-width: 768px) {
        border-bottom: none;
        border-right: 1px solid t.$color-border;
        max-height: 640px;
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

      // Item sections get a left accent bar
      &--item {
        padding-left: 0.75rem;
        border-left: 3px solid;
      }
      &--item-1 { border-left-color: #7c83ff; }
      &--item-2 { border-left-color: #f472b6; }
    }

    .ctrl-group__label {
      font-size: 0.7rem;
      font-family: t.$font-mono;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: t.$color-accent;

      .ctrl-group--item-1 & { color: #7c83ff; }
      .ctrl-group--item-2 & { color: #f472b6; }
    }

    .ctrl-group__hint {
      font-size: 0.75rem;
      color: t.$color-text-muted;
      line-height: 1.5;

      strong { color: t.$color-text-secondary; }
    }

    // ── Preview ─────────────────────────────────────────────────────────────────
    .pg__preview {
      background: t.$color-bg;
      padding: 1.25rem;
      overflow: auto;
      display: flex;
      align-items: stretch;
    }

    // Fixed height so align-items, align-content, and column direction always
    // have space to show their effects
    .preview-flex {
      display: flex;
      width: 100%;
      height: 320px;
      transition: all 0.25s ease;
      overflow: auto;
    }

    .preview-item {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 120px;
      min-height: 44px;
      border-radius: 6px;
      font-weight: 700;
      font-size: 0.875rem;
      color: rgba(0, 0, 0, 0.7);
      transition: all 0.25s ease;

      // Items 1 & 2 get outlines matching their accent color
      &--1 { outline: 3px solid rgba(255, 255, 255, 0.85); outline-offset: -3px; }
      &--2 { outline: 3px solid rgba(255, 255, 255, 0.5);  outline-offset: -3px; }
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
export class FlexPlaygroundComponent {
  // ── Container ────────────────────────────────────────────────────────────────
  protected readonly direction = signal<Direction>('row');
  protected setDirection(v: string): void { this.direction.set(v as Direction); }

  protected readonly wrap = signal<Wrap>('nowrap');
  protected setWrap(v: string): void { this.wrap.set(v as Wrap); }

  protected readonly justifyOptions: JustifyContent[] = [
    'flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly',
  ];
  protected readonly justifyContent = signal<JustifyContent>('flex-start');
  protected setJustifyContent(v: string): void { this.justifyContent.set(v as JustifyContent); }

  protected readonly alignItemsOptions: AlignItems[] = [
    'flex-start', 'flex-end', 'center', 'stretch', 'baseline',
  ];
  protected readonly alignItems = signal<AlignItems>('stretch');
  protected setAlignItems(v: string): void { this.alignItems.set(v as AlignItems); }

  protected readonly alignContentOptions: AlignContent[] = [
    'flex-start', 'flex-end', 'center', 'stretch', 'space-between', 'space-around', 'space-evenly',
  ];
  protected readonly alignContent = signal<AlignContent>('flex-start');
  protected setAlignContent(v: string): void { this.alignContent.set(v as AlignContent); }

  protected readonly colGap = signal(8);
  protected readonly rowGap = signal(8);

  // ── Items ────────────────────────────────────────────────────────────────────
  protected readonly itemCount = signal(5);

  // Item 1
  protected readonly i1Grow      = signal(0);
  protected readonly i1Shrink    = signal(1);
  protected readonly i1Basis     = signal(120);
  protected readonly alignSelfOptions: AlignSelf[] = [
    'auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline',
  ];
  protected readonly i1AlignSelf = signal<AlignSelf>('auto');
  protected setI1AlignSelf(v: string): void { this.i1AlignSelf.set(v as AlignSelf); }
  protected readonly i1Order     = signal(0);

  // Item 2
  protected readonly i2Grow      = signal(0);
  protected readonly i2Shrink    = signal(1);
  protected readonly i2Basis     = signal(120);
  protected readonly i2AlignSelf = signal<AlignSelf>('auto');
  protected setI2AlignSelf(v: string): void { this.i2AlignSelf.set(v as AlignSelf); }
  protected readonly i2Order     = signal(0);

  // ── Derived ──────────────────────────────────────────────────────────────────
  protected readonly containerStyle = computed<Record<string, string>>(() => ({
    'flex-direction':  this.direction(),
    'flex-wrap':       this.wrap(),
    'justify-content': this.justifyContent(),
    'align-items':     this.alignItems(),
    'align-content':   this.alignContent(),
    'column-gap':      `${this.colGap()}px`,
    'row-gap':         `${this.rowGap()}px`,
  }));

  protected readonly itemStyles = computed(() =>
    Array.from({ length: this.itemCount() }, (_, i): Record<string, string> => {
      const bg = BOX_COLORS[i % BOX_COLORS.length];
      if (i === 0) {
        return {
          background:     bg,
          'flex-grow':    String(this.i1Grow()),
          'flex-shrink':  String(this.i1Shrink()),
          'flex-basis':   `${this.i1Basis()}px`,
          'align-self':   this.i1AlignSelf(),
          'order':        String(this.i1Order()),
        };
      }
      if (i === 1) {
        return {
          background:     bg,
          'flex-grow':    String(this.i2Grow()),
          'flex-shrink':  String(this.i2Shrink()),
          'flex-basis':   `${this.i2Basis()}px`,
          'align-self':   this.i2AlignSelf(),
          'order':        String(this.i2Order()),
        };
      }
      return { background: bg, 'flex-basis': '120px' };
    }),
  );

  // CSS output — only emits non-default values to model real-world usage
  protected readonly css = computed(() => {
    const lines: string[] = ['.flex-container {', '  display: flex;'];

    if (this.direction() !== 'row')
      lines.push(`  flex-direction: ${this.direction()};`);
    if (this.wrap() !== 'nowrap')
      lines.push(`  flex-wrap: ${this.wrap()};`);
    if (this.justifyContent() !== 'flex-start')
      lines.push(`  justify-content: ${this.justifyContent()};`);
    if (this.alignItems() !== 'stretch')
      lines.push(`  align-items: ${this.alignItems()};`);
    if (this.wrap() !== 'nowrap' && this.alignContent() !== 'flex-start')
      lines.push(`  align-content: ${this.alignContent()};`);

    if (this.colGap() === this.rowGap() && this.colGap() > 0) {
      lines.push(`  gap: ${this.colGap()}px;`);
    } else {
      if (this.colGap()) lines.push(`  column-gap: ${this.colGap()}px;`);
      if (this.rowGap()) lines.push(`  row-gap: ${this.rowGap()}px;`);
    }

    lines.push('}');

    // Item 1 — only emit properties that differ from flex defaults
    const i1: string[] = [];
    if (this.i1Grow() !== 0)         i1.push(`  flex-grow: ${this.i1Grow()};`);
    if (this.i1Shrink() !== 1)       i1.push(`  flex-shrink: ${this.i1Shrink()};`);
    if (this.i1Basis() !== 120)      i1.push(`  flex-basis: ${this.i1Basis()}px;`);
    if (this.i1AlignSelf() !== 'auto') i1.push(`  align-self: ${this.i1AlignSelf()};`);
    if (this.i1Order() !== 0)        i1.push(`  order: ${this.i1Order()};`);
    if (i1.length) lines.push('', '.item-1 {', ...i1, '}');

    // Item 2
    const i2: string[] = [];
    if (this.i2Grow() !== 0)         i2.push(`  flex-grow: ${this.i2Grow()};`);
    if (this.i2Shrink() !== 1)       i2.push(`  flex-shrink: ${this.i2Shrink()};`);
    if (this.i2Basis() !== 120)      i2.push(`  flex-basis: ${this.i2Basis()}px;`);
    if (this.i2AlignSelf() !== 'auto') i2.push(`  align-self: ${this.i2AlignSelf()};`);
    if (this.i2Order() !== 0)        i2.push(`  order: ${this.i2Order()};`);
    if (i2.length) lines.push('', '.item-2 {', ...i2, '}');

    return lines.join('\n');
  });
}
