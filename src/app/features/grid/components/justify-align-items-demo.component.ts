import { Component, computed, signal } from '@angular/core';
import { PropertyDemoComponent } from '../../../shared/components/property-demo/property-demo.component';
import { PreviewBoxComponent } from '../../../shared/components/preview-box/preview-box.component';
import { ControlToggleComponent } from '../../../shared/components/control-toggle/control-toggle.component';

const OPTIONS = ['start', 'end', 'center', 'stretch'];

@Component({
  selector: 'lc-justify-align-items-demo',
  standalone: true,
  imports: [PropertyDemoComponent, PreviewBoxComponent, ControlToggleComponent],
  template: `
    <lc-property-demo
      property="justify-items / align-items"
      description="Controls how each item is positioned within its own grid cell. 'justify-items' is inline (horizontal), 'align-items' is block (vertical). 'stretch' fills the cell; 'center' shrinks the item to its natural size and centres it."
      appliesTo="grid container"
      [cssOutput]="css()"
    >
      <div controls style="display:flex; flex-direction:column; gap: 1rem;">
        <lc-control-toggle
          label="justify-items"
          [options]="options"
          [value]="justifyItems()"
          (valueChange)="justifyItems.set($event)"
        />
        <lc-control-toggle
          label="align-items"
          [options]="options"
          [value]="alignItems()"
          (valueChange)="alignItems.set($event)"
        />
      </div>
      <lc-preview-box
        preview
        [containerStyle]="containerStyle()"
        [boxes]="boxes"
      />
    </lc-property-demo>
  `,
})
export class JustifyAlignItemsDemoComponent {
  protected readonly options = OPTIONS;

  /** Horizontal alignment of items within their cell (inline axis). Defaults to 'stretch'. */
  protected readonly justifyItems = signal('stretch');

  /** Vertical alignment of items within their cell (block axis). Defaults to 'stretch'. */
  protected readonly alignItems = signal('stretch');

  // min-width/min-height give items a natural size so start/end/center shrink them visibly,
  // while NOT blocking stretch from overriding the cross-size (as an explicit width/height would).
  protected readonly boxes: { style: Record<string, string> }[] = [
    { style: { 'min-width': '48px', 'min-height': '48px' } },
    { style: { 'min-width': '48px', 'min-height': '48px' } },
    { style: { 'min-width': '48px', 'min-height': '48px' } },
    { style: { 'min-width': '48px', 'min-height': '48px' } },
  ];

  /**
   * Fixed row heights (100px) give each cell a defined space so
   * the vertical alignment (align-items) has room to show its effect.
   */
  protected readonly containerStyle = computed(() => ({
    display: 'grid',
    'grid-template-columns': 'repeat(2, 1fr)',
    'grid-template-rows': 'repeat(2, 100px)',
    'justify-items': this.justifyItems(),
    'align-items': this.alignItems(),
    gap: '8px',
    padding: '12px',
  }));

  /** Derives the CSS snippet shown in the code footer. */
  protected readonly css = computed(
    () =>
      `justify-items: ${this.justifyItems()}; align-items: ${this.alignItems()};`
  );
}
