import { Component, computed, signal } from '@angular/core';
import { PropertyDemoComponent } from '../../../shared/components/property-demo/property-demo.component';
import { ControlToggleComponent } from '../../../shared/components/control-toggle/control-toggle.component';

type Mode = 'subgrid' | 'independent';

@Component({
  selector: 'lc-grid-subgrid-demo',
  standalone: true,
  imports: [PropertyDemoComponent, ControlToggleComponent],
  template: `
    <lc-property-demo
      property="subgrid"
      description="Lets a nested grid inherit its parent's track sizes. The parent here uses '1fr 2fr 1fr' — a narrow column, a wide middle, a narrow column. With subgrid, every card's cells snap to those same tracks and align with the header. Switch to 'independent' and each card reverts to its own equal thirds — the middle cell shrinks and nothing lines up."
      appliesTo="nested grid container"
      [cssOutput]="css()"
    >
      <lc-control-toggle
        controls
        label="Card grid-template-columns"
        [options]="['subgrid', 'independent']"
        [value]="mode()"
        (valueChange)="setMode($event)"
      />
      <div preview class="outer-grid">
        <!-- Header row: direct children of the parent grid, so they occupy the 3 tracks -->
        <div class="col-header col-header--a">Name</div>
        <div class="col-header col-header--b">Description</div>
        <div class="col-header col-header--c">Status</div>

        <!-- Cards: each spans all 3 columns, then creates its own inner grid -->
        @for (card of cards; track card.id) {
          <div class="card" [style.gridTemplateColumns]="childColumns()">
            <div class="cell cell--a">{{ card.name }}</div>
            <div class="cell cell--b">{{ card.description }}</div>
            <div class="cell cell--c">{{ card.status }}</div>
          </div>
        }
      </div>
    </lc-property-demo>
  `,
  styles: `
    .outer-grid {
      display: grid;
      grid-template-columns: 1fr 2fr 1fr;
      gap: 6px;
      width: 100%;
      padding: 12px;
      box-sizing: border-box;
      align-items: start;
    }

    .col-header {
      font-size: 0.7rem;
      font-family: monospace;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 4px 8px;
      border-radius: 4px;
      color: rgba(255, 255, 255, 0.5);
      background: rgba(255, 255, 255, 0.07);
      text-align: center;
    }

    .card {
      display: grid;
      grid-column: span 3;
      gap: 6px;
      padding: 4px 0;
      border-top: 1px dashed rgba(255, 255, 255, 0.12);
      transition: grid-template-columns 0.3s ease;
    }

    .cell {
      display: flex;
      align-items: center;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 600;
      padding: 8px 10px;
      color: rgba(0, 0, 0, 0.75);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .cell--a { background: #7c83ff; }
    .cell--b { background: #4ade80; }
    .cell--c { background: #fbbf24; }
  `,
})
export class GridSubgridDemoComponent {
  /** 'subgrid' inherits parent column tracks; 'independent' uses its own equal-thirds grid. */
  protected readonly mode = signal<Mode>('subgrid');

  /**
   * Wrapper method for the `(valueChange)` binding.
   * Angular's template parser doesn't support `$event as Mode` inline casts.
   */
  protected setMode(value: string): void { this.mode.set(value as Mode); }

  // Realistic card data — demonstrates that subgrid is primarily useful for
  // aligning content across sibling containers (like table rows without a <table>).
  protected readonly cards = [
    { id: 1, name: 'Alice',   description: 'Leads the frontend architecture', status: 'Active' },
    { id: 2, name: 'Bob',     description: 'Owns the design system',          status: 'Away'   },
    { id: 3, name: 'Charlie', description: 'Backend infra',                   status: 'Done'   },
  ];

  /**
   * The key derived value — returns the CSS string applied to each card's grid-template-columns.
   * 'subgrid': the card inherits the parent's 1fr 2fr 1fr tracks → columns align with the header.
   * '1fr 1fr 1fr': the card uses its own equal thirds → middle column is narrow, header misaligns.
   * The parent uses 1fr 2fr 1fr (not 1fr 1fr 1fr) so the difference is immediately visible.
   */
  protected readonly childColumns = computed(() =>
    this.mode() === 'subgrid' ? 'subgrid' : '1fr 1fr 1fr',
  );

  /** Derives the CSS snippet. Shows both the parent grid and the child card rule. */
  protected readonly css = computed(() =>
    this.mode() === 'subgrid'
      ? `.parent {\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr;\n}\n.card {\n  grid-column: span 3;\n  display: grid;\n  grid-template-columns: subgrid; /* inherits 1fr 2fr 1fr */\n}`
      : `.parent {\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr;\n}\n.card {\n  grid-column: span 3;\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr; /* own equal tracks — misaligned */\n}`,
  );
}
