import { Component, computed, signal } from '@angular/core';
import { PropertyDemoComponent } from '../../../shared/components/property-demo/property-demo.component';
import { PreviewBoxComponent } from '../../../shared/components/preview-box/preview-box.component';
import { ControlToggleComponent } from '../../../shared/components/control-toggle/control-toggle.component';

const OPTIONS = ['auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline'];

@Component({
  selector: 'lc-align-self-demo',
  standalone: true,
  imports: [PropertyDemoComponent, PreviewBoxComponent, ControlToggleComponent],
  template: `
    <lc-property-demo
      property="align-self"
      description="Overrides align-items for a single item. Lets one child opt out of the container's cross-axis alignment without affecting its siblings."
      appliesTo="flex item"
      [cssOutput]="css()"
    >
      <lc-control-toggle
        controls
        label="Box 2 align-self"
        [options]="options"
        [value]="value()"
        (valueChange)="value.set($event)"
      />
      <lc-preview-box
        preview
        [containerStyle]="containerStyle"
        [boxes]="boxes()"
      />
    </lc-property-demo>
  `,
})
export class AlignSelfDemoComponent {
  protected readonly options = OPTIONS;

  /**
   * The align-self value applied only to box 2.
   * 'auto' means "inherit the container's align-items" (which is flex-start here).
   */
  protected readonly value = signal('auto');

  // Container uses align-items: flex-start as baseline so any override on box 2 is immediately visible.
  // min-height gives the container cross-axis room to align within.
  protected readonly containerStyle = {
    display: 'flex',
    'align-items': 'flex-start',
    gap: '8px',
    padding: '12px',
    'min-height': '160px',
  };

  /**
   * Only box 2 receives the align-self override; boxes 1 & 3 stay at the container's default.
   * `as Record<string, string>` cast is required because the type of optional properties
   * in a union wouldn't otherwise narrow correctly for Angular's [style] binding.
   */
  protected readonly boxes = computed(() => [
    { style: { 'min-height': '56px' } as Record<string, string> },
    { style: { 'align-self': this.value(), 'min-height': '56px' } as Record<string, string> },
    { style: { 'min-height': '56px' } as Record<string, string> },
  ]);

  /** Derives the CSS snippet showing only the overridden item rule. */
  protected readonly css = computed(() => `.box-2 { align-self: ${this.value()}; }`);
}
