import { Component } from '@angular/core';
import { GridAutoColumnsDemoComponent } from './components/grid-auto-columns-demo.component';
import { GridAutoRowsDemoComponent } from './components/grid-auto-rows-demo.component';
import { GridAutoFitFillDemoComponent } from './components/grid-auto-fit-fill-demo.component';
import { GridAutoFlowDemoComponent } from './components/grid-auto-flow-demo.component';
import { GridColumnSpanDemoComponent } from './components/grid-column-span-demo.component';
import { GridGapDemoComponent } from './components/grid-gap-demo.component';
import { GridJustifyAlignContentDemoComponent } from './components/grid-justify-align-content-demo.component';
import { GridSubgridDemoComponent } from './components/grid-subgrid-demo.component';
import { GridTemplateAreasDemoComponent } from './components/grid-template-areas-demo.component';
import { GridTemplateColumnsDemoComponent } from './components/grid-template-columns-demo.component';
import { GridTemplateRowsDemoComponent } from './components/grid-template-rows-demo.component';
import { JustifyAlignItemsDemoComponent } from './components/justify-align-items-demo.component';

@Component({
  selector: 'lc-grid-section',
  standalone: true,
  imports: [
    GridTemplateColumnsDemoComponent,
    GridTemplateRowsDemoComponent,
    GridGapDemoComponent,
    GridAutoFlowDemoComponent,
    GridAutoColumnsDemoComponent,
    GridAutoRowsDemoComponent,
    GridAutoFitFillDemoComponent,
    GridTemplateAreasDemoComponent,
    JustifyAlignItemsDemoComponent,
    GridJustifyAlignContentDemoComponent,
    GridColumnSpanDemoComponent,
    GridSubgridDemoComponent,
  ],
  template: `
    <section class="section">
      <header class="section__header">
        <h2 class="section__title">CSS Grid</h2>
        <p class="section__subtitle">
          Two-dimensional layout. Define rows and columns simultaneously, then
          place items precisely or let the browser auto-place them.
        </p>
      </header>

      <div class="section__group">
        <h3 class="section__group-label">Defining the grid</h3>
        <div class="section__demos">
          <lc-grid-template-columns-demo />
          <lc-grid-template-rows-demo />
          <lc-grid-gap-demo />
          <lc-grid-template-areas-demo />
          <lc-grid-auto-fit-fill-demo />
        </div>
      </div>

      <div class="section__group">
        <h3 class="section__group-label">Auto placement &amp; implicit tracks</h3>
        <div class="section__demos">
          <lc-grid-auto-flow-demo />
          <lc-grid-auto-rows-demo />
          <lc-grid-auto-columns-demo />
        </div>
      </div>

      <div class="section__group">
        <h3 class="section__group-label">Alignment</h3>
        <div class="section__demos">
          <lc-justify-align-items-demo />
          <lc-grid-justify-align-content-demo />
        </div>
      </div>

      <div class="section__group">
        <h3 class="section__group-label">Item placement &amp; advanced</h3>
        <div class="section__demos">
          <lc-grid-column-span-demo />
          <lc-grid-subgrid-demo />
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
export class GridSectionComponent {}
