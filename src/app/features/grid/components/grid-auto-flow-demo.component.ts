import { Component, computed, signal } from '@angular/core';
import { PropertyDemoComponent } from '../../../shared/components/property-demo/property-demo.component';
import { PreviewBoxComponent } from '../../../shared/components/preview-box/preview-box.component';
import { ControlToggleComponent } from '../../../shared/components/control-toggle/control-toggle.component';

const OPTIONS = ['row', 'column', 'row dense', 'column dense'];

@Component({
  selector: 'lc-grid-auto-flow-demo',
  standalone: true,
  imports: [PropertyDemoComponent, PreviewBoxComponent, ControlToggleComponent],
  template: `
    <lc-property-demo
      property="grid-auto-flow"
      description="Controls how auto-placed items fill the grid. 'row' (default) fills left-to-right then wraps. 'column' fills top-to-bottom. 'dense' back-fills holes left by spanning items — compare 'row' vs 'row dense' to see the difference."
      appliesTo="grid container"
      [cssOutput]="css()"
    >
      <lc-control-toggle
        controls
        label="grid-auto-flow"
        [options]="options"
        [value]="value()"
        (valueChange)="value.set($event)"
      />
      <lc-preview-box
        preview
        [containerStyle]="containerStyle()"
        [boxes]="boxes"
      />
    </lc-property-demo>
  `,
})
export class GridAutoFlowDemoComponent {
  protected readonly options = OPTIONS;
  protected readonly value = signal('row');

  // Two span-2 items in a 3-col grid:
  // row: [1 span2][hole][2 span2][hole][3][4][5]  ← holes visible
  // row dense: [1 span2][3][2 span2][4][5][...]   ← back-filled
  protected readonly boxes: { style: Record<string, string> }[] = [
    { style: { 'grid-column': 'span 2', 'min-height': '56px' } },
    { style: { 'grid-column': 'span 2', 'min-height': '56px' } },
    { style: { 'min-height': '56px' } },
    { style: { 'min-height': '56px' } },
    { style: { 'min-height': '56px' } },
  ];

  protected readonly containerStyle = computed(() => ({
    display: 'grid',
    'grid-template-columns': 'repeat(3, 1fr)',
    'grid-auto-flow': this.value(),
    gap: '8px',
    padding: '12px',
    'min-height': '200px',
  }));

  protected readonly css = computed(() => `display: grid; grid-auto-flow: ${this.value()};`);
}
