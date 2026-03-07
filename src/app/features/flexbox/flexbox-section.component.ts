import { Component } from '@angular/core';
import { AlignContentDemoComponent } from './components/align-content-demo.component';
import { AlignItemsDemoComponent } from './components/align-items-demo.component';
import { AlignSelfDemoComponent } from './components/align-self-demo.component';
import { FlexBasisDemoComponent } from './components/flex-basis-demo.component';
import { FlexDirectionDemoComponent } from './components/flex-direction-demo.component';
import { FlexGrowDemoComponent } from './components/flex-grow-demo.component';
import { FlexShrinkDemoComponent } from './components/flex-shrink-demo.component';
import { FlexWrapDemoComponent } from './components/flex-wrap-demo.component';
import { GapDemoComponent } from './components/gap-demo.component';
import { JustifyContentDemoComponent } from './components/justify-content-demo.component';
import { OrderDemoComponent } from './components/order-demo.component';

@Component({
  selector: 'lc-flexbox-section',
  standalone: true,
  imports: [
    FlexDirectionDemoComponent,
    FlexWrapDemoComponent,
    JustifyContentDemoComponent,
    AlignItemsDemoComponent,
    AlignContentDemoComponent,
    GapDemoComponent,
    FlexGrowDemoComponent,
    FlexShrinkDemoComponent,
    FlexBasisDemoComponent,
    AlignSelfDemoComponent,
    OrderDemoComponent,
  ],
  template: `
    <section class="section">
      <header class="section__header">
        <h2 class="section__title">Flexbox</h2>
        <p class="section__subtitle">
          One-dimensional layout. Choose a main axis, then control how items
          are sized and distributed along it and the perpendicular cross axis.
        </p>
      </header>

      <div class="section__group">
        <h3 class="section__group-label">Container properties</h3>
        <div class="section__demos">
          <lc-flex-direction-demo />
          <lc-flex-wrap-demo />
          <lc-justify-content-demo />
          <lc-align-items-demo />
          <lc-align-content-demo />
          <lc-gap-demo />
        </div>
      </div>

      <div class="section__group">
        <h3 class="section__group-label">Item properties</h3>
        <div class="section__demos">
          <lc-flex-grow-demo />
          <lc-flex-shrink-demo />
          <lc-flex-basis-demo />
          <lc-align-self-demo />
          <lc-order-demo />
        </div>
      </div>
    </section>
  `,
  styles: `
    @use 'styles/tokens' as t;

    .section__header {
      margin-bottom: t.$spacing-xl;
    }

    .section__title {
      font-size: 1.75rem;
      color: t.$color-text-primary;
      margin-bottom: 0.375rem;
    }

    .section__subtitle {
      font-size: 1rem;
      color: t.$color-text-secondary;
      max-width: 600px;
    }

    .section__group {
      margin-bottom: t.$spacing-2xl;
    }

    .section__group-label {
      font-size: 0.75rem;
      font-family: t.$font-mono;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: t.$color-text-muted;
      margin-bottom: t.$spacing-md;
      padding-bottom: t.$spacing-sm;
      border-bottom: 1px solid t.$color-border;
    }

    .section__demos {
      display: flex;
      flex-direction: column;
      gap: t.$spacing-lg;
    }
  `,
})
export class FlexboxSectionComponent {}
