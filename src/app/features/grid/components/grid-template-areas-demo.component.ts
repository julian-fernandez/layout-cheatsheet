import { Component, computed, signal } from '@angular/core';
import { PropertyDemoComponent } from '../../../shared/components/property-demo/property-demo.component';
import { ControlToggleComponent } from '../../../shared/components/control-toggle/control-toggle.component';

type Layout = 'standard' | 'sidebar-right' | 'full-width';

interface Preset {
  columns: string;
  rows: string;
  areas: string[];
}

@Component({
  selector: 'lc-grid-template-areas-demo',
  standalone: true,
  imports: [PropertyDemoComponent, ControlToggleComponent],
  template: `
    <lc-property-demo
      property="grid-template-areas"
      description="Defines named regions in your grid using ASCII-art strings. Each quoted string is a row; repeated names span multiple cells. A child's 'grid-area' property then places it by name — no column/row numbers needed. Makes complex layouts readable and self-documenting."
      appliesTo="grid container + grid item"
      [cssOutput]="css()"
    >
      <lc-control-toggle
        controls
        label="Layout preset"
        [options]="['standard', 'sidebar-right', 'full-width']"
        [value]="layout()"
        (valueChange)="setLayout($event)"
      />
      <div preview class="areas-preview" [style]="containerStyle()">
        <div class="area area--header">header</div>
        <div class="area area--sidebar">sidebar</div>
        <div class="area area--main">main</div>
        <div class="area area--footer">footer</div>
      </div>
    </lc-property-demo>
  `,
  styles: `
    .areas-preview {
      display: grid;
      width: 100%;
      min-height: 200px;
      gap: 8px;
      padding: 8px;
      box-sizing: border-box;
      transition: all 0.3s ease;
    }

    .area {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      font-weight: 700;
      font-size: 0.8rem;
      font-family: monospace;
      color: rgba(0, 0, 0, 0.7);
      padding: 8px;
      min-height: 40px;
      transition: all 0.3s ease;
    }

    .area--header  { grid-area: header;  background: #7c83ff; }
    .area--sidebar { grid-area: sidebar; background: #f472b6; }
    .area--main    { grid-area: main;    background: #4ade80; }
    .area--footer  { grid-area: footer;  background: #fbbf24; }
  `,
})
export class GridTemplateAreasDemoComponent {
  /** Currently selected layout preset. */
  protected readonly layout = signal<Layout>('standard');

  /**
   * Wrapper method for the `(valueChange)` binding.
   * Angular's template parser doesn't support `$event as Layout` inline casts,
   * so the type narrowing happens here in the class instead.
   */
  protected setLayout(value: string): void { this.layout.set(value as Layout); }

  /**
   * Static map of layout presets — each defines the column sizes, row sizes,
   * and the ASCII-art area name strings that grid-template-areas expects.
   * Private because only the computed properties read from it.
   */
  private readonly presets: Record<Layout, Preset> = {
    standard: {
      columns: '180px 1fr',
      rows: 'auto 1fr auto',
      areas: ['"header header"', '"sidebar main"', '"footer footer"'],
    },
    'sidebar-right': {
      columns: '1fr 180px',
      rows: 'auto 1fr auto',
      areas: ['"header header"', '"main sidebar"', '"footer footer"'],
    },
    'full-width': {
      columns: '1fr',
      rows: 'auto 1fr auto auto',
      areas: ['"header"', '"main"', '"sidebar"', '"footer"'],
    },
  };

  /**
   * Derives the inline style object for the preview container from the active preset.
   * grid-template-areas requires the area strings joined with spaces into a single value.
   */
  protected readonly containerStyle = computed(() => {
    const p = this.presets[this.layout()];
    return {
      'grid-template-columns': p.columns,
      'grid-template-rows': p.rows,
      'grid-template-areas': p.areas.join(' '),
    };
  });

  /**
   * Derives the formatted CSS output.
   * Area strings are indented individually so they render as a readable ASCII grid in the <pre> block.
   */
  protected readonly css = computed(() => {
    const p = this.presets[this.layout()];
    const areaLines = p.areas.map((a) => `  ${a}`).join('\n');
    return (
      `.container {\n` +
      `  display: grid;\n` +
      `  grid-template-columns: ${p.columns};\n` +
      `  grid-template-rows: ${p.rows};\n` +
      `  grid-template-areas:\n` +
      `${areaLines};\n` +
      `}\n\n` +
      `.header  { grid-area: header; }\n` +
      `.sidebar { grid-area: sidebar; }\n` +
      `.main    { grid-area: main; }\n` +
      `.footer  { grid-area: footer; }`
    );
  });
}
