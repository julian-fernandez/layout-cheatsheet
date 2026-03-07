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
      description="Lets a grid item that is also a grid container inherit its parent's track definitions. Without subgrid, each card creates its own independent column widths — cells rarely align across cards. With subgrid, every card's cells snap to the same parent columns. Essential for consistent multi-column card layouts."
      appliesTo="nested grid container"
      [cssOutput]="css()"
    >
      <lc-control-toggle
        controls
        label="Child grid-template-columns"
        [options]="['subgrid', 'independent']"
        [value]="mode()"
        (valueChange)="setMode($event)"
      />
      <div preview class="outer-grid">
        @for (card of cards; track card.id) {
          <div class="card" [style.gridTemplateColumns]="childColumns()">
            <div class="cell cell--a">{{ card.title }}</div>
            <div class="cell cell--b">{{ card.value }}</div>
            <div class="cell cell--c">{{ card.tag }}</div>
          </div>
        }
      </div>
    </lc-property-demo>
  `,
  styles: `
    .outer-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 6px;
      width: 100%;
      padding: 12px;
      box-sizing: border-box;
    }

    .card {
      display: grid;
      grid-column: span 3;
      gap: 4px;
      padding: 4px 0;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.15);
      transition: grid-template-columns 0.25s ease;
    }

    .cell {
      display: flex;
      align-items: center;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 600;
      padding: 8px 10px;
      color: rgba(0, 0, 0, 0.75);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .cell--a { background: #7c83ff; }
    .cell--b { background: #4ade80; }
    .cell--c { background: #fbbf24; }
  `,
})
export class GridSubgridDemoComponent {
  protected readonly mode = signal<Mode>('subgrid');
  protected setMode(value: string): void { this.mode.set(value as Mode); }

  protected readonly cards = [
    { id: 1, title: 'A Longer Title Here', value: 'Different Value', tag: 'Active' },
    { id: 2, title: 'Short', value: '42', tag: 'Done' },
    { id: 3, title: 'Another Card Name', value: '1,204', tag: 'Pending' },
  ];

  protected readonly childColumns = computed(() =>
    this.mode() === 'subgrid' ? 'subgrid' : '1fr 1fr 1fr',
  );

  protected readonly css = computed(() =>
    this.mode() === 'subgrid'
      ? `.parent {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n}\n.card {\n  grid-column: span 3;\n  display: grid;\n  grid-template-columns: subgrid; /* inherits parent tracks */\n}`
      : `.parent {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n}\n.card {\n  grid-column: span 3;\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr; /* independent — cells may not align */\n}`,
  );
}
