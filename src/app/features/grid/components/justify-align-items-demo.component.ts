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
  protected readonly justifyItems = signal('stretch');
  protected readonly alignItems = signal('stretch');

  // min-width/min-height give items a natural size for start/end/center,
  // but don't block grid stretch (unlike width/height which take priority over stretch).
  protected readonly boxes: { style: Record<string, string> }[] = [
    { style: { 'min-width': '48px', 'min-height': '48px' } },
    { style: { 'min-width': '48px', 'min-height': '48px' } },
    { style: { 'min-width': '48px', 'min-height': '48px' } },
    { style: { 'min-width': '48px', 'min-height': '48px' } },
  ];

  protected readonly containerStyle = computed(() => ({
    display: 'grid',
    'grid-template-columns': 'repeat(2, 1fr)',
    'grid-template-rows': 'repeat(2, 100px)',
    'justify-items': this.justifyItems(),
    'align-items': this.alignItems(),
    gap: '8px',
    padding: '12px',
  }));

  protected readonly css = computed(
    () =>
      `justify-items: ${this.justifyItems()}; align-items: ${this.alignItems()};`
  );
}
